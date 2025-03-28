import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateSubscriptionStatus } from "../../auth/subscription/clientSubscriptionServices";
import { updateUser } from "../../auth/user/clientUserServicies";
import { updateUsageOverview } from "../../auth/overview/clientOverviewServices";
import Razorpay from "razorpay";

export interface InvoiceCreateRequestBody {
    type: "invoice" | "link";
    description: string;
    customer: {
        name: string;
        email: string;
        contact: string;
    };
    line_items: Array<{
        name: string;
        amount: number;
        currency: string;
        quantity: number;
    }>;
    sms_notify?: 0 | 1;
    email_notify?: 0 | 1;
    currency: string;
    notes: {
        [key: string]: string;
    };
}

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const issueInvoiceForPayment = async (payment: any) => {
    try {
        const invoiceData: InvoiceCreateRequestBody = {
            type: "invoice",
            description: "Invoice for successful payment",
            customer: {
                name: payment.notes.address.name,
                email: payment.notes.address.contact,
                contact: payment.notes.address.phoneNumber,
            },
            line_items: [
                {
                    name: payment.notes.subscriptionType + " Subscription",
                    amount: payment.amount,
                    currency: "USD",
                    quantity: 1,
                },
            ],
            sms_notify: 1,
            email_notify: 1,
            currency: "USD",
            notes: {
                payment_id: payment.id, // Store the payment_id here
            },
        };

        // Create the invoice
        const invoice = await razorpay.invoices.create(invoiceData);
        console.log("Invoice Created: ", invoice);

        // Issue the invoice (send it to the customer)
        const issuedInvoice = await razorpay.invoices.issue(invoice.id);
        console.log("Invoice Issued: ", issuedInvoice);
    } catch (error) {
        console.error("Error issuing invoice: ", error);
    }
};

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest("hex");

    if (signature !== expectedSignature) {
        return NextResponse.json(
            { message: "Invalid signature" },
            { status: 400 },
        );
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        const subscription = await updateSubscriptionStatus(
            payment.notes.userId,
            payment.order_id,
            payment.id,
            "Active",
            payment.notes.subscriptionType,
            payment.notes.price,
        );

        if (!subscription) {
            return NextResponse.json(
                { message: "Subscription not found" },
                { status: 400 },
            );
        }

        await updateUser(payment.notes.userId, {
            subscriptionType: payment.notes.subscriptionType,
        });

        let maxRepositories = 3;

        if (subscription.subscriptionType === "Pro") {
            maxRepositories = 15;
        } else if (subscription.subscriptionType === "Enterprise") {
            maxRepositories = 100;
        }

        await updateUsageOverview(payment.notes.userId, {
            totalTokens: subscription.leftOverTokens + subscription.bonusTokens,
            maxRepositories: maxRepositories,
        });

        await issueInvoiceForPayment(payment);

        return NextResponse.json({ message: "Subscription updated" });
    } else if (event.event === "payment.failed") {
        const payment = event.payload.payment.entity;
        const subscription = await updateSubscriptionStatus(
            payment.notes.userId,
            payment.order_id,
            payment.id,
            "Inactive",
            "",
            0,
        );

        if (!subscription) {
            return NextResponse.json(
                { message: "Subscription not found" },
                { status: 400 },
            );
        }

        return NextResponse.json({ message: "Subscription updated" });
    }

    return NextResponse.json({ message: "Webhook received" });
}
