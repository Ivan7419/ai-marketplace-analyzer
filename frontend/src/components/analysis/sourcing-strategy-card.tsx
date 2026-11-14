import {
    Box,
    ExternalLink,
    Factory,
    Ship,
    Timer,
} from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Button } from "@/components/ui/button"

export function SourcingStrategyCard() {
    return (
        <AnalysisSectionCard title="D. Sourcing Strategy">
            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <p className="text-xs text-muted-foreground">
                        Recommended Sourcing
                    </p>

                    <p className="mt-1 font-semibold text-primary">
                        Alibaba / Chinese OEM
                    </p>

                    <p className="mt-5 text-xs text-muted-foreground">
                        Why this model?
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Low manufacturing complexity and many qualified
                        suppliers are available with competitive pricing
                        and flexible minimum order quantities.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-6"
                    >
                        View Potential Suppliers
                        <ExternalLink />
                    </Button>
                </div>

                <div className="space-y-4">
                    <SourcingMetric
                        icon={Factory}
                        title="Target Factory Price"
                        value="£4.50 – £6.50"
                    />

                    <SourcingMetric
                        icon={Box}
                        title="Target MOQ"
                        value="200 – 500 units"
                    />

                    <SourcingMetric
                        icon={Timer}
                        title="Lead Time"
                        value="25 – 35 days"
                    />

                    <SourcingMetric
                        icon={Ship}
                        title="Best Shipping Method"
                        value="Sea Freight (LCL)"
                    />
                </div>
            </div>
        </AnalysisSectionCard>
    )
}

function SourcingMetric({
                            icon: Icon,
                            title,
                            value,
                        }: {
    icon: React.ElementType
    title: string
    value: string
}) {
    return (
        <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" />
            </div>

            <div>
                <p className="text-xs text-muted-foreground">
                    {title}
                </p>

                <p className="mt-1 text-sm font-medium">
                    {value}
                </p>
            </div>
        </div>
    )
}