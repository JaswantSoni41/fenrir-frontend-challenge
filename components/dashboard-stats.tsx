"use client"

import { cn } from "@/lib/utils";
import {
    HiOutlineNoSymbol,
    HiOutlineExclamationTriangle,
    HiOutlineExclamationCircle,
    HiOutlineMagnifyingGlass
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { StatsSkeleton } from "@/components/ui/loaders";

interface KpiCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendType: 'increase' | 'decrease';
    icon: React.ElementType;
    variant: 'critical' | 'high' | 'medium' | 'low';
}

const variants = {
    critical: {
        bg: "bg-destructive/10",
        text: "text-red-500",
        iconBg: "bg-red-50",
    },
    high: {
        bg: "bg-orange-500/10",
        text: "text-orange-500",
        iconBg: "bg-orange-50",
    },
    medium: {
        bg: "bg-amber-500/10",
        text: "text-amber-500",
        iconBg: "bg-amber-50",
    },
    low: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        iconBg: "bg-blue-50",
    }
};

export function KpiCard({ title, value, trend, trendType, icon: Icon, variant }: KpiCardProps) {
    const style = variants[variant];
    const isIncrease = trendType === 'increase';

    // Determine trend color logic: increase in severity is bad (red), decrease is good (green)
    // Looking at the provided image: Critical/High/Low increases are red, Medium decrease is green.
    const trendColor = isIncrease ? "dark:text-red-700 text-red-500" : "text-emerald-500";

    return (
        <section className="flex-1 bg-card p-5 rounded-2xl border border-border hover:border-primary transition-all flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium text-base leading-none">{title}</span>
                <div className={cn("p-1.5 rounded-lg", style.iconBg)}>
                    <Icon className={cn("h-4 w-4", style.text)} />
                </div>
            </div>

            <div className="space-y-0.5">
                <h3 className="text-2xl font-extrabold text-foreground leading-none">{value}</h3>
                <p className={cn("text-[10px] font-bold tracking-tight flex items-center gap-1", trendColor)}>
                    <span className="text-[10px]">{isIncrease ? "↑" : "↓"}</span>
                    <span>{trend} {trendType} than yesterday</span>
                </p>
            </div>
        </section>
    );
}

interface SummaryItemProps {
    label: string;
    value: string | number;
    showDivider?: boolean;
}

function SummaryItem({ label, value, showDivider }: SummaryItemProps) {
    return (
        <div className="flex items-center gap-2 group whitespace-nowrap">
            <span className="text-muted-foreground text-sm font-medium">{label}:</span>
            <span className="text-foreground text-sm font-bold">{value}</span>
            {showDivider && <div className="hidden lg:block ml-4 h-4 w-px bg-border" />}
        </div>
    );
}

export function DashboardStatsRow() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <StatsSkeleton />;

    return (
        <div className="w-full bg-card rounded-2xl p-4 sm:p-6 border border-border/50 shadow-sm">
            {/* Top Summary Row */}
            <div className="flex items-center justify-between overflow-x-auto no-scrollbar pb-3 border-b border-border/50 gap-4">
                <div className="flex items-center gap-6 lg:gap-8 min-w-max">
                    <SummaryItem label="Org" value="Project X" showDivider />
                    <SummaryItem label="Owner" value="Nammagiri" showDivider />
                    <SummaryItem label="Total Scans" value="100" showDivider />
                    <SummaryItem label="Scheduled" value="1000" showDivider />
                    <SummaryItem label="Rescans" value="100" showDivider />
                    <SummaryItem label="Failed Scans" value="100" />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-[12px] font-medium shrink-0">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <span>10 mins ago</span>
                </div>
            </div>

            {/* Severity KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
                <KpiCard
                    title="Critical Severity"
                    value="86"
                    trend="+2%"
                    trendType="increase"
                    icon={HiOutlineNoSymbol}
                    variant="critical"
                />
                <KpiCard
                    title="High Severity"
                    value="16"
                    trend="+0.9%"
                    trendType="increase"
                    icon={HiOutlineExclamationTriangle}
                    variant="high"
                />
                <KpiCard
                    title="Medium Severity"
                    value="26"
                    trend="+0.9%"
                    trendType="decrease"
                    icon={HiOutlineExclamationCircle}
                    variant="medium"
                />
                <KpiCard
                    title="Low Severity"
                    value="16"
                    trend="+0.9%"
                    trendType="increase"
                    icon={HiOutlineMagnifyingGlass}
                    variant="low"
                />
            </div>
        </div>
    );
}
