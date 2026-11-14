import { Sparkles } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function AiVerdictCard() {
    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex gap-4 p-5">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        AI Verdict
                    </p>

                    <p className="text-sm leading-6">
                        Strong opportunity with high and growing demand.
                        Moderate competition leaves room for differentiation,
                        especially with fitness-focused branding and accessory
                        bundles. Attractive margins with efficient sourcing.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}