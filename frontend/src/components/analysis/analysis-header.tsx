"use client"

import Link from "next/link"
import {
    ArrowLeft,
    BarChart3,
    Bookmark,
    Download,
    Package,
    Share2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type AnalysisHeaderProps = {
    analysisId: string
}

export function AnalysisHeader({
                                   analysisId,
                               }: AnalysisHeaderProps) {
    return (
        <section id="overview" className="scroll-mt-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/research" />}
                >
                    <ArrowLeft />
                    Back to Research
                </Button>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                        <Download />
                        Export PDF
                    </Button>

                    <Button variant="outline" size="sm">
                        <Share2 />
                        Share
                    </Button>

                    <Button variant="outline" size="sm">
                        <Bookmark />
                        Save
                    </Button>

                    <Button size="sm">
                        <BarChart3 />
                        Compare
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                <Card>
                    <CardContent className="flex min-h-[215px] items-center justify-center p-5">
                        <div className="flex size-36 items-center justify-center rounded-xl bg-muted">
                            <Package className="size-20 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>

                <div className="min-w-0">
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Portable Personal Blender
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>Amazon UK</span>
                            <span>•</span>
                            <span>Private Label</span>
                            <span>•</span>
                            <span>Analysis #{analysisId}</span>
                        </div>
                    </div>

                    <Card>
                        <CardContent className="grid p-0 sm:grid-cols-2 xl:grid-cols-6">
                            <Metric title="Opportunity Score">
                                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">
                    86
                  </span>

                                    <span className="text-sm text-primary">
                    /100
                  </span>
                                </div>

                                <Badge
                                    variant="secondary"
                                    className="mt-2 text-primary"
                                >
                                    Strong Opportunity
                                </Badge>
                            </Metric>

                            <Metric title="Est. Margin">
                                <p className="text-xl font-semibold">
                                    37%
                                </p>

                                <Badge
                                    variant="secondary"
                                    className="mt-2 text-primary"
                                >
                                    High
                                </Badge>
                            </Metric>

                            <Metric title="Demand">
                                <p className="text-lg font-semibold">
                                    High
                                </p>

                                <div className="mt-3 flex items-end gap-1">
                                    <span className="h-2 w-2 rounded-sm bg-primary" />
                                    <span className="h-3 w-2 rounded-sm bg-primary" />
                                    <span className="h-4 w-2 rounded-sm bg-primary" />
                                    <span className="h-5 w-2 rounded-sm bg-primary" />
                                    <span className="h-4 w-2 rounded-sm bg-primary/40" />
                                </div>
                            </Metric>

                            <Metric title="Competition">
                                <p className="text-lg font-semibold">
                                    Medium
                                </p>

                                <MetricProgress value={55} />
                            </Metric>

                            <Metric title="Risk Level">
                                <p className="text-lg font-semibold">
                                    Medium
                                </p>

                                <MetricProgress value={40} />
                            </Metric>

                            <Metric title="Est. Startup Cost">
                                <p className="text-xl font-semibold">
                                    £3,210
                                </p>

                                <Badge
                                    variant="secondary"
                                    className="mt-2"
                                >
                                    Medium
                                </Badge>
                            </Metric>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

function Metric({
                    title,
                    children,
                }: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="min-h-28 border-b p-4 sm:border-r xl:border-b-0 last:border-r-0">
            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                {title}
            </p>

            {children}
        </div>
    )
}

function MetricProgress({
                            value,
                        }: {
    value: number
}) {
    return (
        <div className="mt-4 h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${value}%` }}
            />
        </div>
    )
}