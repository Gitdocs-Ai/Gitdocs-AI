import { NextRequest, NextResponse } from "next/server";
import {
  getUsageOverview,
  getBillingData,
  getBillingAddress,
  updateBillingAddress,
  addBillingAddress,
  deleteBillingAddress,
} from "@/app/api/auth/subscription/clientSubscriptionServices";
import connectMongoWithRetry from "../../lib/db/connectMongo";

export async function GET(request: NextRequest) {
  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  await connectMongoWithRetry();

  const usageOverview = await getUsageOverview(id);

  return NextResponse.json({ data: usageOverview });
}

export async function PATCH(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (query === "billingData") {
    const billingData = await getBillingData(id);
    return NextResponse.json({ data: billingData });
  }

  if (query === "billingAddress") {
    const billingAddress = await getBillingAddress(id);
    return NextResponse.json({ data: billingAddress });
  }
}

export async function POST(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");
  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const requestBody = await request.json(); // Parse the body

  if (query === "updateBillingAddress") {
    const billingAddress = await updateBillingAddress(
      id,
      requestBody.addressData,
    );
    return NextResponse.json({ data: billingAddress });
  }

  if (query === "addBillingAddress") {
    const billingAddress = await addBillingAddress(id, requestBody.addressData);
    return NextResponse.json({ data: billingAddress });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.headers.get("Authorization")?.split(" ")[1];
  const requestBody = await request.json();

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const billingAddress = await deleteBillingAddress(
    id,
    requestBody.addressData,
  );
  return NextResponse.json({ data: billingAddress });
}
