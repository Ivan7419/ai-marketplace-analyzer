import {
    Check,
    Sparkles,
} from "lucide-react"

import { AnalysisSectionCard } from "@/components/analysis/analysis-section-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function SalesStrategyCard() {
    return (
        <AnalysisSectionCard title="E. Sales Strategy">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_.9fr]">
                <div>
                    <p className="mb-3 text-xs text-muted-foreground">
                        Recommended Marketplaces
                    </p>

                    <MarketplaceRow
                        rank={1}
                        name="Amazon UK"
                        score="9/10"
                    />

                    <MarketplaceRow
                        rank={2}
                        name="TikTok Shop UK"
                        score="8/10"
                    />

                    <MarketplaceRow
                        rank={3}
                        name="eBay UK"
                        score="6/10"
                    />

                    <p className="mb-2 mt-5 text-xs text-muted-foreground">
                        Key Selling Points
                    </p>

                    <SellingPoint text="Powerful motor for protein shakes" />
                    <SellingPoint text="Portable & USB-C rechargeable" />
                    <SellingPoint text="Leak-proof and easy to clean" />
                    <SellingPoint text="Perfect for gym, travel and office" />
                </div>

                <div className="border-l pl-6">
                    <Info
                        label="Recommended Price"
                        value="£27.99 – £32.99"
                    />

                    <Info
                        label="Target Audience"
                        value="18–35 fitness enthusiasts"
                    />

                    <Info
                        label="Positioning"
                        value="Portable protein blender for gym and active lifestyle"
                    />

                    <Button className="mt-5 w-full">
                        <Sparkles />
                        Generate Listing Content
                    </Button>
                </div>
            </div>
        </AnalysisSectionCard>
    )
}

function MarketplaceRow({
                            rank,
                            name,
                            score,
                        }: {
    rank: number
    name: string
    score: string
}) {
    return (
        <div className="flex items-center gap-3 border-b py-2 last:border-b-0">
            <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs">
                {rank}
            </div>

            <span className="flex-1 text-sm">
        {name}
      </span>

            <Badge variant="secondary">
                {score}
            </Badge>
        </div>
    )
}

function SellingPoint({
                          text,
                      }: {
    text: string
}) {
    return (
        <div className="flex gap-2 py-1 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{text}</span>
        </div>
    )
}

function Info({
                  label,
                  value,
              }: {
    label: string
    value: string
}) {
    return (
        <div className="mb-5">
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium leading-6">
                {value}
            </p>
        </div>
    )
}