import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const installation_id = url.searchParams.get("installation_id");

  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/github?installation_id=${installation_id}&code=${code}`;

  return NextResponse.redirect(redirectUrl);
}
