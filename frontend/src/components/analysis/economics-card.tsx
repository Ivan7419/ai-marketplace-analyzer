"use client"

import { Zap } from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function EconomicsCard() {
    return (
        <AnalysisSectionCard title="C. Economics (Profitability Calculator)">
            <div className="grid gap-4 xl:grid-cols-3">
                <InnerCard title="Cost Breakdown (per unit)">
                    <CostRow label="Selling Price" value="£29.99" />
                    <CostRow label="Product Cost" value="£6.20" />
                    <CostRow label="Shipping to UK" value="£2.00" />
                    <CostRow label="Import Duties" value="£0.80" />
                    <CostRow label="Amazon Fees" value="£4.50" />
                    <CostRow label="Fulfilment (FBA)" value="£3.30" />
                    <CostRow label="Advertising (Est.)" value="£2.00" />

                    <Separator className="my-2" />

                    <CostRow
                        label="Profit / Unit"
                        value="£11.19"
                        strong
                    />

                    <CostRow
                        label="Margin"
                        value="37.3%"
                        strong
                    />

                    <CostRow
                        label="ROI"
                        value="124%"
                        strong
                    />
                </InnerCard>

                <InnerCard title="Estimated Startup Cost">
                    <CostRow label="MOQ (Units)" value="300" />
                    <CostRow label="Inventory" value="£1,860" />
                    <CostRow label="Shipping" value="£600" />
                    <CostRow label="Packaging & Labels" value="£250" />
                    <CostRow label="Certification / Testing" value="£0" />
                    <CostRow label="Initial Advertising" value="£500" />

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between rounded-md bg-primary/10 p-3">
            <span className="text-sm font-semibold">
              Total Estimated Cost
            </span>

                        <span className="font-semibold text-primary">
              £3,210
            </span>
                    </div>
                </InnerCard>

                <InnerCard title="Sensitivity Analysis">
                    <SensitivitySlider
                        label="Selling Price"
                        value="£29.99"
                        defaultValue={72}
                    />

                    <SensitivitySlider
                        label="Product Cost"
                        value="£6.20"
                        defaultValue={55}
                    />

                    <SensitivitySlider
                        label="Advertising"
                        value="£2.00"
                        defaultValue={45}
                    />

                    <div className="mt-5 rounded-md bg-primary/5 p-3 text-xs leading-5 text-muted-foreground">
                        Adjust the values to see how your profit and margin
                        change in real time.
                    </div>
                </InnerCard>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-lg bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 text-sm">
                    <Zap className="mt-0.5 size-4 shrink-0 text-primary" />

                    <p>
                        <strong>Tip:</strong> Increase price to £31.99 to
                        improve margin to 42% while maintaining strong
                        competitiveness.
                    </p>
                </div>

                <Button size="sm" variant="outline">
                    Optimize for Profit
                </Button>
            </div>
        </AnalysisSectionCard>
    )
}

function InnerCard({
                       title,
                       children,
                   }: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="rounded-lg border p-4">
            <p className="mb-4 text-sm font-semibold">
                {title}
            </p>

            {children}
        </div>
    )
}

function CostRow({
                     label,
                     value,
                     strong = false,
                 }: {
    label: string
    value: string
    strong?: boolean
}) {
    return (
        <div className="flex items-center justify-between py-1.5 text-sm">
      <span
          className={
              strong
                  ? "font-semibold"
                  : "text-muted-foreground"
          }
      >
        {label}
      </span>

            <span
                className={
                    strong
                        ? "font-semibold text-primary"
                        : ""
                }
            >
        {value}
      </span>
        </div>
    )
}

function SensitivitySlider({
                               label,
                               value,
                               defaultValue,
                           }: {
    label: string
    value: string
    defaultValue: number
}) {
    return (
        <div className="mb-6">
            <div className="mb-3 flex items-center justify-between text-sm">
                <span>{label}</span>

                <span className="rounded-md border px-2 py-1 text-xs">
          {value}
        </span>
            </div>

            <Slider
                defaultValue={[defaultValue]}
                max={100}
                step={1}
            />
        </div>
    )
}