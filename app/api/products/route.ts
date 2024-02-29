import { NextRequest, NextResponse } from "next/server";
import { products } from "./products";

export async function GET(req: Request) {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ body });
}
