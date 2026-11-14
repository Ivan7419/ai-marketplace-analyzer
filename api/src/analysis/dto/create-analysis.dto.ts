import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export const MARKETPLACES = ['amazon', 'ebay', 'etsy', 'tiktok-shop'] as const;

export const BUSINESS_MODELS = [
  'private-label',
  'wholesale',
  'dropshipping',
  'retail-arbitrage',
  'unsure',
] as const;

export const COMPETITION_PREFERENCES = [
  'low',
  'low-medium',
  'medium',
  'any',
] as const;

export type Marketplace = (typeof MARKETPLACES)[number];

export type BusinessModel = (typeof BUSINESS_MODELS)[number];

export type CompetitionPreference = (typeof COMPETITION_PREFERENCES)[number];

export class SellingPriceTargetDto {
  @IsNumber()
  @Min(0)
  min: number;

  @IsNumber()
  @Min(0)
  max: number;
}

export class AnalysisTargetsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SellingPriceTargetDto)
  sellingPrice?: SellingPriceTargetDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumSourcingCost?: number;

  /**
   * Keep category as a string for now.
   *
   * Examples:
   * "any"
   * "home-kitchen"
   * "fitness"
   * "pet-supplies"
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  productCategory?: string;

  @IsOptional()
  @IsIn(COMPETITION_PREFERENCES)
  competitionPreference?: CompetitionPreference;

  /**
   * Percentage, e.g. 30 = 30%.
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  minimumDesiredMargin?: number;

  /**
   * Units/month.
   *
   * The frontend currently has options such as
   * 100, 250, 500 and 1000.
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  monthlySalesGoal?: number;
}

export class CreateAnalysisDto {
  /**
   * User's natural-language product / opportunity description.
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  query: string;

  @IsString()
  @IsIn(MARKETPLACES)
  marketplace: Marketplace;

  /**
   * ISO-style country code.
   *
   * Current frontend example:
   * "GB"
   *
   * Later:
   * "US"
   * "DE"
   * etc.
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  market: string;

  @IsString()
  @IsIn(BUSINESS_MODELS)
  businessModel: BusinessModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => AnalysisTargetsDto)
  targets?: AnalysisTargetsDto;
}
