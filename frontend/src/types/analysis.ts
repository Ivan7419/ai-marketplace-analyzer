export type RatingLevel = "low" | "medium" | "high"

export type CompetitionLevel =
    | "low"
    | "low-medium"
    | "medium"
    | "medium-high"
    | "high"

export type OpportunityLevel =
    | "weak"
    | "moderate"
    | "strong"
    | "excellent"

export type MarketSizeLevel =
    | "small"
    | "medium"
    | "large"
    | "very-large"

export type MarketMaturity =
    | "emerging"
    | "growing"
    | "mature"
    | "declining"

export type Marketplace =
    | "amazon"
    | "ebay"
    | "etsy"
    | "tiktok-shop"

export type BusinessModel =
    | "private-label"
    | "wholesale"
    | "dropshipping"
    | "retail-arbitrage"
    | "unsure"

export type CompetitionPreference =
    | "low"
    | "low-medium"
    | "medium"
    | "any"

export type KeywordIntent =
    | "informational"
    | "commercial"
    | "transactional"

/* -------------------------------------------------------------------------- */
/*                              CREATE ANALYSIS                               */
/* -------------------------------------------------------------------------- */

export interface SellingPriceTarget {
    min: number
    max: number
}

export interface AnalysisTargets {
    sellingPrice?: SellingPriceTarget
    maximumSourcingCost?: number
    productCategory?: string
    competitionPreference?: CompetitionPreference
    minimumDesiredMargin?: number
    monthlySalesGoal?: number
}

export interface CreateAnalysisRequest {
    query: string
    marketplace: Marketplace
    market: string
    businessModel: BusinessModel
    targets?: AnalysisTargets
}

/* -------------------------------------------------------------------------- */
/*                                  COMMON                                    */
/* -------------------------------------------------------------------------- */

export interface MoneyRange {
    min: number
    max: number
    currency: string
}

export interface NumberRange {
    min: number
    max: number
}

/* -------------------------------------------------------------------------- */
/*                            MARKETPLACE ANALYSIS                            */
/* -------------------------------------------------------------------------- */

export interface MarketplaceAnalysis {
    product: ProductAnalysis
    summary: AnalysisSummary
    market: MarketAnalysis
    competition: CompetitionAnalysis
    economics: EconomicsAnalysis
    sourcing: SourcingAnalysis
    salesStrategy: SalesStrategyAnalysis
    risks: RiskAnalysis
    actionPlan: ActionPlanItem[]
}

/* -------------------------------------------------------------------------- */
/*                                   PRODUCT                                  */
/* -------------------------------------------------------------------------- */

export interface ProductAnalysis {
    name: string
    description: string
    category: string
    imageUrl?: string
}

/* -------------------------------------------------------------------------- */
/*                                   SUMMARY                                  */
/* -------------------------------------------------------------------------- */

export interface AnalysisSummary {
    opportunityScore: number
    opportunityLevel: OpportunityLevel
    opportunityLabel: string

    estimatedMarginPercent: number

    demandLevel: RatingLevel
    competitionLevel: CompetitionLevel
    riskLevel: RatingLevel

    estimatedStartupCost: number

    currency: string

    verdict: string
}

/* -------------------------------------------------------------------------- */
/*                                    MARKET                                  */
/* -------------------------------------------------------------------------- */

export interface MarketAnalysis {
    marketSize: {
        level: MarketSizeLevel
        description: string
    }

    growth: {
        percentage: number
        periodMonths: number
        description: string
    }

    seasonality: {
        level: RatingLevel
        description: string
    }

    demandTrend: DemandTrendPoint[]

    targetCustomers: string[]

    typicalPriceRange: MoneyRange

    maturity: MarketMaturity

    marketplaceSuitability: {
        score: number
        label: string
        reasoning: string
    }

    keywords: MarketKeyword[]
}

export interface DemandTrendPoint {
    period: string
    value: number
}

export interface MarketKeyword {
    keyword: string
    monthlySearchVolume?: number
    competition?: CompetitionLevel
    intent?: KeywordIntent
}

/* -------------------------------------------------------------------------- */
/*                                COMPETITION                                 */
/* -------------------------------------------------------------------------- */

export interface CompetitionAnalysis {
    score: number

    level: CompetitionLevel

    topCompetitors: Competitor[]

