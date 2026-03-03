"use client"

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    HiOutlineSquares2X2,
    HiOutlineClipboardDocumentCheck,
    HiOutlineChartBar,
    HiOutlineCalendarDays,
    HiOutlineBell,
    HiOutlineCog6Tooth,
    HiOutlineInformationCircle,
    HiChevronRight,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineArrowLeftOnRectangle
} from "react-icons/hi2";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    hasNotification?: boolean;
}

function NavItem({ href, icon: Icon, label, hasNotification }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 font-medium",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
        >
            <Icon className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )} />
            <span className="text-sm">{label}</span>
            {hasNotification && (
                <div className="absolute left-[26px] top-[14px] h-2 w-2 rounded-full border-2 border-card bg-orange-500" />
            )}
        </Link>
    );
}

interface SidebarProps {
    onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        router.push("/login");
    };

    return (
        <aside className="w-[280px] h-screen bg-card dark:bg-background border-r border-border flex flex-col shrink-0 relative">
            {/* Mobile Close Button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden absolute right-4 top-6 h-10 w-10 text-muted-foreground hover:bg-accent rounded-xl"
                onClick={onClose}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </Button>
            {/* Logo */}
            <h1 className="p-8 py-6">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <div className="relative h-9 w-9 rounded-full border-12 border-primary bg-white flex items-center justify-center">
                        <div className="h-0.5 w-0.5 rounded-full bg-white" />
                    </div>
                    <span className="text-2xl font-bold text-primary tracking-tight">aps</span>
                </Link>
            </h1>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 space-y-1 mt-6">
                <NavItem
                    href="/dashboard"
                    icon={HiOutlineSquares2X2}
                    label="Dashboard"
                />
                <NavItem
                    href="/projects"
                    icon={HiOutlineClipboardDocumentCheck}
                    label="Projects"
                />
                <NavItem
                    href="/scans"
                    icon={HiOutlineChartBar}
                    label="Scans"
                    hasNotification
                />
                <NavItem
                    href="/schedule"
                    icon={HiOutlineCalendarDays}
                    label="Schedule"
                />

                <div className="h-px bg-border mx-4 my-8" />

                <NavItem
                    href="/notifications"
                    icon={HiOutlineBell}
                    label="Notifications"
                    hasNotification
                />
                <NavItem
                    href="/settings"
                    icon={HiOutlineCog6Tooth}
                    label="Settings"
                />
                <NavItem
                    href="/support"
                    icon={HiOutlineInformationCircle}
                    label="Support"
                />

                {/* Theme Toggle in Nav */}
                <div className="px-2 pt-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-4 py-3.5 h-auto rounded-2xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all font-medium border-none"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {mounted && theme === "dark" ? (
                            <>
                                <HiOutlineSun className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Light Mode</span>
                            </>
                        ) : (
                            <>
                                <HiOutlineMoon className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">Dark Mode</span>
                            </>
                        )}
                    </Button>
                </div>
            </nav>

            {/* Profile Footer */}
            <div className="p-4 pt-0 relative">
                <AnimatePresence>
                    {showLogout && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-20"
                        >
                            <button
                                onClick={handleLogout}
                                className="w-full h-12 flex items-center gap-3 px-4 hover:bg-destructive/10 text-destructive transition-colors text-sm font-bold cursor-pointer"
                            >
                                <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className={cn(
                        "mt-8 flex items-center gap-3 p-3 rounded-2xl border border-transparent transition-colors cursor-pointer group relative z-10",
                        showLogout ? "bg-accent" : "hover:bg-accent"
                    )}
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <div className="relative h-10 w-10 shrink-0 rounded-full bg-amber-400 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center pt-2">
                            <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-50" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-[11px] font-medium text-muted-foreground truncate tracking-wide uppercase">admin@edu.com</p>
                        <p className="text-sm font-bold text-foreground truncate">Security Lead</p>
                    </div>
                    <HiChevronRight className={cn(
                        "h-4 w-4 text-muted-foreground transition-all duration-300",
                        showLogout ? "rotate-90 text-foreground" : "group-hover:text-foreground"
                    )} />
                </div>
            </div>
        </aside>
    );
}
