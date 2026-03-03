"use client"

import { usePathname } from "next/navigation";

export function PlaceholderPage() {
    const pathname = usePathname();
    const pageName = pathname.split('/').pop()?.replace(/-/g, ' ');

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-2xl bg-card rounded-[32px] border border-border p-12 lg:p-20 shadow-sm relative overflow-hidden">
                {/* Decorative Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl font-sans" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-4 capitalize">
                        {pageName} Module
                    </h2>

                    <p className="text-lg text-muted-foreground/80 font-medium max-w-md mx-auto leading-relaxed">
                        We're currently architecting the <span className="text-primary font-bold">{pageName}</span> experience.
                        Stay tuned for expert-level insights and security automation.
                    </p>

                    <div className="mt-12 pt-8 border-t border-border/50 w-full flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Development</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#0CC8A8]" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">Secured</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
