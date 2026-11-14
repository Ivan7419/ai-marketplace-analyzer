import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"

const steps = [
    "Contact 5–10 potential suppliers",
    "Negotiate target unit cost ≤ £6",
    "Order 2–3 product samples",
    "Verify UKCA & battery requirements",
    "Validate keyword demand on Amazon",
    "Develop branding and packaging",
    "Launch first batch of 200–300 units",
]

export function ActionPlanCard() {
    return (
        <AnalysisSectionCard title="G. Action Plan">
            <div className="space-y-1">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className="flex gap-3 py-1.5"
                    >
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {index + 1}
                        </div>

                        <p className="pt-0.5 text-sm">
                            {step}
                        </p>
                    </div>
                ))}
            </div>
        </AnalysisSectionCard>
    )
}