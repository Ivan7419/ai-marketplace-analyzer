"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BarChart3,
    CircleHelp,
    DollarSign,
    FlaskConical,
    LayoutDashboard,
    ListChecks,
    Search,
    Settings,
    ShieldAlert,
    ShoppingBag,
    Sparkles,
    Store,
    Tags,
    Target,
    Truck,
    Users,
} from "lucide-react"

import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

const mainItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "New Analysis",
        href: "/analyze",
        icon: Sparkles,
    },
    {
        title: "Research",
        href: "/research",
        icon: Search,
    },
    {
        title: "Compare",
        href: "/compare",
        icon: BarChart3,
    },
]

const toolItems = [
    {
        title: "Opportunity Finder",
        href: "/opportunities",
        icon: FlaskConical,
    },
    {
        title: "Supplier Finder",
        href: "/suppliers",
        icon: Store,
    },
    {
        title: "Keyword Explorer",
        href: "/keywords",
        icon: Tags,
    },
]

const analysisItems = [
    {
        title: "Overview",
        href: "#overview",
        icon: LayoutDashboard,
    },
    {
        title: "Market",
        href: "#market",
        icon: BarChart3,
    },
    {
        title: "Competition",
        href: "#competition",
        icon: Users,
    },
    {
        title: "Economics",
        href: "#economics",
        icon: DollarSign,
    },
    {
        title: "Sourcing",
        href: "#sourcing",
        icon: Truck,
    },
    {
        title: "Sales Strategy",
        href: "#sales",
        icon: Target,
    },
    {
        title: "Risks",
        href: "#risks",
        icon: ShieldAlert,
    },
    {
        title: "Action Plan",
        href: "#action-plan",
        icon: ListChecks,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    const isAnalysisPage =
        pathname.startsWith("/analysis/")

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-2 py-1"
                >
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ShoppingBag className="size-5" />
                    </div>

                    <div className="grid leading-tight">
            <span className="font-semibold">
              Marketplace AI
            </span>

                        <span className="text-xs text-muted-foreground">
              Analyzer
            </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {mainItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            render={
                                                <Link href={item.href} />
                                            }
                                            isActive={
                                                pathname === item.href
                                            }
                                        >
                                            <Icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {isAnalysisPage ? (
                    <>
                        <SidebarSeparator />

                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Current Analysis
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="gap-1">
                                    {analysisItems.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton
                                                    render={
                                                        <a href={item.href} />
                                                    }
                                                >
                                                    <Icon />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </>
                ) : (
                    <>
                        <SidebarSeparator />

                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Tools
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu className="gap-1">
                                    {toolItems.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton
                                                    render={
                                                        <Link href={item.href} />
                                                    }
                                                    isActive={
                                                        pathname === item.href
                                                    }
                                                >
                                                    <Icon />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </>
                )}
            </SidebarContent>

            <SidebarFooter className="gap-3 p-3">
                <SidebarMenu className="gap-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            render={
                                <Link href="/settings" />
                            }
                            isActive={
                                pathname === "/settings"
                            }
                        >
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            render={
                                <Link href="/help" />
                            }
                            isActive={
                                pathname === "/help"
                            }
                        >
                            <CircleHelp />
                            <span>Help & Docs</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {!isAnalysisPage && (
                    <div className="rounded-lg border bg-card p-3">
                        <div className="mb-3">
                            <p className="text-sm font-medium">
                                Pro Plan
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Analyses used
                            </p>
                        </div>

                        <div className="mb-2 flex items-end gap-1">
              <span className="text-2xl font-semibold">
                17
              </span>

                            <span className="pb-1 text-sm text-muted-foreground">
                / 30
              </span>
                        </div>

                        <Progress value={57} />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Resets next month
                        </p>
                    </div>
                )}

                <SidebarSeparator />

                <div className="flex items-center gap-3 px-2 py-1">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        JD
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            John Doe
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            john@example.com
                        </p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}