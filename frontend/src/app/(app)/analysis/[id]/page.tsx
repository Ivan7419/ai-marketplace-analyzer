import { ActionPlanCard } from "@/components/analysis/action-plan-card"
import { AiVerdictCard } from "@/components/analysis/ai-verdict-card"
import { AnalysisHeader } from "@/components/analysis/analysis-header"
import { CompetitionAnalysisCard } from "@/components/analysis/competition-analysis-card"
import { EconomicsCard } from "@/components/analysis/economics-card"
import { MarketOverviewCard } from "@/components/analysis/market-overview-card"
import { NextStepsCard } from "@/components/analysis/next-steps-card"
import { RiskAssessmentCard } from "@/components/analysis/risk-assessment-card"
import { SalesStrategyCard } from "@/components/analysis/sales-strategy-card"
import { SourcingStrategyCard } from "@/components/analysis/sourcing-strategy-card"

export default async function AnalysisPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-[1500px] space-y-4 px-4 py-5 md:px-6 lg:px-8">
                <AnalysisHeader analysisId={id} />

                <AiVerdictCard />

                <section id="market" className="scroll-mt-6">
                    <MarketOverviewCard />
                </section>

                <section id="competition" className="scroll-mt-6">
                    <CompetitionAnalysisCard />
                </section>

                <section id="economics" className="scroll-mt-6">
                    <EconomicsCard />
                </section>

                <div className="grid gap-4 xl:grid-cols-2">
                    <section id="sourcing" className="scroll-mt-6">
                        <SourcingStrategyCard />
                    </section>

                    <section id="sales" className="scroll-mt-6">
                        <SalesStrategyCard />
                    </section>
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                    <section id="risks" className="scroll-mt-6">
                        <RiskAssessmentCard />
                    </section>

                    <section id="action-plan" className="scroll-mt-6">
                        <ActionPlanCard />
                    </section>

                    <NextStepsCard />
                </div>
            </div>
        </main>
    )
}