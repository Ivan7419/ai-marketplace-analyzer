import {
    Check,
    X,
} from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Badge } from "@/components/ui/badge"

export function CompetitionAnalysisCard() {
    return (
        <AnalysisSectionCard title="B. Competition Analysis">
            <div className="grid gap-6 xl:grid-cols-[170px_1.2fr_.8fr_.7fr]">
                <div className="rounded-lg border bg-muted/20 p-4">
                    <p className="text-sm font-medium">
                        Competition Score
                    </p>

                    <div className="mt-5 flex items-baseline gap-1">
            <span className="text-4xl font-semibold">
              6.3
            </span>

                        <span className="text-muted-foreground">
              /10
            </span>
                    </div>

                    <p className="mt-3 text-sm font-medium">
                        Moderate
                    </p>
                </div>

                <div>
                    <p className="mb-3 text-sm font-medium">
                        Top Competitors
                    </p>

                    <div className="overflow-hidden rounded-lg border">
                        <CompetitorRow
                            number={1}
                            name="Competitor A"
                            price="£29.99"
                            reviews="2,452"
                            rating="4.5"
                            strength="Strong"
                        />

                        <CompetitorRow
                            number={2}
                            name="Competitor B"
                            price="£31.99"
                            reviews="872"
                            rating="4.3"
                            strength="Medium"
                        />

                        <CompetitorRow
                            number={3}
                            name="Competitor C"
                            price="£27.50"
                            reviews="184"
                            rating="4.2"
                            strength="Weak"
                            last
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-4 text-sm font-medium">
                        Market Gaps & Opportunities
                    </p>

                    <p className="mb-2 text-xs font-semibold">
                        What competitors do well
                    </p>

                    <CheckList
                        items={[
                            "Good battery life",
                            "Compact and portable",
                            "Easy to clean",
                        ]}
                    />

                    <p className="mb-2 mt-5 text-xs font-semibold">
                        What competitors do poorly
                    </p>

                    <CrossList
                        items={[
                            "Generic branding",
                            "Limited accessories",
                            "Weak for protein shakes",
                        ]}
                    />
                </div>

                <div className="rounded-lg border bg-muted/20 p-4">
                    <p className="mb-3 text-sm font-semibold">
                        Opportunity to Differentiate
                    </p>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Position specifically for gym users and protein
                        shakes with accessories and fitness-focused
                        branding.
                    </p>

                    <p className="mb-2 mt-4 text-xs font-semibold">
                        Potential angles
                    </p>

                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Stronger motor</li>
                        <li>• Measurement marks</li>
                        <li>• Protein shake bundle</li>
                        <li>• Gym lifestyle branding</li>
                    </ul>
                </div>
            </div>
        </AnalysisSectionCard>
    )
}

function CompetitorRow({
                           number,
                           name,
                           price,
                           reviews,
                           rating,
                           strength,
                           last = false,
                       }: {
    number: number
    name: string
    price: string
    reviews: string
    rating: string
    strength: string
    last?: boolean
}) {
    return (
        <div
            className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 p-3 ${
                last ? "" : "border-b"
            }`}
        >
      <span className="text-xs text-muted-foreground">
        {number}
      </span>

            <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                    {name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    {price} · {reviews} reviews · {rating} ★
                </p>
            </div>

            <Badge variant="secondary">
                {strength}
            </Badge>
        </div>
    )
}

function CheckList({
                       items,
                   }: {
    items: string[]
}) {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div
                    key={item}
                    className="flex gap-2 text-sm"
                >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )
}

function CrossList({
                       items,
                   }: {
    items: string[]
}) {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div
                    key={item}
                    className="flex gap-2 text-sm"
                >
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )
}