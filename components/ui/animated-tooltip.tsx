"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        designation: string;
        image: string;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0); // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig,
    );
    // translate the tooltip
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig,
    );

    return (
        <>
            {items.map((item, idx) => (
                <div
                    className="-mr-4  relative group"
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout"></AnimatePresence>
                    <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.name}
                        className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                    />
                </div>
            ))}
        </>
    );
};
