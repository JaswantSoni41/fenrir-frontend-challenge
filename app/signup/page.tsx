"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FaApple } from "react-icons/fa";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import { FaMeta } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            terms: false,
        },
    });

    const onSubmit = (values: FormValues) => {
        // Dummy signup logic
        localStorage.setItem("user", JSON.stringify({
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            isLoggedIn: true
        }));
        router.push("/dashboard");
    };

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-[url('/assets/images/login-bg.webp')] bg-cover bg-center font-sans flex flex-col items-stretch">
            <div className="absolute inset-0 bg-black/20"></div>
            <header className="relative z-10 flex w-full items-center justify-between p-6 px-10">
                <Link href="/" id="logo-container" className="flex items-center gap-2">
                    <div className="logo border-11 border-primary bg-white w-8 h-8 rounded-full" />
                    <span className="text-2xl font-bold text-white">aps</span>
                </Link>
            </header>
            <section id="signup-container" className="relative z-10 flex w-full items-center justify-between gap-4 p-6 md:px-10 xl:px-28 flex-1">
                <article id="company-banner" className="hidden lg:flex flex-col justify-center h-full w-full max-w-2xl">
                    <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-12">
                        Expert level Cybersecurity in <span className="text-primary">hours</span> not weeks.
                    </h2>

                    <div className="space-y-8">
                        <p className="text-base font-semibold tracking-[0.2em] text-white uppercase">What's included</p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-zinc-300">
                                <svg className="h-5 w-5 shrink-0 text-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg leading-snug">Effortlessly spider and map targets to uncover hidden security flaws</span>
                            </li>
                            <li className="flex items-start gap-4 text-zinc-300">
                                <svg className="h-5 w-5 shrink-0 text-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg leading-snug">Deliver high-quality, validated findings in hours, not weeks.</span>
                            </li>
                            <li className="flex items-start gap-4 text-zinc-300">
                                <svg className="h-5 w-5 shrink-0 text-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg leading-snug">Generate professional, enterprise-grade security reports automatically.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-20">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-primary text-xl">★</span>
                            <span className="text-sm font-semibold tracking-wide text-white">Trustpilot</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            Rated 4.5/5.0 <span className="text-zinc-500 text-sm font-medium ml-2">(100k+ reviews)</span>
                        </p>
                    </div>
                </article>
                <article id="signup-form" className="w-full max-w-lg flex items-center justify-center mx-auto lg:mx-0">
                    <Card className="w-full border-none shadow-2xl p-4 lg:p-8 bg-white dark:bg-white overflow-hidden rounded-[40px]">
                        <CardHeader className="text-center space-y-2 pb-8">
                            <CardTitle className="text-4xl font-bold text-zinc-900 tracking-tight">Sign up</CardTitle>
                            <CardDescription className="text-base text-zinc-500 font-medium">
                                Already have an account? <Link href="/login" className="text-primary hover:underline font-semibold underline-offset-4">Log in</Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="First name*" className="h-12 rounded-xl border-zinc-200 focus-visible:ring-primary/20 dark:bg-white dark:text-black" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Last name*" className="h-12 rounded-xl border-zinc-200 focus-visible:ring-primary/20 dark:bg-white dark:text-black" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                 

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="email" placeholder="Email address*" className="h-12 rounded-xl border-zinc-200 focus-visible:ring-primary/20 dark:bg-white dark:text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Password (8+ characters)*"
                                                            className="h-12 rounded-xl border-zinc-200 pr-10 focus-visible:ring-primary/20 dark:bg-white dark:text-black"
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                                                        >
                                                            {showPassword ? (
                                                                <TbEye className="h-5 w-5" />
                                                            ) : (
                                                                <TbEyeClosed className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-start gap-3 py-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            id="terms"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="mt-1 border-zinc-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                        />
                                                    </FormControl>
                                                    <label htmlFor="terms" className="text-[11px] leading-relaxed font-medium text-zinc-500 cursor-pointer inline-block">
                                                        I agree to Aps's <Link href="#" className="font-bold text-blue-600 underline underline-offset-2">Terms & Conditions</Link> and acknowledge the <Link href="#" className="font-bold text-blue-600 underline underline-offset-2">Privacy Policy</Link>
                                                    </label>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-full shadow-[0_10px_20px_-5px_rgba(12,200,168,0.4)] transition-all active:scale-[0.98] cursor-pointer">
                                        Create account
                                    </Button>

                                    <div className="grid grid-cols-3 gap-3 pb-2 pt-2">
                                        <Button type="button" variant="outline" className="h-12 rounded-3xl border-none group bg-black dark:bg-black text-white hover:bg-black/90 dark:hover:bg-black/90 transition-colors cursor-pointer">
                                            <FaApple className="h-6 w-6 group-hover:text-white transition-all" />
                                        </Button>
                                        <Button type="button" variant="outline" className="h-12 rounded-3xl border-none bg-[#F5F5F7] dark:bg-[#F5F5F7] hover:bg-zinc-100 dark:hover:bg-zinc-100 transition-colors cursor-pointer">
                                            <FcGoogle className="h-6 w-6" />
                                        </Button>
                                        <Button type="button" variant="outline" className="h-12 rounded-3xl border-none bg-[#0064E0] dark:bg-[#0064E0] text-white hover:bg-[#0054bc] dark:hover:bg-[#0054bc] transition-colors cursor-pointer">
                                            <FaMeta className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </article>
            </section>
        </main>
    );
}
