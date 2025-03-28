"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import LoadingAnimation from "../common/LoadingAnimation";
import { Lock, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Checkout({
    plan,
    activePlanId,
    isLoading,
    handleCreateOrder,
    billingAddress,
}: {
    plan: any;
    activePlanId: number;
    isLoading: boolean;
    handleCreateOrder: (address: any, phoneNumber: string) => void;
    billingAddress: any;
}) {
    const [showSavedAddresses, setShowSavedAddresses] = useState(false);
    const [address, setAddress] = useState(
        billingAddress?.[0] || {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            contact: "",
            email: "",
        },
    );
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberChange = (e: any) => {
        const value = e.target.value;
        const cleaned = value.replace(/\D/g, "");
        setPhoneNumber(cleaned);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    disabled={
                        plan.isActive || isLoading || plan.id < activePlanId
                    }
                    variant="outline"
                    className={`w-full my-6 px-4 py-2 hover:text-[#ededed] border-none rounded-lg transition-all duration-150 ${plan.isActive ? "bg-[#ededed]/50 text-black" : "bg-gradient-to-r from-[#8D61F6] to-[#1FABEB] text-[#ededed] hover:from-[#8D61F6]/80 hover:to-[#1FABEB]/80"}`}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-3 justify-center w-full">
                            <LoadingAnimation /> Processing...
                        </span>
                    ) : plan.isActive ? (
                        "Current Plan"
                    ) : plan.id > activePlanId ? (
                        "Upgrade"
                    ) : (
                        "Downgrade"
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent
                onClick={() => {
                    setShowSavedAddresses(false);
                }}
                className="min-w-[100vw]"
            >
                <SheetHeader className="bg-[#131313] pt-24 pb-10 px-36">
                    <SheetTitle className="font-semibold text-[0.9rem] text-[#ededed] ">
                        Subscribe to {plan.tagline}
                    </SheetTitle>
                    <SheetDescription className="text-4xl text-[#ededed]">
                        US$ {plan.price}.00{" "}
                        <span className="text-[#ededed]/60 text-sm">
                            {" "}
                            per month
                        </span>
                    </SheetDescription>
                    <span className="text-[#ededed]/60 font-bold text-sm">
                        {" "}
                        Then starting at US$ {plan.price} per month.
                    </span>
                </SheetHeader>
                <div className="px-36">
                    <div className="flex w-[53%] h-[calc(100vh-14.7rem)] flex-col">
                        <div className="flex items-start py-5 justify-between gap-2 border-b border-[#ededed]/10">
                            <div className="flex flex-col gap-2">
                                <p>
                                    Gitdocs AI &nbsp;{" "}
                                    <span className="text-[#ededed]/60 text-xs bg-[#ededed]/10 px-2 py-1 rounded-lg">
                                        {plan.name}
                                    </span>
                                </p>
                                <p className="text-[#ededed]/60 text-xs -mt-1">
                                    Billed monthly
                                </p>
                            </div>
                            <p>US$ {plan.price}.00</p>
                        </div>
                        <div className="flex items-start py-5 justify-between gap-2 border-b border-[#ededed]/10">
                            <div className="flex flex-col gap-2">
                                <p>Platform Fee</p>
                                <p className="text-[#ededed]/60 text-xs -mt-1">
                                    We charge a platform fee to cover the cost
                                    of processing your payments.
                                </p>
                            </div>
                            <p>US$ 0.25</p>
                        </div>
                        <div className="flex w-[60%] ms-auto h-[calc(100vh-14.7rem)] flex-col">
                            <div className="flex flex-wrap items-start py-5 justify-between gap-2 border-b border-[#ededed]/10">
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-[#ededed]/60">
                                        Subtotal
                                    </p>
                                    <p>US$ {plan.price + 0.25}</p>
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-[#ededed]/60">
                                        Promotional Offer
                                    </p>
                                    <p>-US$ 0.25</p>
                                </div>
                            </div>
                            <div className="w-full mt-4 flex items-center justify-between">
                                <p className="text-[#ededed]">Total to pay</p>
                                <p>US$ {plan.price}.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="h-[26rem] z-0 flex flex-wrap rounded-xl p-5 w-96 border border-[#ededed]/10 bg-[#131313] shadow-lg absolute top-32 right-36">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-semibold border-b border-[#ededed]/10 pb-3 flex items-center justify-between">
                            <p>Billing Details</p>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSavedAddresses(!showSavedAddresses);
                                }}
                                className="text-xs text-[#ededed]/60 flex items-center gap-1 ps-2 pe-1 py-1 rounded-md hover:bg-[#ededed]/10 cursor-pointer"
                            >
                                Saved Addresses{" "}
                                <ChevronDown className="w-4 h-4" />
                                {showSavedAddresses && (
                                    <div className="w-1/2 z-50 absolute top-12 right-5 max-h-60 overflow-y-auto cursor-pointer text-sm bg-transparent rounded-md border border-[#353535]">
                                        {billingAddress.map((address: any) => (
                                            <div
                                                onClick={() => {
                                                    setAddress(address);
                                                }}
                                                key={address.id}
                                                className="flex flex-col bg-[#131313] py-2 px-4 hover:bg-[#474646] cursor-pointer border-b border-[#ededed]/10"
                                            >
                                                <p className="text-[#ededed]">
                                                    {address.name}
                                                </p>
                                                <p className="text-[#ededed]/60">
                                                    {address.contact}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold"
                        >
                            Email
                        </label>
                        <input
                            disabled
                            type="text"
                            id="email"
                            name="email"
                            value={address.contact}
                            className={`w-full text-[#ededed]/60 text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535] cursor-not-allowed`}
                        />

                        <label
                            htmlFor="contact"
                            className="text-sm font-semibold"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            minLength={10}
                            maxLength={10}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e)}
                            className={`w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]`}
                        />

                        <label
                            htmlFor="address"
                            className="text-sm font-semibold"
                        >
                            Address
                        </label>
                        <textarea
                            disabled
                            id="address"
                            name="address"
                            value={
                                address.address1
                                    ? address.address1 +
                                      ", " +
                                      address.address2 +
                                      "\n" +
                                      address.city +
                                      "," +
                                      address.state +
                                      "\n" +
                                      address.zip +
                                      "\n" +
                                      address.country
                                    : ""
                            }
                            className={`w-full text-sm text-[#ededed]/60 cursor-not-allowed py-1.5 resize-none h-24 px-4 bg-transparent rounded-md border border-[#353535]`}
                        />
                    </div>

                    <SheetClose asChild>
                        <Button
                            type="button"
                            onClick={() =>
                                handleCreateOrder(address, phoneNumber)
                            }
                            className="bg-gradient-to-b w-[90%] font-semibold absolute bottom-5 left-[47.5%] -translate-x-1/2 from-[#70c8f5] to-[#4CB9EE] hover:from-[#70c8f5]/80 hover:to-[#4CB9EE]/80 text-black"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-3 justify-center w-full">
                                    <LoadingAnimation /> Processing...
                                </span>
                            ) : (
                                `Pay ${plan.price}.00 & Continue`
                            )}
                        </Button>
                    </SheetClose>

                    <p className="absolute z-30 -bottom-[27rem] h-full left-0 w-full text-xs text-[#ededed]/60">
                        <div className="flex gap-2 w-fit mx-auto">
                            <Lock className="w-3 h-3 mt-0.5 -ms-5" /> Secured by
                            Razorpay
                        </div>
                    </p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
