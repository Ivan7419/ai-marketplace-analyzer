"use client"

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CircleHelp,
  Clock3,
  Loader2,
  Package,
  PlayCircle,
  Search,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react"

import { createAnalysis } from "@/lib/api"
import type {
  BusinessModel,
  CompetitionPreference,
  CreateAnalysisRequest,
  Marketplace,
} from "@/types/analysis"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"

const examples = [
  "Wireless mini projector",
  "Pet water bottle",
  "Kitchen gadgets under £20",
  "Fitness accessories",
  "Low competition products for Amazon UK",
]

const businessModels = [
  {
    id: "private-label",
    title: "Private Label",
    description: "Source from manufacturers and build your own brand",
    icon: Tag,
  },
  {
    id: "wholesale",
    title: "Wholesale",
    description: "Buy from wholesalers and resell",
    icon: Package,
  },
  {
    id: "dropshipping",
    title: "Dropshipping",
    description: "Sell products without holding inventory",
    icon: Truck,
  },
  {
    id: "retail-arbitrage",
    title: "Retail Arbitrage",
    description: "Buy from retail stores and resell online",
    icon: ShoppingCart,
  },
  {
    id: "unsure",
    title: "Not Sure Yet",
    description: "I'm exploring options",
    icon: CircleHelp,
  },
] satisfies {
  id: BusinessModel
  title: string
  description: string
  icon: typeof Tag
}[]

