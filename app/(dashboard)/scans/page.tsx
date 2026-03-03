"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanProgressHeader } from "@/components/scan-progress-header";
import { ScanConsole } from "@/components/scan-console";
import { ScansTable } from "@/components/scans-table";

export default function ScansPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            router.push("/login");
        }
    }, [router]);

    if (!user) return (
        <div className="flex-1 flex items-center justify-center bg-background">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="h-12 w-48 bg-muted rounded-full" />
                <div className="h-4 w-32 bg-muted/50 rounded-full" />
            </div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto md:overflow-hidden bg-background flex flex-col gap-6 w-full p-0 py-6 md:p-0">
            {/* Scan Activity Section */}
            <ScanProgressHeader />

            {/* Live Console Section */}
            <ScanConsole />

            {/* Console Footer */}
            <div className="px-6 h-12 border-t border-border/50 flex items-center justify-between bg-card text-[11px] font-bold">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 group cursor-help">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                        <span className="text-muted-foreground group-hover:text-foreground">Sub-Agents: <span className="text-foreground">0</span></span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-help">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                        <span className="text-muted-foreground group-hover:text-foreground">Parallel Executions: <span className="text-foreground">2</span></span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-help">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                        <span className="text-muted-foreground group-hover:text-foreground">Operations: <span className="text-foreground">1</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-red-500">Critical: 0</span>
                    <span className="text-orange-500">High: 0</span>
                    <span className="text-amber-500">Medium: 0</span>
                    <span className="text-emerald-500">Low: 0</span>
                </div>
            </div>
        </div>
    );
}