import { Card, CardContent } from "@/components/ui/card"

type AnalysisSectionCardProps = {
    title: string
    children: React.ReactNode
    className?: string
}

export function AnalysisSectionCard({
                                        title,
                                        children,
                                        className = "",
                                    }: AnalysisSectionCardProps) {
    return (
        <Card className={className}>
            <CardContent className="p-5">
                <h2 className="mb-5 font-semibold">
                    {title}
                </h2>

                {children}
            </CardContent>
        </Card>
    )
}