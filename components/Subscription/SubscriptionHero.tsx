"use client";

import Link from "next/link";
import SubOverview from "./SubOverview";
import SubBilling from "./SubBilling";
import SubAddresses from "./SubAddresses";
import { useSearchParams } from "next/navigation";

const SubscriptionHero = () => {
    const searchParams = useSearchParams();
    const action = searchParams.get("action");

    const options = [
        {
            label: "Overview",
            href: "/subscription",
            component: <SubOverview />,
            active: action === null,
        },
        {
            label: "Billing and Subscription",
            href: "/subscription?action=billing",
            component: <SubBilling />,
            active: action === "billing",
        },
        {
            label: "Addresses",
            href: "/subscription?action=addresses",
            component: <SubAddresses />,
            active: action === "addresses",
        },
    ];

    return (
        <div className="px-7 py-5 min-h-[calc(100vh-64px)]">
            <div className="flex gap-6 text-sm mb-3 py-1 px-1.5 bg-[#262626] rounded-sm w-fit mx-auto">
                {options.map((option) => (
                    <Link
                        href={option.href}
                        key={option.label}
                        className={`px-2 py-1 rounded-sm cursor-pointer transition-all duration-150 ${option.active ? "bg-[#ededed] text-[#1b1b1b]" : "hover:bg-[#353434] hover:text-[#ededed]"}`}
                    >
                        {option.label}
                    </Link>
                ))}
            </div>
            {options.find((option) => option.active)?.component}
        </div>
    );
};
export default SubscriptionHero;
