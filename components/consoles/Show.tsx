import MagnifyingGlassIconCustom from "../icons/MagnifyingGlassIcon";

export default function ShowConsole({ console }: any) {

    const consoleColors: any = {
        "Nintendo Switch":   "badge-error",
        "Nintendo Switch 2": "badge-error",
        "Xbox Series X":     "badge-success",
        "PlayStation 5":     "badge-info",
        "Steam Deck":        "badge-ghost",
    };

    return (
        <div className="p-4 bg-base-200 min-h-screen">
            <div className="flex flex-col gap-8 mb-8">
                <h1 className="text-3xl font-bold flex gap-2">
                    <MagnifyingGlassIconCustom size={32}/>
                    Show Console
                </h1>

                <div className="card bg-base-100 border p-2 mx-auto border-base-300 shadow-sm">
                    <div className="flex gap-5 p-5 border-b border-base-200 items-center justify-center">
                        <div className="avatar">
                            <div className="mask mask-squircle w-36">
                                <img src={`/imgs/${console.image}`} />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                                <div>
                                    <h2 className={`badge badge-outline ${consoleColors[console.name] || 'badge-ghost'}`}>{console.name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-b border-base-200">
                        <p className="text-xs text-base-content/50 mb-1">Description</p>
                        <p className="text-sm leading-relaxed">{console.description}</p>
                    </div>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 gap-3 p-5">
                        {[
                        { label: "Release date", value: new Date(console.releasedate).toISOString().split('T')[0] },
                        { label: "Manufacturer", value: console.manufacturer },
                        ].map(({ label, value }) => (
                        <div key={label} className="bg-base-200 rounded-xl p-3">
                            <p className="text-xs text-base-content/50 mb-1">{label}</p>
                            <p className="text-sm font-medium">{value}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}