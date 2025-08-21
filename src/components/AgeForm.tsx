import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AgeForm({
    value,
    onChange,
}: {
    value: number | null;
    onChange: Dispatch<SetStateAction<number | null>>;
}) {
    const [local, setLocal] = useState<number>(value ?? 22);
    useEffect(() => { if (value != null) setLocal(value); }, [value]);

    const clamp = (v: number) => Math.max(1, Math.min(120, v));
    const commit = (v: number) => onChange(clamp(v));

    return (
        <div className="grid gap-3">
            <label className="label">อายุของคุณ (ปี)</label>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="btn"
                    onClick={() => { const v = clamp((value ?? local) - 1); setLocal(v); commit(v); }}
                    aria-label="ลดอายุ"
                >
                    −
                </button>
                <input
                    type="number"
                    min={1}
                    max={120}
                    className="input text-center text-lg"
                    value={value ?? local}
                    onChange={(e) => {
                        const n = Number(e.target.value);
                        setLocal(isNaN(n) ? local : n);
                    }}
                    onBlur={() => commit(local)}
                    placeholder="เช่น 22"
                />
                <button
                    type="button"
                    className="btn"
                    onClick={() => { const v = clamp((value ?? local) + 1); setLocal(v); commit(v); }}
                    aria-label="เพิ่มอายุ"
                >
                    +
                </button>
            </div>

            {/* slider */}
            <input
                type="range"
                min={1}
                max={120}
                value={value ?? local}
                onChange={(e) => { const n = Number(e.target.value); setLocal(n); commit(n); }}
                className="w-full accent-indigo-600 cursor-pointer"
            />

            <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">ช่วงรองรับ: 1–120 ปี</div>
                <div className="text-xs text-slate-500">ค่าเลือก: <span className="font-semibold">{value ?? local}</span> ปี</div>
            </div>
        </div>
    );
}
