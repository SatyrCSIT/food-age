import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Item = {
    name: string;
    kcal: number;
    unit?: string;
    desc?: string;
};

async function upsertBand(id: string, min: number, max: number, focus: string) {
    return prisma.ageBand.upsert({
        where: { id },
        update: { min, max, focus },
        create: { id, min, max, focus },
    });
}

async function createFoodWithLinks(item: Item, bandIds: string[]) {
    const food = await prisma.food.create({
        data: {
            name: item.name,
            description: item.desc ?? null,
            kcalPerServe: item.kcal,
            unit: item.unit ?? "จาน",
        },
    });
    for (const bandId of bandIds) {
        await prisma.foodAge.create({ data: { foodId: food.id, ageBandId: bandId } });
    }
}

async function main() {
    // ล้างเฉพาะตารางที่ยังใช้งานอยู่
    await prisma.foodAge.deleteMany();
    await prisma.food.deleteMany();

    const band13_18 = await upsertBand("band13_18", 13, 18, "ธาตุเหล็ก, แคลเซียม, โปรตีนเพิ่ม");
    const band19_30 = await upsertBand("band19_30", 19, 30, "โปรตีนลีน, ธัญพืชไม่ขัดสี, ผักผลไม้, ไขมันดี");
    const band31_50 = await upsertBand("band31_50", 31, 50, "ไฟเบอร์สูง, คุมโซเดียม, แคลเซียม+วิตามิน D");
    const band51_120 = await upsertBand("band51_120", 51, 120, "โปรตีนย่อยง่าย, พลังงานพอเหมาะ, อาหารย่อยง่าย");

    const teen: Item[] = [
        { name: "ข้าวกล้อง + ไก่ย่าง + สลัดผัก", kcal: 560, desc: "โปรตีนสูง ไฟเบอร์ดี" },
        { name: "ไข่ต้ม 2 ฟอง + ขนมปังโฮลวีต 2 แผ่น + นมพร่องมันเนย", kcal: 520, unit: "ชุด", desc: "โปรตีน+แคลเซียม" },
        { name: "ปลาอบสมุนไพร + มันฝรั่งอบ + ผักนึ่ง", kcal: 500 },
        { name: "ข้าวโอ๊ตนมสด + กล้วย + อัลมอนด์", kcal: 450, unit: "ชาม", desc: "พลังงานดี ไฟเบอร์สูง" },
        { name: "สเต็กอกไก่ + ควินัว + ผักย่าง", kcal: 580 },
        { name: "แกงส้มผักรวม + ไข่ต้ม + ข้าวกล้อง", kcal: 520, unit: "ชุด" },
        { name: "ยำทูน่าโฮลวีต", kcal: 420, unit: "จาน" },
        { name: "ผัดผักรวมเต้าหู้ + ข้าวกล้อง", kcal: 520 },
        { name: "สลัดไก่อบ ซอสโยเกิร์ต", kcal: 480, unit: "ชาม" },
        { name: "พาสต้าซอสมะเขือเทศ + ทูน่า", kcal: 560 },
        { name: "สุกี้น้ำใส ไก่/เต้าหู้ + เส้นบุก", kcal: 420, unit: "ชามใหญ่" },
        { name: "นมถั่วเหลืองเสริมแคลเซียม + กล้วย 1 ผล", kcal: 240, unit: "ชุด" },
    ];

    const youngAdult: Item[] = [
        { name: "ข้าวกล้อง + อกไก่ย่าง + ซุปใสผัก", kcal: 540 },
        { name: "แซลมอนย่าง + สลัดคีนัว + อะโวคาโด", kcal: 620, unit: "ชุด" },
        { name: "โซบะเย็น + เต้าหู้ + ผักรวม", kcal: 480 },
        { name: "แกงเขียวหวานไก่ (ลดกะทิ) + ข้าวกล้อง", kcal: 600 },
        { name: "ลาบไก่คั่วน้อยโซเดียม + ข้าวเหนียวดำ", kcal: 520 },
        { name: "สลัดธัญพืช + ถั่วลูกไก่ + งา", kcal: 510, unit: "ชาม" },
        { name: "ไข่คนใส่ผักโขม + ขนมปังโฮลวีต", kcal: 480 },
        { name: "ต้มยำเห็ดรวม + ข้าวกล้อง", kcal: 430 },
        { name: "ข้าวหน้าไก่ซอสเทอริยากิ (หวานน้อย) + ผัก", kcal: 560 },
        { name: "ผัดคะน้าน้ำมันหอย (ลดโซเดียม) + หมู/ไก่ + ข้าวกล้อง", kcal: 570 },
        { name: "ข้าวต้มปลา + ผักลวก", kcal: 420 },
        { name: "สเต๊กอกไก่ซอสพริกไทยดำ + มันหวานย่าง + ผักย่าง", kcal: 590 },
    ];

    const midAge: Item[] = [
        { name: "ปลานึ่งมะนาว (ลดโซเดียม) + ข้าวกล้อง + ผักลวก", kcal: 520 },
        { name: "แกงเลียงผักรวม + ไข่ต้ม 1 ฟอง + ข้าวกล้อง", kcal: 520 },
        { name: "ยำเห็ด 3 อย่าง + ข้าวกล้อง", kcal: 480 },
        { name: "เต้าหู้ตุ๋นผักรวม + ควินัว", kcal: 540 },
        { name: "โอ๊ตมีลนมถั่ว + เบอร์รี + เมล็ดแฟลกซ์", kcal: 420, unit: "ชาม" },
        { name: "ต้มจืดกะหล่ำปลีใส่เต้าหู้ + ข้าวกล้อง", kcal: 430 },
        { name: "ผัดบรอกโคลีเห็ดหอม + ไก่อก (น้ำมันน้อย)", kcal: 560 },
        { name: "ข้าวคลุกปลาแมคเคอเรล + ผักสด", kcal: 540 },
        { name: "ซุปมิโสะเต้าหู้สาหร่าย + ข้าวสวย", kcal: 430 },
        { name: "แกงส้มปลา + ผักรวม + ข้าวกล้อง", kcal: 520 },
        { name: "สลัดทูน่ามะเขือเทศเชอร์รี + ขนมปังโฮลวีต", kcal: 520 },
        { name: "โปเกโบวล์ ข้าวกล้อง + แซลมอน/เต้าหู้ + ผัก + งา", kcal: 600, unit: "ชาม" },
    ];

    const senior: Item[] = [
        { name: "โจ๊กข้าวโอ๊ตนิ่ม + ไก่สับ + ขิง + ต้นหอม", kcal: 380, unit: "ชาม" },
        { name: "ไข่ตุ๋นผักนิ่ม + ข้าวสวยหุงนิ่ม", kcal: 360 },
        { name: "เต้าหู้นิ่มซุปใส + แครอท + เห็ดหอม", kcal: 320, unit: "ชาม" },
        { name: "ปลานึ่งซีอิ๊วสูตรโซเดียมต่ำ + ข้าวสวยนิ่ม + ผักลวก", kcal: 480 },
        { name: "ข้าวต้มปลาแซลมอน + ฟัก + ขิงซอย", kcal: 420 },
        { name: "ข้าวกล้องหุงนิ่ม + ผัดผักน้ำมันน้อย + เต้าหู้ไข่", kcal: 500 },
        { name: "ซุปฟักทองปั่น (นมถั่ว) + ขนมปังโฮลวีตนิ่ม", kcal: 380 },
        { name: "กล้วย + โยเกิร์ตรสธรรมชาติ + เมล็ดเจียเล็กน้อย", kcal: 300, unit: "ชุด" },
        { name: "แกงจืดตำลึงหมูสับ (เนื้อบดละเอียด) + ข้าวสวยนิ่ม", kcal: 420 },
        { name: "ปลาย่างซอสมะนาวอ่อน + มันหวานนึ่งบด + ผักนิ่ม", kcal: 480 },
        { name: "ข้าวโอ๊ตบดละเอียด + นมถั่วเหลือง + กล้วยบด", kcal: 360, unit: "ชาม" },
        { name: "ข้าวสวยนิ่ม + แกงเลียงผักโขมบด + ไข่ต้มครึ่งฟอง", kcal: 390 },
    ];

    const cross: Array<{ item: Item; bands: string[] }> = [
        { item: { name: "ผัดผักรวมเต้าหู้ (น้ำมันน้อย)", kcal: 480 }, bands: [band19_30.id, band31_50.id, band51_120.id] },
        { item: { name: "สลัดผัก + อกไก่อบ + น้ำสลัดโยเกิร์ต", kcal: 460 }, bands: [band13_18.id, band19_30.id, band31_50.id] },
        { item: { name: "ข้าวต้มเห็ดหอมเต้าหู้ขิงอ่อน", kcal: 360, unit: "ชาม" }, bands: [band31_50.id, band51_120.id] },
    ];

    const ops: Array<Promise<void>> = [];
    for (const it of teen) ops.push(createFoodWithLinks(it, [band13_18.id]));
    for (const it of youngAdult) ops.push(createFoodWithLinks(it, [band19_30.id]));
    for (const it of midAge) ops.push(createFoodWithLinks(it, [band31_50.id]));
    for (const it of senior) ops.push(createFoodWithLinks(it, [band51_120.id]));
    for (const c of cross) ops.push(createFoodWithLinks(c.item, c.bands));
    await Promise.all(ops);

    console.log("✅ Seed completed");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