    competitorStrengths: string[]

    competitorWeaknesses: string[]

    differentiationOpportunity: {
        summary: string
        angles: string[]
    }
}

export interface Competitor {
    name: string

    productName?: string

    price: number

    currency: string

    reviewCount?: number

    rating?: number

    strength: RatingLevel

    marketplaceUrl?: string

    keyStrengths?: string[]

    keyWeaknesses?: string[]
}

/* -------------------------------------------------------------------------- */
/*                                  ECONOMICS                                 */
/* -------------------------------------------------------------------------- */

export interface EconomicsAnalysis {
    currency: string

    unitEconomics: UnitEconomics

    startupCosts: StartupCosts

    sensitivityDefaults: SensitivityDefaults

    optimizationTip: string
}

export interface UnitEconomics {
    sellingPrice: number

    productCost: number

    shippingPerUnit: number

    importDutiesPerUnit: number

    marketplaceFeesPerUnit: number

    fulfillmentCostPerUnit: number

    advertisingCostPerUnit: number

    otherCostsPerUnit: number

    landedCost: number

    profitPerUnit: number

    marginPercent: number

    roiPercent: number
}

export interface StartupCosts {
    moqUnits: number

    inventoryCost: number

    shippingCost: number

    packagingAndLabelsCost: number

    certificationAndTestingCost: number

    initialAdvertisingCost: number

    otherCosts: number

    totalEstimatedCost: number
}

export interface SensitivityDefaults {
    sellingPrice: number

    productCost: number

    advertisingCostPerUnit: number
}

/* -------------------------------------------------------------------------- */
/*                                   SOURCING                                 */
/* -------------------------------------------------------------------------- */

export interface SourcingAnalysis {
    recommendedModel: string

    reasoning: string

    targetFactoryPrice: MoneyRange

    targetMoq: NumberRange

    leadTimeDays: NumberRange

    bestShippingMethod: string

    recommendedRegions: string[]

    supplierPlatforms: SupplierPlatform[]

    potentialSuppliers: PotentialSupplier[]

    manufacturingComplexity: RatingLevel

    customizationOptions: string[]

    recommendedMaterials: string[]

    packagingRecommendations: string[]

    keyComponents: ProductComponent[]
}

export interface SupplierPlatform {
    name: string

    reason: string

    url?: string
}

export interface PotentialSupplier {
    name: string

    platform: string

    location?: string

    productUrl?: string

    estimatedUnitPrice?: MoneyRange

    moq?: number

    leadTimeDays?: NumberRange

    customizationAvailable?: boolean

    notes?: string
}

export interface ProductComponent {
    name: string

    description?: string

    estimatedCost?: number
}

/* -------------------------------------------------------------------------- */
/*                               SALES STRATEGY                               */
/* -------------------------------------------------------------------------- */

export interface SalesStrategyAnalysis {
    recommendedMarketplaces: RecommendedMarketplace[]

    recommendedPrice: MoneyRange

    targetAudience: string[]

    positioning: string

    keySellingPoints: string[]

    brandingAngles: string[]

    listingRecommendations: {
        titleGuidance: string
        descriptionGuidance: string
        imageRecommendations: string[]
        keywords: string[]
    }
}

export interface RecommendedMarketplace {
    name: string

    score: number

    reasoning: string
}

/* -------------------------------------------------------------------------- */
/*                                    RISKS                                   */
/* -------------------------------------------------------------------------- */

export interface RiskAnalysis {
    overallLevel: RatingLevel

    items: RiskItem[]
}

export interface RiskItem {
    name: string

    level: RatingLevel

    description: string

    mitigation: string
}

/* -------------------------------------------------------------------------- */
/*                                ACTION PLAN                                 */
/* -------------------------------------------------------------------------- */

export interface ActionPlanItem {
    step: number

    title: string

    description?: string

    priority: RatingLevel

    timeframe?: string
}

/* -------------------------------------------------------------------------- */
/*                              API / DB RECORD                               */
/* -------------------------------------------------------------------------- */

export interface AnalysisRecord {
    id: string

    query: string

    marketplace: Marketplace

    market: string

    businessModel: BusinessModel

    targets?: AnalysisTargets | null

    result: MarketplaceAnalysis

    createdAt: string

    updatedAt: string
}