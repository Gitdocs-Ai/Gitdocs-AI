import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Immediately redirect user to /loading
        const response = NextResponse.redirect(
            process.env.NEXTAUTH_URL + "/loading",
        );
        // Perform database operations in the background

        return response; // Return redirect response immediately
    } catch (error) {
        console.error("Middleware error:", error);

        // Redirect to error page if an error occurs
        return NextResponse.redirect(new URL("/error", req.url));
    }
}
