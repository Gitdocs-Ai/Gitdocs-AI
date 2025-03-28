"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    return (
        <div className="flex items-center gap-2 bg-transparent w-40 border border-[#3D444D] rounded-md px-2 py-2 focus-within:border-[#DF737D]">
            <LuSearch className="text-gray-400" size={16} />
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type  /  to search"
                className="bg-transparent text-xs outline-none w-28"
            />
        </div>
    );
}
