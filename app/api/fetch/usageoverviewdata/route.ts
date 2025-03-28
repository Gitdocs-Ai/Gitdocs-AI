import { NextRequest, NextResponse } from "next/server";
import { getUsageOverview } from "../../auth/overview/clientOverviewServices";

export async function GET(request: NextRequest) {
    const id = request.headers.get("Authorization")?.split(" ")[1];
    if (!id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 },
        );
    }
    const usageOverview = await getUsageOverview(id);
    return NextResponse.json({ data: usageOverview });
}
