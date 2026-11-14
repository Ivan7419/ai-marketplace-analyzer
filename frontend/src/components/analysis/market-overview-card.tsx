import { Badge } from "@/components/ui/badge"
import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"

export function MarketOverviewCard() {
    return (
        <AnalysisSectionCard title="A. Market Overview">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.55fr_1fr]">
                <div>
                    <p className="mb-4 text-sm font-medium">
                        Search Demand Trend
                    </p>

                    <DemandChart />
                </div>

                <div className="space-y-5">
                    <InfoBlock
                        label="Market Size"
                        value="Large"
                        description="High search volume"
                    />

                    <InfoBlock
                        label="Growth Trend"
                        value="+32%"
                        description="Last 12 months"
                        highlight
                    />

                    <InfoBlock
                        label="Seasonality"
                        value="Low"
                        description="Stable year-round"
                    />
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">
                        Key Insights
                    </p>

                    <KeyValueRow
                        label="Target Customer"
                        value="Fitness enthusiasts, busy professionals, travellers"
                    />

                    <KeyValueRow
                        label="Typical Price Range"
                        value="£24.99 – £39.99"
                    />

                    <KeyValueRow
                        label="Market Maturity"
                        value="Growing"
                    />

                    <div className="flex items-center justify-between gap-4 border-t py-3 text-sm">
            <span className="text-muted-foreground">
              Amazon Suitability
            </span>

                        <Badge
                            variant="secondary"
                            className="text-primary"
                        >
                            Excellent
                        </Badge>
                    </div>
                </div>
            </div>
        </AnalysisSectionCard>
    )
}

function InfoBlock({
                       label,
                       value,
                       description,
                       highlight = false,
                   }: {
    label: string
    value: string
    description: string
    highlight?: boolean
}) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p
                className={
                    highlight
                        ? "mt-1 font-semibold text-primary"
                        : "mt-1 font-semibold"
                }
            >
                {value}
            </p>

            <p className="text-xs text-muted-foreground">
                {description}
            </p>
        </div>
    )
}

function KeyValueRow({
                         label,
                         value,
                     }: {
    label: string
    value: string
}) {
    return (
        <div className="flex justify-between gap-6 border-t py-3 text-sm first:border-t-0">
      <span className="shrink-0 text-muted-foreground">
        {label}
      </span>

            <span className="text-right">
        {value}
      </span>
        </div>
    )
}

function DemandChart() {
    return (
        <div className="relative h-[220px] overflow-hidden">
            <div className="absolute inset-y-3 left-12 right-0 grid grid-rows-3">
                <div className="border-b" />
                <div className="border-b" />
                <div />
            </div>

            <span className="absolute left-0 top-2 text-xs text-muted-foreground">
        High
      </span>

            <span className="absolute left-0 top-[47%] text-xs text-muted-foreground">
        Medium
      </span>

            <span className="absolute bottom-7 left-0 text-xs text-muted-foreground">
        Low
      </span>

            <svg
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
                className="absolute bottom-8 left-12 right-0 h-[170px] w-[calc(100%-3rem)] text-primary"
            >
                <polyline
                    points="
            0,150
            45,140
            90,112
            135,100
            180,118
            225,124
            270,106
            315,70
            360,58
            405,95
            450,44
            495,52
            540,34
            575,10
            600,24
          "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[10px] text-muted-foreground">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
            </div>
        </div>
    )
}