
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Trash2,
    ArrowUpDown,
    Loader2,
    Plus,
    FileSearch,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    getAnalysisHistory,
    deleteAnalysis,
    type AnalysisHistoryItem,
} from "@/lib/api";

type SortOrder = "newest" | "oldest" | "az";

export default function HistoryPage() {
    const router = useRouter();

    const [analyses, setAnalyses] = useState<
        AnalysisHistoryItem[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<
        string | null
    >(null);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<SortOrder>("newest");
    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        async function loadHistory() {
            try {
                const data = await getAnalysisHistory();
                setAnalyses(data);
            } catch {
                setError("Unable to load analysis history.");
            } finally {
                setLoading(false);
            }
        }

        void loadHistory();
    }, []);

    const filteredAnalyses = useMemo(() => {
        const result = analyses.filter((analysis) =>
            analysis.query
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        return result.sort((a, b) => {
            if (sort === "az") {
                return a.query.localeCompare(b.query);
            }

            const difference =
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime();

            return sort === "newest"
                ? difference
                : -difference;
        });
    }, [analyses, search, sort]);

    const thisMonthCount = analyses.filter((item) => {
        const date = new Date(item.createdAt);
        const now = new Date();

        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    }).length;

    async function handleDelete(id: string) {
        if (
            !window.confirm(
                "Are you sure you want to delete this analysis?"
            )
        ) {
            return;
        }

        setDeletingId(id);

        try {
            await deleteAnalysis(id);
            setAnalyses((previous) =>
                previous.filter((item) => item.id !== id)
            );
        } catch {
            setError("Failed to delete analysis.");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Analysis History
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Browse and manage your saved product analyses.
                    </p>
                </div>

                <Button
                    onClick={() => router.push("/analysis/new")}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Analysis
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Total Analyses"
                    value={analyses.length}
                />
                <StatCard
                    title="This Month"
                    value={thisMonthCount}
                />
                <StatCard
                    title="Latest Analysis"
                    value={
                        analyses.length
                            ? new Date(
                                Math.max(
                                    ...analyses.map((a) =>
                                        new Date(a.createdAt).getTime()
                                    )
                                )
                            ).toLocaleDateString()
                            : "—"
                    }
                />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search analyses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select
                    value={sort}
                    onValueChange={(value) =>
                        setSort(value as SortOrder)
                    }
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">
                            Newest first
                        </SelectItem>
                        <SelectItem value="oldest">
                            Oldest first
                        </SelectItem>
                        <SelectItem value="az">
                            Name A-Z
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {error && (
                <p role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : filteredAnalyses.length === 0 ? (
                <div className="flex flex-col items-center py-20 text-center">
                    <FileSearch className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                        {search
                            ? "No matching analyses"
                            : "No analyses yet"}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                        {search
                            ? "Try a different search term."
                            : "Create your first product analysis to get started."}
                    </p>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Saved Analyses ({filteredAnalyses.length})
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="divide-y">
                            {filteredAnalyses.map((analysis) => (
                                <div
                                    key={analysis.id}
                                    className="flex items-center justify-between gap-4 p-5 hover:bg-muted/40"
                                >
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-medium">
                                            {analysis.query}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {new Date(
                                                analysis.createdAt
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                router.push(
                                                    `/analysis/${analysis.id}`
                                                )
                                            }
                                        >
                                            View
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            disabled={
                                                deletingId === analysis.id
                                            }
                                            aria-label={`Delete ${analysis.query}`}
                                            onClick={() =>
                                                handleDelete(analysis.id)
                                            }
                                        >
                                            {deletingId === analysis.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function StatCard({
                      title,
                      value,
                  }: {
    title: string;
    value: string | number;
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <p className="text-sm text-muted-foreground">
                    {title}
                </p>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );
}
