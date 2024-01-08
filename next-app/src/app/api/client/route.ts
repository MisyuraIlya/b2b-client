import {NextRequest, NextResponse} from "next/server";

export function GET(request: NextRequest, response: NextResponse) {
  const clientId = request.headers.get('x-client-id');
  console.log(`route - ${clientId}`)
  return NextResponse.json({ "status": "ok" })
}