import { NextRequest, NextResponse } from "next/server";
import { pages } from "./pages";

export async function GET(req: Request) {
  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ body });
}
