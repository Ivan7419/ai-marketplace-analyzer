import { AlertTriangle } from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function RiskAssessmentCard() {
    return (
        <AnalysisSectionCard title="F. Risk Assessment">
            <RiskRow
                label="Product Safety / Certification"
                level="High"
            />

            <RiskRow
                label="Strong Incumbent Brands"
                level="Medium"
            />

            <RiskRow
                label="Intellectual Property Risk"
                level="Medium"
            />

            <RiskRow
                label="Returns & Quality Issues"
                level="Medium"
            />

            <RiskRow
                label="Seasonality Risk"
                level="Low"
            />

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
        <span className="font-semibold">
          Overall Risk Level
        </span>

                <Badge variant="secondary">
                    Medium
                </Badge>
            </div>
        </AnalysisSectionCard>
    )
}

function RiskRow({
                     label,
                     level,
                 }: {
    label: string
    level: "Low" | "Medium" | "High"
}) {
    return (
        <div className="flex items-center gap-3 py-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                <AlertTriangle className="size-3.5" />
            </div>

            <span className="flex-1 text-sm">
        {label}
      </span>

            <Badge variant="secondary">
                {level}
            </Badge>
        </div>
    )
}