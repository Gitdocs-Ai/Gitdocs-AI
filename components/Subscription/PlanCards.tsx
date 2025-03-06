"use client"

import { FaRegCheckCircle } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { TooltipProvider,Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import {  useState } from "react";
import LoadingAnimation from "@/components/common/LoadingAnimation";

const PlanCards = ({ plan, setTrigger }: { plan: any, setTrigger: any }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateOrder = async () => {
        setIsLoading(true);
        const response = await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify({ amount: plan.price }),
        });
        setIsLoading(false);

        const data = await response.json();

        const paymentData = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: data.order.id,
            
            handler: async function (response: any) {
                setTrigger((prev: number) => prev + 1);
            }
        }

        const razorpay = new (window as any).Razorpay(paymentData);
        razorpay.open();
        
    }

    return (
        <>
            <div className="flex items-center mb-5 justify-between w-full gap-2">
                <span className="h-3 w-3 bg-[#18181B] rounded-full border-2 border-[#2d3237]"></span>
                <span className="h-3 w-3 bg-[#18181B] rounded-full border-2 border-[#2d3237]"></span>
            </div>
            <div className="px-4 w-full mb-5">
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-semibold">
                        {plan.tagline}
                    </h2>
                    <span className="text-sm text-[#ededed] flex items-center gap-2 rounded-full border-2 border-[#2d3237] ps-2 pe-2.5">
                        <span className="h-3.5 w-3.5 bg-[#ededed]/50 rounded-full flex items-center justify-center">
                            <span className="h-2 w-2 bg-[#ededed] rounded-full"></span>
                        </span>
                        {plan.name}
                    </span>
                </div>
                <div className="flex items-end gap-2 mt-3">
                    <h1 className="text-3xl font-semibold">
                        ${plan.price}
                    </h1>
                    <div className="text-sm text-[#999] mb-1 flex gap-1">
                        /month
                        {plan.name != "Free" && <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <GoInfo className="text-sm text-[#999] cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs max-w-72">
                                        The tokens will <span className="font-semibold">not expire</span> after the subscription ends but the <span className="font-semibold">pro features will not be available.</span>
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>}
                    </div>
                </div>

                <button onClick={handleCreateOrder} disabled={plan.isActive || isLoading} className={`w-full my-6 px-4 py-2 rounded-lg transition-all duration-150 ${plan.isActive ? "bg-[#ededed]/50 text-black" : "bg-gradient-to-r from-[#8D61F6] to-[#1FABEB] text-[#ededed] hover:from-[#8D61F6]/80 hover:to-[#1FABEB]/80"}`}>
                    {isLoading ? 
                    <span className="flex items-center gap-3 justify-center w-full"> <LoadingAnimation /> Processing...</span>  
                    : plan.isActive ? "Current Plan" : "Upgrade"}
                </button>

                <div className="flex flex-col gap-2">
                    {plan.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 text-[#787b7d]">
                            <FaRegCheckCircle className="text-[#50DE83]" />
                            <p className="text-sm ">
                                {feature}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="flex items-center mt-auto justify-between w-full gap-2">
                <span className="h-3 w-3 bg-[#18181B] rounded-full border-2 border-[#2d3237]"></span>
                <span className="h-3 w-3 bg-[#18181B] rounded-full border-2 border-[#2d3237]"></span>
            </div>
        </>
    )
}
export default PlanCards