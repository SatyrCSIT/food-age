import { NextRequest, NextResponse } from "next/server";
import { recommendFoods } from "@/lib/recommend";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const age = Number(searchParams.get("age"));
    if (!age || age < 1 || age > 120) {
        return NextResponse.json({ error: "invalid age" }, { status: 400 });
    }
    try {
        const data = await recommendFoods({ age, goal: "maintain", filters: {} as any });
        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}
