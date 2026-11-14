import type {
    AnalysisRecord,
    CreateAnalysisRequest,
} from "@/types/analysis"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createAnalysis(
    input: CreateAnalysisRequest
): Promise<AnalysisRecord> {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured")
    }

    const response = await fetch(`${API_URL}/analysis`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    })

    if (!response.ok) {
        const message = await getErrorMessage(response)

        throw new Error(message)
    }

    return response.json()
}

async function getErrorMessage(
    response: Response
): Promise<string> {
    try {
        const data = await response.json()

        if (typeof data?.message === "string") {
            return data.message
        }

        if (Array.isArray(data?.message)) {
            return data.message.join(", ")
        }
    } catch {
        // Ignore malformed error body
    }

    return `Request failed with status ${response.status}`
}

export interface AnalysisHistoryItem {
    id: string;
    query: string;
    createdAt: string;
}

export async function getAnalysisHistory():
    Promise<AnalysisHistoryItem[]> {
    const response = await fetch(
        `${API_URL}/analysis`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch analysis history");
    }

    return response.json();
}

export async function deleteAnalysis(
    id: string
): Promise<void> {
    const response = await fetch(
        `${API_URL}/analysis/${id}`,
        { method: "DELETE" }
    );

    if (!response.ok) {
        throw new Error("Failed to delete analysis");
    }
}