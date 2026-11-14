"use client"

import {
    BarChart3,
    Bookmark,
    X,
} from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Button } from "@/components/ui/button"

export function NextStepsCard() {
    return (
        <AnalysisSectionCard title="H. Next Steps">
            <p className="mb-6 text-sm leading-6 text-muted-foreground">
                Save this opportunity to your research and track
                your progress.
            </p>

            <div className="space-y-3">
                <Button className="w-full">
                    <Bookmark />
                    Save Opportunity
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                >
                    <BarChart3 />
                    Add to Comparison
                </Button>

                <Button
                    variant="outline"
                    className="w-full text-destructive"
                >
                    <X />
                    Mark as Rejected
                </Button>
            </div>
        </AnalysisSectionCard>
    )
}