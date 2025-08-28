import rules from "@/data/rules.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function recommendFoods(params: { age: number; goal: "maintain" | "lose" | "gain"; filters: Record<string, never> }) {
    const { age } = params;

    const band = rules.ageBands.find((b) => age >= b.min && age <= b.max);
    if (!band) return { focus: [], items: [] };

    const ageBandRow = await prisma.ageBand.findFirst({
        where: { min: band.min, max: band.max },
        select: { id: true },
    });

    if (!ageBandRow) {
        return {
            focus: band.focus,
            items: [
                {
                    id: "demo",
                    name: "ตัวอย่างเมนู",
                    description: "เพิ่ม seed ข้อมูลใน DB เพื่อผลลัพธ์ที่สมบูรณ์",
                    unit: "จาน",
                    kcalPerServe: 500,
                    reason: `ช่วงอายุนี้ควรเน้น: ${band.focus.join(", ")}`,
                },
            ],
        };
    }

    const foods = await prisma.food.findMany({
        where: { ageBands: { some: { ageBandId: ageBandRow.id } } },
        orderBy: { createdAt: "desc" },
    });

    const items = foods.map((f) => ({
        id: f.id,
        name: f.name,
        description: f.description,
        unit: f.unit,
        kcalPerServe: f.kcalPerServe,
        reason: `ช่วงอายุนี้ควรเน้น: ${band.focus.join(", ")}`,
    }));

    return { focus: band.focus, items };
}
