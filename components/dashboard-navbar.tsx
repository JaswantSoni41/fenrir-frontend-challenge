"use client"

import { HiMiniHome } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Square } from "lucide-react";

interface DashboardNavbarProps {
    onMenuClick?: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
    return (
        <header className="h-20 border-b border-border bg-card dark:bg-background flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 w-full shrink-0 transition-colors">
            <div className="flex items-center gap-3 sm:gap-6">
                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-10 w-10 text-muted-foreground hover:bg-accent rounded-xl"
                    onClick={onMenuClick}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </Button>

                <h2 className="text-xl font-bold text-foreground tracking-tight">Scan</h2>

                <nav className="hidden md:flex items-center gap-3 text-[13.5px] font-medium transition-all">
                    <HiMiniHome className="h-4.5 w-4.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                    <span className="text-border">/</span>
                    <span className="text-muted-foreground cursor-pointer hover:text-foreground">Private Assets</span>
                    <span className="text-border">/</span>
                    <span className="text-primary cursor-pointer">New Scan</span>
                </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <Button
                    variant="outline"
                    className="rounded-xl border-border text-foreground font-bold h-10 px-3 sm:px-5 text-sm hover:bg-accent transition-colors bg-transparent cursor-pointer flex items-center gap-2"
                    onClick={() => toast.success("Scanning report exported and ready for download.")}
                >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export Report</span>
                </Button>
                <Button
                    variant="destructive"
                    className="rounded-xl font-bold h-10 px-3 sm:px-5 text-sm shadow-none transition-colors border-none bg-destructive/10 text-destructive dark:text-red-500 hover:bg-destructive/20 cursor-pointer flex items-center gap-2"
                    onClick={() => toast.error("Security scan terminated manually.")}
                >
                    <Square className="h-4 w-4 fill-current" />
                    <span className="hidden sm:inline">Stop Scan</span>
                </Button>
            </div>
        </header>
    );
}
