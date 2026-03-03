"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineAdjustmentsHorizontal,
    HiOutlinePlus,
    HiChevronLeft,
    HiChevronRight
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Columns } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { StatusChip, SeverityBadge } from "@/components/ui/badges";
import { TableSkeleton } from "@/components/ui/loaders";
import { toast } from "sonner";

interface ScanData {
    id: string;
    name: string;
    type: string;
    status: 'Completed' | 'Scheduled' | 'Failed';
    progress: number;
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    lastScan: string;
}

const dummyScans: ScanData[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i + 1}`,
    name: i > 7 ? (i === 8 ? "IoT Devices" : "Temp Data") : "Web App Servers",
    type: i > 7 ? "Blackbox" : "Greybox",
    status: i > 8 ? "Failed" : (i > 6 ? "Scheduled" : "Completed"),
    progress: i > 8 ? 10 : 100,
    vulnerabilities: {
        critical: i > 8 ? 2 : (i > 6 ? 0 : 5),
        high: i > 8 ? 4 : (i > 6 ? 5 : 12),
        medium: i > 8 ? 8 : (i > 6 ? 12 : 23),
        low: i > 8 ? 1 : (i > 6 ? 0 : 18),
    },
    lastScan: i > 7 ? "3d ago" : "4d ago",
}));

function VulnerabilityBadges({ vulnerabilities }: { vulnerabilities: ScanData['vulnerabilities'] }) {
    return (
        <div className="flex items-center gap-1">
            <SeverityBadge severity="Critical" count={vulnerabilities.critical} />
            <SeverityBadge severity="High" count={vulnerabilities.high} />
            <SeverityBadge severity="Medium" count={vulnerabilities.medium} />
            <SeverityBadge severity="Low" count={vulnerabilities.low} />
        </div>
    );
}

function ProgressBar({ progress, status, className }: { progress: number; status: ScanData['status']; className?: string }) {
    const color = status === 'Failed' ? 'bg-[#EF4444]' : 'bg-[#0CC8A8]';
    return (
        <div className={cn("flex items-center gap-3 w-full", className)}>
            <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-700 ease-out", color)}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-[11px] font-bold text-foreground w-8 shrink-0">{progress}%</span>
        </div>
    );
}

function MobileScanCard({ scan }: { scan: ScanData }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    return (
        <div className="bg-background rounded-2xl border border-border overflow-hidden transition-all shadow-sm">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex flex-col gap-1">
                    <span
                        className="text-[13px] font-bold text-foreground hover:text-primary transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push("/scans");
                        }}
                    >
                        {scan.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">{scan.type} • {scan.lastScan}</span>
                </div>
                <div className="flex items-center gap-3">
                    <StatusChip status={scan.status} />
                    <HiChevronRight className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-90"
                    )} />
                </div>
            </div>

            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out bg-muted/20 border-t border-border/50",
                isExpanded ? "max-h-[500px] px-4 py-5 opacity-100" : "max-h-0 p-0 opacity-0"
            )}>
                <div className="space-y-6">
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Current Progress</span>
                        <ProgressBar progress={scan.progress} status={scan.status} />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Vulnerability Assessment</span>
                        <VulnerabilityBadges vulnerabilities={scan.vulnerabilities} />
                    </div>
                    <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-primary font-bold text-[12px]"
                        onClick={() => router.push("/scans")}
                    >
                        View Full Details →
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function ScansTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredScans = dummyScans.filter(scan =>
        scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scan.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <TableSkeleton />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col sm:h-full bg-card sm:overflow-hidden"
        >
            <div className="px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50">
                <div className="relative flex-1 w-full">
                    <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                        placeholder="Search scans by name or type..."
                        className="pl-11 h-11 bg-transparent border-border rounded-xl text-sm focus-visible:ring-primary/20 transition-all font-medium w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="h-11 flex-1 md:flex-none px-4 rounded-xl flex items-center justify-center gap-2.5 border-border text-foreground font-bold text-sm hover:bg-accent cursor-pointer"
                        onClick={() => toast.info("Filter sidebar opening...")}
                    >
                        <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-muted-foreground" />
                        <span className="hidden sm:inline">Filter</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-11 flex-1 md:flex-none px-4 rounded-xl flex items-center justify-center gap-2.5 border-border text-foreground font-bold text-sm hover:bg-accent cursor-pointer"
                        onClick={() => toast.info("Column selector opening...")}
                    >
                        <Columns className="h-5 w-5 text-muted-foreground" />
                        <span className="hidden sm:inline">Column</span>
                    </Button>
                    <Button
                        className="h-11 flex-[1.5] md:flex-none px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 bg-[#0CC8A8] hover:bg-[#0BAF94] text-white font-bold text-sm border-none shadow-sm transition-all active:scale-95 cursor-pointer"
                        onClick={() => toast.success("Initializing new security scan...")}
                    >
                        <HiOutlinePlus className="h-4.5 w-4.5 stroke-[3.5px]" />
                        <span className="whitespace-nowrap">New scan</span>
                    </Button>
                </div>
            </div>

            <div className="hidden sm:block flex-1 overflow-y-auto relative w-full">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-20 bg-card/95 backdrop-blur-md border-b border-border/50">
                        <tr>
                            <th className="px-8 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[25%] whitespace-nowrap">Scan Name</th>
                            <th className="px-8 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[15%] whitespace-nowrap">Type</th>
                            <th className="px-8 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[15%] whitespace-nowrap">Status</th>
                            <th className="px-8 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[20%] whitespace-nowrap">Progress</th>
                            <th className="px-8 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[15%] whitespace-nowrap">Vulnerability</th>
                            <th className="px-8 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 w-[10%] whitespace-nowrap">Last Scan</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/5">
                        <AnimatePresence mode="popLayout">
                            {filteredScans.length > 0 ? (
                                filteredScans.map((scan, idx) => (
                                    <motion.tr
                                        key={scan.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-muted/10 transition-colors group cursor-pointer"
                                        onClick={() => router.push("/scans")}
                                    >
                                        <td className="px-8 py-5 text-[13.5px] font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                                            {scan.name}
                                        </td>
                                        <td className="px-8 py-5 text-[13.5px] text-foreground font-medium whitespace-nowrap">
                                            {scan.type}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <StatusChip status={scan.status} />
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <ProgressBar progress={scan.progress} status={scan.status} className="max-w-[140px]" />
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <VulnerabilityBadges vulnerabilities={scan.vulnerabilities} />
                                        </td>
                                        <td className="px-8 py-5 text-[13.5px] text-muted-foreground font-medium text-right whitespace-nowrap">
                                            {scan.lastScan}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr key="empty">
                                    <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground font-medium">
                                        No scans found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div className="sm:hidden flex flex-col p-4 gap-4">
                {filteredScans.length > 0 ? (
                    filteredScans.map((scan) => (
                        <MobileScanCard key={scan.id} scan={scan} />
                    ))
                ) : (
                    <div className="py-20 text-center text-muted-foreground font-medium">
                        No scans found matching "{searchQuery}"
                    </div>
                )}
            </div>

            <div className="px-8 py-5 flex items-center justify-between border-t border-border/50 bg-card/50">
                <div className="text-[12px] font-bold text-muted-foreground/70">
                    Showing {filteredScans.length} of {dummyScans.length} Scans
                </div>

                <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
                        <HiChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
                        <HiChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
