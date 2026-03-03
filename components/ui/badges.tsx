import { cn } from "@/lib/utils";

export type Severity = "Critical" | "High" | "Medium" | "Low";

interface SeverityBadgeProps {
    severity: Severity;
    count?: number;
    className?: string;
    dotOnly?: boolean;
}

export function SeverityBadge({ severity, count, className, dotOnly }: SeverityBadgeProps) {
    const styles = {
        Critical: {
            bg: "bg-[#EF4444]",
            text: "text-[#EF4444]",
            border: "border-[#EF4444]/20",
            lightBg: "bg-[#EF4444]/10",
        },
        High: {
            bg: "bg-[#F97316]",
            text: "text-[#F97316]",
            border: "border-[#F97316]/20",
            lightBg: "bg-[#F97316]/10",
        },
        Medium: {
            bg: "bg-[#F59E0B]",
            text: "text-[#F59E0B]",
            border: "border-[#F59E0B]/20",
            lightBg: "bg-[#F59E0B]/10",
        },
        Low: {
            bg: "bg-[#22C55E]",
            text: "text-[#22C55E]",
            border: "border-[#22C55E]/20",
            lightBg: "bg-[#22C55E]/10",
        },
    };

    if (dotOnly) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <div className={cn("h-1.5 w-1.5 rounded-full", styles[severity].bg)} />
                <span className="text-[13px] font-bold text-foreground">{severity}</span>
            </div>
        );
    }

    if (count !== undefined) {
        return (
            <div
                className={cn(
                    "h-[22px] w-[30px] rounded flex items-center justify-center text-[10px] font-bold text-white transition-all shadow-sm",
                    styles[severity].bg,
                    count === 0 && "opacity-20 grayscale",
                    className
                )}
            >
                {count}
            </div>
        );
    }

    return (
        <span
            className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-bold border whitespace-nowrap",
                styles[severity].lightBg,
                styles[severity].text,
                styles[severity].border,
                className
            )}
        >
            {severity}
        </span>
    );
}

export type Status = "Completed" | "Scheduled" | "Failed";

interface StatusChipProps {
    status: Status;
    className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
    const variants = {
        Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        Scheduled: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
        Failed: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
    };

    return (
        <span
            className={cn(
                "px-3 py-1 rounded-md text-[11px] font-bold border whitespace-nowrap",
                variants[status],
                className
            )}
        >
            {status}
        </span>
    );
}
