import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
    return (
        <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border/50">
                <Skeleton className="h-10 w-full sm:w-[300px] rounded-xl" />
                <div className="flex gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                    <Skeleton className="h-10 w-24 rounded-xl shrink-0" />
                    <Skeleton className="h-10 w-24 rounded-xl shrink-0" />
                    <Skeleton className="h-10 w-32 rounded-xl shrink-0" />
                </div>
            </div>
            <div className="px-6 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-8 py-4 border-b border-border/10">
                        <Skeleton className="h-5 w-[200px]" />
                        <Skeleton className="h-5 w-[100px]" />
                        <Skeleton className="h-8 w-[80px] rounded-md" />
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-5 w-[100px]" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ConsoleSkeleton() {
    return (
        <div className="w-full flex-1 flex flex-col gap-6 px-6">
            <div className="w-full flex-1 flex flex-col bg-card rounded-2xl border border-border overflow-hidden">
                <div className="h-14 border-b border-border/50 flex items-center px-6">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex-1 flex flex-col md:flex-row">
                    <div className="flex-[1.5] border-b md:border-b-0 md:border-r border-border/50 p-6 space-y-6">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex-1 p-4 space-y-4">
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="w-full bg-card rounded-2xl p-6 border border-border/50 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border/50 overflow-x-auto no-scrollbar gap-6">
                <div className="flex gap-6 sm:gap-8 min-w-max">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-20 sm:w-24" />
                    ))}
                </div>
                <Skeleton className="h-4 w-16 sm:w-20 shrink-0" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-border/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProgressHeaderSkeleton() {
    return (
        <div className="w-full bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-sm flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
            {/* Left: Circular Progress Skeleton */}
            <div className="shrink-0 h-24 w-24 lg:h-32 lg:w-32 rounded-full border border-border/10 flex items-center justify-center p-3">
                <Skeleton className="h-full w-full rounded-full" />
            </div>

            {/* Middle Divider (Desktop only) */}
            <div className="hidden sm:block w-px h-16 bg-border/40" />

            {/* Right Side: Workflow & Details */}
            <div className="flex-1 w-full flex flex-col gap-6">
                {/* Top: Workflow Stepper Skeleton */}
                <div className="relative flex items-center justify-between w-full px-2 sm:px-4 overflow-x-auto no-scrollbar">
                    <div className="absolute top-5 left-8 sm:left-12 right-8 sm:right-12 h-0.5 bg-border/20 z-0 min-w-[400px] sm:min-w-0" />
                    <div className="flex items-center justify-between w-full min-w-[350px] sm:min-w-0 relative z-10">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                                <Skeleton className="h-2.5 w-12 sm:h-3 sm:w-16" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: Info Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-4 border-t border-border/50 pt-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-2.5 w-16 opacity-50" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
