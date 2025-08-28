export type FoodItem = {
    id: string;
    name: string;
    description?: string | null;
    unit: string;
    kcalPerServe: number;
    reason: string;
};

export default function Results({
    data,
    loading,
}: {
    data: { focus: string[]; items: FoodItem[] } | null;
    loading: boolean;
}) {
    if (!data && !loading) {
        return (
            <div className="card p-6">
                <div className="text-slate-600">กรอกอายุเพื่อรับคำแนะนำ</div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {data?.focus?.length ? (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-indigo-800 animate-fadeInUp">
                    ช่วงอายุนี้ควรเน้น: <b>{data.focus.join(", ")}</b>
                </div>
            ) : null}

            {loading ? (
                <ul className="grid md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <li key={i} className="card p-5 animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                            <div className="h-5 w-2/3 rounded bg-slate-200 mb-3 animate-pulse" />
                            <div className="h-4 w-1/2 rounded bg-slate-200 mb-2 animate-pulse" />
                            <div className="h-4 w-1/3 rounded bg-slate-200 animate-pulse" />
                        </li>
                    ))}
                </ul>
            ) : data?.items?.length ? (
                <ul className="grid md:grid-cols-2 gap-4">
                    {data.items.map((it, i) => (
                        <li
                            key={it.id}
                            className="card p-5 card-hover sheen animate-fadeInUp"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <h3 className="text-lg font-semibold text-slate-900">{it.name}</h3>
                            {it.description ? <p className="text-slate-600 text-sm mt-1">{it.description}</p> : null}

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="badge">≈ {it.kcalPerServe} kcal / {it.unit}</span>
                            </div>

                            <p className="mt-3 text-sm text-slate-600">เหตุผล: {it.reason}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="card p-6">
                    <div className="text-slate-700">ยังไม่มีรายการที่ตรงเงื่อนไข</div>
                </div>
            )}
        </div>
    );
}
