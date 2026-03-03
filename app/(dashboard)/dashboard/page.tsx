"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardStatsRow } from "@/components/dashboard-stats";
import { ScansTable } from "@/components/scans-table";

export default function DashboardPage() {
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
        <div className="flex-1 sm:overflow-hidden bg-background flex flex-col gap-4 w-full p-0 sm:p-4 min-h-0">
            {/* Stats section */}
            <DashboardStatsRow />

            {/* Main Content Area */}
            <section className="flex-none sm:flex-1 w-full bg-card rounded-2xl border border-border sm:overflow-hidden flex flex-col shadow-sm">
                <ScansTable />
            </section>
        </div>
    );
}