export function NewAnalysisForm() {
  const router = useRouter()

  const [query, setQuery] = useState("")

  const [marketplace, setMarketplace] =
      useState<Marketplace>("amazon")

  const [market, setMarket] = useState("GB")

  const [businessModel, setBusinessModel] =
      useState<BusinessModel>("private-label")

  const [minimumSellingPrice, setMinimumSellingPrice] =
      useState("20")

  const [maximumSellingPrice, setMaximumSellingPrice] =
      useState("50")

  const [maximumSourcingCost, setMaximumSourcingCost] =
      useState("10")

  const [productCategory, setProductCategory] =
      useState("any")

  const [
    competitionPreference,
    setCompetitionPreference,
  ] = useState<CompetitionPreference>("low-medium")

  const [minimumDesiredMargin, setMinimumDesiredMargin] =
      useState("30")

  const [monthlySalesGoal, setMonthlySalesGoal] =
      useState("500")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(
      event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setError(
          "Enter a product or market you want to analyze."
      )
      return
    }

    const minPrice = toNumber(minimumSellingPrice)
    const maxPrice = toNumber(maximumSellingPrice)

    if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        minPrice > maxPrice
    ) {
      setError(
          "Minimum selling price cannot be higher than maximum selling price."
      )
      return
    }

    setError(null)
    setIsSubmitting(true)

    const request: CreateAnalysisRequest = {
      query: trimmedQuery,
      marketplace,
      market,
      businessModel,

      targets: {
        ...(minPrice !== undefined &&
        maxPrice !== undefined
            ? {
              sellingPrice: {
                min: minPrice,
                max: maxPrice,
              },
            }
            : {}),

        maximumSourcingCost: toNumber(
            maximumSourcingCost
        ),

        productCategory,

        competitionPreference,

        minimumDesiredMargin: toNumber(
            minimumDesiredMargin
        ),

        monthlySalesGoal: toNumber(
            monthlySalesGoal
        ),
      },
    }

    try {
      const analysis = await createAnalysis(request)

      router.push(`/analysis/${analysis.id}`)
    } catch (error) {
      setError(
          error instanceof Error
              ? error.message
              : "Something went wrong while creating the analysis."
      )

      setIsSubmitting(false)
    }
  }

  return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          <header className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <SidebarTrigger className="mt-1 md:hidden" />

              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  New Analysis
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Tell our AI what product or market you want
                  to analyze.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Button
                  type="button"
                  variant="outline"
              >
                <PlayCircle />
                Watch Tutorial
              </Button>

              <Button
                  type="button"
                  variant="outline"
              >
                <Clock3 />
                History
              </Button>
            </div>
          </header>

          <form
              onSubmit={handleSubmit}
              className="space-y-5"
          >
            {/* Product query */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="font-semibold">
                    What product or market do you want to
                    analyze?
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Describe the product, niche or opportunity
                    in natural language. The more detail you
                    provide, the better the analysis.
                  </p>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-4 size-4 text-muted-foreground" />

                  <Textarea
                      value={query}
                      onChange={(event) =>
                          setQuery(event.target.value)
                      }
                      maxLength={500}
                      placeholder="e.g. Portable blender for gym enthusiasts, eco-friendly pet products, car organizer..."
                      className="min-h-28 resize-none pl-11 pr-14"
                      disabled={isSubmitting}
                  />

                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {query.length}/500
                </span>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium">
                    Try these examples:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {examples.map((example) => (
                        <Button
                            key={example}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            disabled={isSubmitting}
                            onClick={() => setQuery(example)}
                        >
                          {example}
                        </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marketplace */}
            <Card>
              <CardContent className="p-6">
                <SectionHeader
                    number="1"
                    title="Choose Marketplace & Market"
                    description="Select the marketplace and target market for your analysis."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Marketplace</Label>

                    <Select
                        value={marketplace}
                        onValueChange={(value) =>
                            setMarketplace(
                                value as Marketplace
                            )
                        }
                        disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Marketplace" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="amazon">
                          Amazon
                        </SelectItem>

                        <SelectItem value="ebay">
                          eBay
                        </SelectItem>

                        <SelectItem value="etsy">
                          Etsy
                        </SelectItem>

                        <SelectItem value="tiktok-shop">
                          TikTok Shop
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Market / Country</Label>

                    <Select
                        value={market}
                        onValueChange={(value) => {
                            if (value !== null) {
                              setMarket(value)
                            }
                          }
                        }
                        disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="GB">
                          🇬🇧 United Kingdom
                        </SelectItem>

                        <SelectItem value="US">
                          🇺🇸 United States
                        </SelectItem>

                        <SelectItem value="DE">
                          🇩🇪 Germany
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business model */}
            <Card>
              <CardContent className="p-6">
                <SectionHeader
                    number="2"
                    title="Business Model"
                    description="How do you plan to sell this product?"
                />

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {businessModels.map((model) => {
                    const selected =
                        businessModel === model.id

                    const Icon = model.icon

                    return (
                        <button
                            key={model.id}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() =>
                                setBusinessModel(model.id)
                            }
                            className={[
                              "relative flex min-h-36 flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors",
                              "hover:bg-muted/50",
                              "disabled:pointer-events-none disabled:opacity-50",
                              selected
                                  ? "border-primary bg-primary/5"
                                  : "border-border bg-card",
                            ].join(" ")}
                        >
                          {selected && (
                              <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <span className="text-xs">
                            ✓
                          </span>
                              </div>
                          )}

                          <Icon
                              className={[
                                "mb-3 size-6",
                                selected
                                    ? "text-primary"
                                    : "text-foreground",
                              ].join(" ")}
                          />

                          <span className="text-sm font-medium">
                        {model.title}
                      </span>

                          <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {model.description}
                      </span>
                        </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Targets */}
            <Card>
              <CardContent className="p-6">
                <SectionHeader
                    number="3"
                    title="Set Your Targets"
                    optional
                    description="Add constraints to help AI focus on the best opportunities for you."
                />

                <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Target Selling Price</Label>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          £
                        </span>

                          <Input
                              min="0"
                              step="0.01"
                              value={minimumSellingPrice}
                              onChange={(event) =>
                                  setMinimumSellingPrice(
                                      event.target.value
                                  )
                              }
                              className="pl-7"
                              disabled={isSubmitting}
                          />
                        </div>

                        <span className="text-xs text-muted-foreground">
                        to
                      </span>

                        <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          £
                        </span>

                          <Input
                              min="0"
                              step="0.01"
                              value={maximumSellingPrice}
                              onChange={(event) =>
                                  setMaximumSellingPrice(
                                      event.target.value
                                  )
                              }
                              className="pl-7"
                              disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Product Category</Label>

                      <Select
                          value={productCategory}
                          onValueChange={(value) => {
                              if (value !== null) {
                                setProductCategory(value)
                              }
                            }
                          }
                          disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="any">
                            Any category
                          </SelectItem>

                          <SelectItem value="home-kitchen">
                            Home & Kitchen
                          </SelectItem>

                          <SelectItem value="fitness">
                            Fitness
                          </SelectItem>

                          <SelectItem value="pet-supplies">
                            Pet Supplies
                          </SelectItem>

                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Maximum Sourcing Cost
                      </Label>

                      <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        £
                      </span>

                        <Input
                            min="0"
                            step="0.01"
                            value={maximumSourcingCost}
                            onChange={(event) =>
                                setMaximumSourcingCost(
                                    event.target.value
                                )
                            }
                            className="pl-7"
                            disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Competition Preference
                      </Label>

                      <Select
                          value={competitionPreference}
                          onValueChange={(value) =>
                              setCompetitionPreference(
                                  value as CompetitionPreference
                              )
                          }
                          disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="low">
                            Low
                          </SelectItem>

                          <SelectItem value="low-medium">
                            Low to Medium
                          </SelectItem>

                          <SelectItem value="medium">
                            Medium
                          </SelectItem>

                          <SelectItem value="any">
                            Any
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Minimum Desired Margin
                      </Label>

                      <div className="relative">
                        <Input
                            min="0"
                            max="100"
                            step="1"
                            value={minimumDesiredMargin}
                            onChange={(event) =>
                                setMinimumDesiredMargin(
                                    event.target.value
                                )
                            }
                            className="pr-8"
                            disabled={isSubmitting}
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Monthly Sales Goal
                      </Label>

                      <Select
                          value={monthlySalesGoal}
                          onValueChange={(value) => {
                            if (value !== null) {
                              setMonthlySalesGoal(value)
                            }
                          }
                          }
                          disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="100">
                            100+ units
                          </SelectItem>

                          <SelectItem value="250">
                            250+ units
                          </SelectItem>

                          <SelectItem value="500">
                            500+ units
                          </SelectItem>

                          <SelectItem value="1000">
                            1,000+ units
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/40 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Sparkles className="size-5 text-primary" />

                      <p className="text-sm font-medium">
                        Why set targets?
                      </p>
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        ✓ AI will prioritise opportunities
                        that match your goals.
                      </p>

                      <p>
                        ✓ Get more relevant and accurate
                        recommendations.
                      </p>

                      <p>
                        ✓ Save time by filtering out
                        low-potential products.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-5" />

                <Button
                    type="button"
                    variant="ghost"
                    className="px-0 text-primary"
                    disabled={isSubmitting}
                >
                  Advanced Filters
                </Button>
              </CardContent>
            </Card>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
            )}

            {/* CTA */}
            <Card className="bg-primary/5">
              <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {isSubmitting
                        ? "Analyzing opportunity..."
                        : "Ready to analyze?"}
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {isSubmitting
                        ? "AI is evaluating the market, competition, economics, sourcing and launch strategy."
                        : "Our AI will analyze the market, competition, profitability and sourcing options and give you a complete opportunity report."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
                    <span>10+ Data Sources</span>
                    <span>AI-Powered Insights</span>
                    <span>Profit Calculations</span>
                    <span>Actionable Strategy</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="min-w-52"
                  >
                    {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Analyzing...
                        </>
                    ) : (
                        <>
                          <Sparkles />
                          Analyze Opportunity
                        </>
                    )}
                  </Button>

                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    This will use 1 analysis credit
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="pb-4 text-center text-xs text-muted-foreground">
              Your data is secure and never shared with
              third parties.
            </p>
          </form>
        </div>
      </main>
  )
}

function SectionHeader({
                         number,
                         title,
                         description,
                         optional = false,
                       }: {
  number: string
  title: string
  description: string
  optional?: boolean
}) {
  return (
      <div className="mb-5">
        <h2 className="font-semibold">
          {number}. {title}

          {optional && (
              <span className="font-normal text-muted-foreground">
            {" "}
                (Optional)
          </span>
          )}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
  )
}

function toNumber(
    value: string
): number | undefined {
  if (!value.trim()) {
    return undefined
  }

  const parsed = Number(value)

  return Number.isFinite(parsed)
      ? parsed
      : undefined
}