export type RatingLevel = 'low' | 'medium' | 'high';

export type CompetitionLevel =
  | 'low'
  | 'low-medium'
  | 'medium'
  | 'medium-high'
  | 'high';

export type OpportunityLevel = 'weak' | 'moderate' | 'strong' | 'excellent';

export type MarketSizeLevel = 'small' | 'medium' | 'large' | 'very-large';

export type MarketMaturity = 'emerging' | 'growing' | 'mature' | 'declining';

export interface MoneyRange {
  min: number;
  max: number;
  currency: string;
}

export interface NumberRange {
  min: number;
  max: number;
}

/**
 * The complete result produced by the AI.
 *
 * Do not put database-specific fields such as:
 * - id
 * - userId
 * - createdAt
 *
 * in here.
 */
export interface MarketplaceAnalysis {
  product: ProductAnalysis;

  summary: AnalysisSummary;

  market: MarketAnalysis;

  competition: CompetitionAnalysis;

  economics: EconomicsAnalysis;

  sourcing: SourcingAnalysis;

  salesStrategy: SalesStrategyAnalysis;

  risks: RiskAnalysis;

  actionPlan: ActionPlanItem[];
}

/* -------------------------------------------------------------------------- */
/*                                   PRODUCT                                  */
/* -------------------------------------------------------------------------- */

export interface ProductAnalysis {
  /**
   * Clean product/opportunity name suitable for displaying as the page title.
   *
   * Example:
   * "Portable Personal Blender"
   */
  name: string;

  /**
   * Short description of the actual opportunity being analysed.
   */
  description: string;

  /**
   * Example:
   * "Kitchen & Dining"
   */
  category: string;

  /**
   * Optional image later when we add product/image discovery.
   */
  imageUrl?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   SUMMARY                                  */
/* -------------------------------------------------------------------------- */

export interface AnalysisSummary {
  /**
   * 0 - 100
   */
  opportunityScore: number;

  opportunityLevel: OpportunityLevel;

  /**
   * Short label shown near the score.
   *
   * Example:
   * "Strong Opportunity"
   */
  opportunityLabel: string;

  /**
   * Estimated final profit margin.
   *
   * Store 37.3 rather than 0.373.
   */
  estimatedMarginPercent: number;

  demandLevel: RatingLevel;

  competitionLevel: CompetitionLevel;

  riskLevel: RatingLevel;

  estimatedStartupCost: number;

  currency: string;

  /**
   * Main AI verdict displayed directly under the header.
   */
  verdict: string;
}

/* -------------------------------------------------------------------------- */
/*                                    MARKET                                  */
/* -------------------------------------------------------------------------- */

export interface MarketAnalysis {
  marketSize: {
    level: MarketSizeLevel;

    /**
     * Example:
     * "High search volume with a broad addressable customer base."
     */
    description: string;
  };

  growth: {
    /**
     * Example: 32 = +32%
     */
    percentage: number;

    /**
     * Usually 12.
     */
    periodMonths: number;

    description: string;
  };

  seasonality: {
    level: RatingLevel;

    /**
     * Example:
     * "Stable year-round with a moderate January spike."
     */
    description: string;
  };

  /**
   * Used by the Search Demand Trend chart.
   */
  demandTrend: DemandTrendPoint[];

  targetCustomers: string[];

  typicalPriceRange: MoneyRange;

  maturity: MarketMaturity;

  marketplaceSuitability: {
    /**
     * 0 - 100
     */
    score: number;

    /**
     * Example:
     * "Excellent"
     */
    label: string;

    reasoning: string;
  };

  /**
   * Useful later for Keyword Explorer / research.
   */
  keywords: MarketKeyword[];
}

export interface DemandTrendPoint {
  /**
   * Example:
   * "2026-01"
   */
  period: string;

  /**
   * Normalized demand score, 0 - 100.
   */
  value: number;
}

export interface MarketKeyword {
  keyword: string;

  /**
   * Approximate monthly searches if known.
   */
  monthlySearchVolume?: number;

  competition?: CompetitionLevel;

  intent?: 'informational' | 'commercial' | 'transactional';
}

/* -------------------------------------------------------------------------- */
/*                                COMPETITION                                 */
/* -------------------------------------------------------------------------- */

export interface CompetitionAnalysis {
  /**
   * 0 - 10.
   */
  score: number;

  level: CompetitionLevel;

  topCompetitors: Competitor[];

  /**
   * Things existing competitors generally do well.
   */
  competitorStrengths: string[];

  /**
   * Things existing competitors generally do poorly.
   */
  competitorWeaknesses: string[];

  differentiationOpportunity: {
    summary: string;

    /**
     * Specific positioning/product angles.
     */
    angles: string[];
  };
}

export interface Competitor {
  name: string;

  /**
   * Actual listing/product name if available.
   */
  productName?: string;

