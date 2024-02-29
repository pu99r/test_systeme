import { NextRequest, NextResponse } from "next/server";
import { priceplans } from "./priceplans";

export async function GET(req: Request) {
  return NextResponse.json(priceplans);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ body });
}
