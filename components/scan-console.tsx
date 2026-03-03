"use client"

import { useState, useEffect } from "react";
import { HiChevronDown, HiOutlineXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ConsoleSkeleton } from "@/components/ui/loaders";
import { toast } from "sonner";
import { SeverityBadge } from "@/components/ui/badges";

interface ActivityEntry {
    timestamp: string;
    message: string;
    highlights?: string[];
}

interface FindingEntry {
    severity: "Critical" | "High" | "Medium" | "Low";
    title: string;
    endpoint: string;
    description: string;
    time: string;
}

interface LoopEntry {
    timestamp: string;
    message: string;
    status: 'checking' | 'running' | 'done';
}

const activityLogs: ActivityEntry[] = [
    {
        timestamp: "09:00:00",
        message: "Spidering initiated on **https://google.com**",
        highlights: ["https://google.com"]
    },
    {
        timestamp: "09:00:05",
        message: "Discovered 142 unique endpoints via **depth-first** crawl",
        highlights: ["142", "depth-first"]
    },
    {
        timestamp: "09:02:12",
        message: "Header analysis: **Server: gws** detected",
        highlights: ["gws"]
    },
    {
        timestamp: "09:05:30",
        message: "Testing for **parameter pollution** on /search?q=*",
        highlights: ["parameter", "pollution"]
    },
    {
        timestamp: "09:10:45",
        message: "Alert: **Cross-Origin Resource Sharing** misconfiguration found",
        highlights: ["Cross-Origin", "Resource", "Sharing"]
    },
    {
        timestamp: "09:15:20",
        message: "Validating findings against **OWASP Top 10** (2021) benchmarks",
        highlights: ["OWASP", "Top", "10"]
    }
];

const findingLogs: FindingEntry[] = [
    {
        severity: "High",
        title: "Broken Access Control",
        endpoint: "/api/v1/user/settings",
        description: "Direct reference to internal objects allows unauthorized parameter modification.",
        time: "10 mins ago"
    },
    {
        severity: "Medium",
        title: "Security Misconfiguration",
        endpoint: "/admin/config",
        description: "Detailed error messages are enabled, leaking internal system architecture details.",
        time: "15 mins ago"
    }
];

const loopLogs: LoopEntry[] = [
    { timestamp: "15:00:45", message: "Checking for **SQL Injection** on /api/v1/auth", status: "checking" },
    { timestamp: "15:00:48", message: "Verification loop #4 started: **Bypassing WAF**", status: "running" },
    { timestamp: "15:00:52", message: "Validation complete: **No vulnerabilities detected** in module 7", status: "done" },
];

export function ScanConsole() {
    const [activeTab, setActiveTab] = useState<'Activity' | 'Loops'>('Activity');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <ConsoleSkeleton />;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex-none md:flex-1 flex flex-col px-4 sm:px-6 min-h-0"
        >
            <div className="w-full flex-1 flex flex-col bg-card rounded-2xl border border-border overflow-hidden shadow-sm transition-all">
                {/* Console Header */}
                <div className="px-4 sm:px-6 min-h-14 py-3 sm:py-0 border-b border-border/50 flex items-center justify-between bg-card/50 gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="h-2 w-2 rounded-full bg-[#0CC8A8] animate-pulse shrink-0" />
                            <span className="text-[13px] sm:text-sm font-bold tracking-tight whitespace-nowrap">
                                <span className="hidden sm:inline">Live Scan </span>Console
                            </span>
                        </div>
                        <div className="px-2 sm:px-3 py-1 rounded-full bg-muted/50 border border-border/30 flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                            <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Running...</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground shrink-0">
                        <HiChevronDown className="h-5 w-5 cursor-pointer hover:text-foreground transition-colors" />
                        <HiOutlineXMark
                            className="h-5 w-5 cursor-pointer hover:text-foreground transition-colors"
                            onClick={() => toast.info("Console panel collapsed")}
                        />
                    </div>
                </div>

                {/* Main Console Content */}
                <div className="flex-none md:flex-1 flex flex-col md:flex-row min-h-[500px] md:min-h-0 overflow-visible md:overflow-hidden">
                    {/* Left Side: Activity Log / Loops */}
                    <div className="flex-none md:flex-[1.5] flex flex-col border-b md:border-b-0 md:border-r border-border/50 min-h-[350px] md:min-h-0">
                        <div className="px-6 flex items-center gap-8 border-b border-border/30 shrink-0">
                            <button
                                onClick={() => setActiveTab('Activity')}
                                className={cn(
                                    "h-12 text-[12px] font-bold tracking-tight transition-all relative",
                                    activeTab === 'Activity' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Activity Log
                                {activeTab === 'Activity' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('Loops')}
                                className={cn(
                                    "h-12 text-[12px] font-bold tracking-tight transition-all relative",
                                    activeTab === 'Loops' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Verification Loops
                                {activeTab === 'Loops' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/30">
                            <AnimatePresence mode="wait">
                                {activeTab === 'Activity' ? (
                                    <motion.div
                                        key="activity"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-8"
                                    >
                                        {activityLogs.map((log, idx) => (
                                            <div key={idx} className="flex gap-4 group">
                                                <span className="text-[13px] font-mono text-muted-foreground/40 shrink-0 mt-0.5">[{log.timestamp}]</span>
                                                <div className="space-y-2">
                                                    <p className="text-[13px] leading-relaxed text-muted-foreground/80 font-mono">
                                                        {log.message.split(' ').map((word, i) => {
                                                            const isHighlight = log.highlights?.some(h => word.includes(h.replace(/\*/g, '')));
                                                            return (
                                                                <span key={i} className={cn(
                                                                    isHighlight && word.startsWith('**') ? "text-red-500 font-bold" : isHighlight ? "text-[#0CC8A8] font-bold bg-[#0CC8A8]/10 px-1 rounded" : ""
                                                                )}>
                                                                    {word}{' '}
                                                                </span>
                                                            );
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="loops"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="space-y-6"
                                    >
                                        {loopLogs.map((log, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 font-mono">
                                                <span className="text-[12px] text-primary">[{log.timestamp}]</span>
                                                <div className="flex-1 text-[13px] text-muted-foreground">
                                                    {log.message.split('**').map((part, i) => (
                                                        <span key={i} className={i % 2 === 1 ? "text-[#0CC8A8] font-bold" : ""}>{part}</span>
                                                    ))}
                                                </div>
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full mt-1.5",
                                                    log.status === 'done' ? "bg-green-500" : "bg-primary animate-pulse"
                                                )} />
                                            </div>
                                        ))}
                                        <div className="text-center py-10 opacity-40">
                                            <p className="text-[11px] font-bold uppercase tracking-widest">End of verification chain</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side: Finding Log */}
                    <div className="flex-none md:flex-1 flex flex-col bg-background/10 min-h-[300px] md:min-h-0">
                        <div className="px-6 h-12 flex items-center border-b border-border/30 shrink-0">
                            <span className="text-[12px] font-bold tracking-tight">Finding Log</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                            {findingLogs.map((finding, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-5 bg-card rounded-xl border border-border shadow-sm hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <SeverityBadge severity={finding.severity} />
                                        <span className="text-[11px] font-mono text-muted-foreground/50">{finding.time}</span>
                                    </div>
                                    <h4 className="text-[15px] font-bold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">{finding.title}</h4>
                                    <p className="text-[12px] font-mono text-[#0CC8A8] mb-4 truncate">{finding.endpoint}</p>
                                    <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                                        {finding.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