  price: number;

  currency: string;

  reviewCount?: number;

  rating?: number;

  /**
   * How strong this competitor is relative to the opportunity.
   */
  strength: RatingLevel;

  marketplaceUrl?: string;

  keyStrengths?: string[];

  keyWeaknesses?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                  ECONOMICS                                 */
/* -------------------------------------------------------------------------- */

export interface EconomicsAnalysis {
  currency: string;

  unitEconomics: UnitEconomics;

  startupCosts: StartupCosts;

  /**
   * Initial values used by the interactive profitability sliders.
   */
  sensitivityDefaults: SensitivityDefaults;

  /**
   * AI recommendation shown below the calculator.
   */
  optimizationTip: string;
}

export interface UnitEconomics {
  sellingPrice: number;

  productCost: number;

  shippingPerUnit: number;

  importDutiesPerUnit: number;

  marketplaceFeesPerUnit: number;

  fulfillmentCostPerUnit: number;

  advertisingCostPerUnit: number;

  otherCostsPerUnit: number;

  /**
   * Total unit cost after sourcing, shipping, fees, etc.
   */
  landedCost: number;

  profitPerUnit: number;

  marginPercent: number;

  roiPercent: number;
}

export interface StartupCosts {
  moqUnits: number;

  inventoryCost: number;

  shippingCost: number;

  packagingAndLabelsCost: number;

  certificationAndTestingCost: number;

  initialAdvertisingCost: number;

  otherCosts: number;

  totalEstimatedCost: number;
}

export interface SensitivityDefaults {
  sellingPrice: number;

  productCost: number;

  advertisingCostPerUnit: number;
}

/* -------------------------------------------------------------------------- */
/*                                   SOURCING                                 */
/* -------------------------------------------------------------------------- */

export interface SourcingAnalysis {
  /**
   * Example:
   * "Chinese OEM / Private Label"
   */
  recommendedModel: string;

  reasoning: string;

  targetFactoryPrice: MoneyRange;

  targetMoq: NumberRange;

  leadTimeDays: NumberRange;

  /**
   * Example:
   * "Sea Freight (LCL)"
   */
  bestShippingMethod: string;

  recommendedRegions: string[];

  supplierPlatforms: SupplierPlatform[];

  /**
   * Actual supplier suggestions when available.
   */
  potentialSuppliers: PotentialSupplier[];

  manufacturingComplexity: RatingLevel;

  customizationOptions: string[];

  recommendedMaterials: string[];

  packagingRecommendations: string[];

  /**
   * Useful for manufactured products consisting of multiple key parts.
   */
  keyComponents: ProductComponent[];
}

export interface SupplierPlatform {
  name: string;

  /**
   * Example:
   * "Best for private-label Chinese manufacturers."
   */
  reason: string;

  url?: string;
}

export interface PotentialSupplier {
  name: string;

  platform: string;

  location?: string;

  productUrl?: string;

  estimatedUnitPrice?: MoneyRange;

  moq?: number;

  leadTimeDays?: NumberRange;

  customizationAvailable?: boolean;

  notes?: string;
}

export interface ProductComponent {
  name: string;

  description?: string;

  estimatedCost?: number;
}

/* -------------------------------------------------------------------------- */
/*                               SALES STRATEGY                               */
/* -------------------------------------------------------------------------- */

export interface SalesStrategyAnalysis {
  recommendedMarketplaces: RecommendedMarketplace[];

  recommendedPrice: MoneyRange;

  targetAudience: string[];

  /**
   * Main positioning statement.
   *
   * Example:
   * "Portable protein blender for gym and active lifestyle."
   */
  positioning: string;

  keySellingPoints: string[];

  /**
   * Useful later when Generate Listing Content is implemented.
   */
  brandingAngles: string[];

  listingRecommendations: {
    titleGuidance: string;

    descriptionGuidance: string;

    imageRecommendations: string[];

    keywords: string[];
  };
}

export interface RecommendedMarketplace {
  name: string;

  /**
   * 0 - 10
   */
  score: number;

  reasoning: string;
}

/* -------------------------------------------------------------------------- */
/*                                    RISKS                                   */
/* -------------------------------------------------------------------------- */

export interface RiskAnalysis {
  overallLevel: RatingLevel;

  items: RiskItem[];
}

export interface RiskItem {
  name: string;

  level: RatingLevel;

  description: string;

  mitigation: string;
}

/* -------------------------------------------------------------------------- */
/*                                ACTION PLAN                                 */
/* -------------------------------------------------------------------------- */

export interface ActionPlanItem {
  /**
   * Display order.
   */
  step: number;

  title: string;

  description?: string;

  priority: RatingLevel;

  /**
   * Human-readable because this is recommendation text.
   *
   * Example:
   * "Week 1"
   * "Before placing first order"
   */
  timeframe?: string;
}
