"use client"

import { cn } from "@/lib/utils";
import {
    TbWorldSearch,
    TbHierarchy,
    TbFlask,
    TbClipboardCheck,
    TbFileDescription
} from "react-icons/tb";
import { useState, useEffect } from "react";
import { ProgressHeaderSkeleton } from "@/components/ui/loaders";

interface StepProps {
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
}

function Step({ icon: Icon, label, isActive, isCompleted }: StepProps) {
    return (
        <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={cn(
                "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300",
                isActive
                    ? "bg-[#0CC8A8] border-[#0CC8A8] text-white shadow-[0_0_15px_rgba(12,200,168,0.2)] scale-105"
                    : isCompleted
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-background border-border text-muted-foreground/40"
            )}>
                <Icon className="h-4.5 w-4.5" />
            </div>
            <span className={cn(
                "text-[12px] font-bold tracking-tight transition-colors duration-300",
                isActive ? "text-foreground" : "text-muted-foreground/40"
            )}>
                {label}
            </span>
        </div>
    );
}

interface DetailItemProps {
    label: string;
    value: string | number;
    highlight?: boolean;
}

function DetailItem({ label, value, highlight }: DetailItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{label}</span>
            <span className={cn(
                "text-[13px] font-bold tracking-tight",
                highlight ? "text-[#0CC8A8]" : "text-foreground"
            )}>{value}</span>
        </div>
    );
}

export function ScanProgressHeader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return (
        <div className="px-6 pt-6 w-full">
            <ProgressHeaderSkeleton />
        </div>
    );

    return (
        <div className="px-6 pt-6 w-full">
            <div className="w-full bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm flex flex-col sm:flex-row items-center gap-6 lg:gap-10 transition-all">
                {/* Left: Circular Progress */}
                <div className="relative shrink-0 flex items-center justify-center h-24 w-24 lg:h-32 lg:w-32">
                    {/* Outer decorative ring */}
                    <div className="absolute inset-0 rounded-full border border-border/10" />

                    {/* Main Dark Circle */}
                    <div className="h-[85%] w-[85%] rounded-full dark:bg-[#111418] bg-card border-[3px] dark:border-zinc-800 border-border flex flex-col items-center justify-center shadow-xl">
                        <span className="text-2xl lg:text-3xl font-black text-[#0CC8A8] tracking-tighter leading-none">0%</span>
                        <span className="text-[8px] lg:text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">In Progress</span>
                    </div>

                    {/* Decorative dots/accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0.5 w-1.5 h-1.5 rounded-full bg-[#0CC8A8] shadow-[0_0_8px_#0CC8A8]" />
                </div>

                {/* Middle Divider (Desktop only) */}
                <div className="hidden sm:block w-px h-16 bg-border/40" />

                {/* Right Side: Workflow & Details */}
                <div className="flex-1 w-full flex flex-col gap-6">
                    {/* Top: Workflow Stepper */}
                    <div className="relative flex items-center justify-between w-full mx-auto px-2 sm:px-4 overflow-x-auto no-scrollbar pb-1">
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-10 sm:left-12 right-10 sm:right-12 h-0.5 bg-border/20 z-0 min-w-[450px] sm:min-w-0" />

                        <div className="flex items-center justify-between w-full min-w-[400px] sm:min-w-0 relative z-10">
                            <Step icon={TbWorldSearch} label="Spidering" isActive />
                            <Step icon={TbHierarchy} label="Mapping" />
                            <Step icon={TbFlask} label="Testing" />
                            <Step icon={TbClipboardCheck} label="Validating" />
                            <Step icon={TbFileDescription} label="Reporting" />
                        </div>
                    </div>

                    {/* Bottom: Scan Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-4 border-t border-border/50 pt-6">
                        <DetailItem label="Scan Type" value="Grey Box" />
                        <DetailItem label="Targets" value="google.com" />
                        <DetailItem label="Started At" value="Nov 22, 09:00AM" />
                        <DetailItem label="Credentials" value="2 Active" />
                        <DetailItem label="Files" value="Control.pdf" />
                        <DetailItem label="Checklists" value="40/350" highlight />
                    </div>
                </div>
            </div>
        </div>
    );
}
