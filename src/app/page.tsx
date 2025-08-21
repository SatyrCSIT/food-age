"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AgeForm from "../components/AgeForm";
import Results from "../components/Results";

export default function Page() {
  const sp = useSearchParams();
  const router = useRouter();

  const [age, setAge] = useState<number | null>(sp.get("age") ? Number(sp.get("age")) : null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // sync URL
  useEffect(() => {
    const qs = new URLSearchParams({ ...(age ? { age: String(age) } : {}) });
    router.replace("/?" + qs.toString());
  }, [age, router]);

  const qs = useMemo(
    () =>
      new URLSearchParams({
        ...(age ? { age: String(age) } : {}),
      }).toString(),
    [age]
  );

  useEffect(() => {
    if (!age) { setData(null); return; }
    let aborted = false;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const res = await fetch("/api/recommendations?" + qs, { cache: "no-store" });
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
        const j = await res.json();
        if (!aborted) setData(j);
      } catch (e: any) {
        if (!aborted) setErr(e.message || "Error");
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [qs, age]);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="grid gap-6 md:grid-cols-3 items-stretch">
        <div className="md:col-span-2">
          <div className="card p-6 md:p-8 card-hover animate-fadeInUp">
            <h2 className="text-3xl font-bold tracking-tight">
              ค้นหาเมนูที่เหมาะกับ <span className="text-indigo-600">ช่วงอายุ</span> ของคุณ
            </h2>
            <p className="mt-2 section-desc">
              ใส่อายุ แล้วรับคำแนะนำเมนูพร้อมเหตุผลด้านโภชนาการที่ชัดเจน อ่านง่าย สบายตา
            </p>

            <div className="mt-6 max-w-md">
              <AgeForm value={age} onChange={setAge} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="card p-3 sheen animate-fadeInUp" style={{ animationDelay: ".05s" }}>
                <div className="text-sm font-medium">โฟกัสสารอาหาร</div>
                <div className="text-xs text-slate-600">แนะนำตามวัย</div>
              </div>
              <div className="card p-3 sheen animate-fadeInUp" style={{ animationDelay: ".1s" }}>
                <div className="text-sm font-medium">คุมแคลอรีโดยรวม</div>
                <div className="text-xs text-slate-600">เมนูสมดุล</div>
              </div>
              <div className="card p-3 sheen animate-fadeInUp" style={{ animationDelay: ".15s" }}>
                <div className="text-sm font-medium">อ่านง่าย</div>
                <div className="text-xs text-slate-600">ดีไซน์สะอาดตา</div>
              </div>
            </div>
          </div>
        </div>

        {/* Side highlight */}
        <div className="card p-6 md:p-8 relative overflow-hidden card-hover animate-fadeInUp" style={{ animationDelay: ".1s" }}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100 animate-float" />
          <div className="absolute -left-8 bottom-4 h-20 w-20 rounded-full bg-blue-100 animate-float" style={{ animationDelay: "1.2s" }} />
          <h3 className="section-title">เคล็ดลับเร็ว</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• วัย 13–18: เน้นเหล็ก + แคลเซียม</li>
            <li>• วัย 19–30: โปรตีนลีน + ธัญพืชเต็มเมล็ด</li>
            <li>• วัย 31–50: ไฟเบอร์สูง + คุมโซเดียม</li>
            <li>• วัย 51–120: โปรตีนย่อยง่าย + อาหารนิ่ม</li>
          </ul>
          <div className="mt-4">
            <span className="badge">อัปเดตเมนูเรื่อย ๆ</span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="space-y-4 animate-fadeInUp" style={{ animationDelay: ".05s" }}>
        {err && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            เกิดข้อผิดพลาด: {err}
          </div>
        )}
        <Results data={data} loading={loading} />
        <p className="text-sm text-slate-500">
          *เป็นคำแนะนำทั่วไป ไม่ใช่การวินิจฉัยทางการแพทย์
        </p>
      </section>
    </div>
  );
}
