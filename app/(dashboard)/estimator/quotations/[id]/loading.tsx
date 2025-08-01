import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function QuotationDetailLoading() {
  return (
    <div className="py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-40 mb-3" />
                    <div className="space-y-2">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="grid grid-cols-2 gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                    </div>
                  </div>

                  <Skeleton className="h-1 w-full" />

                  <div>
                    <Skeleton className="h-4 w-40 mb-3" />
                    <div className="space-y-2">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="grid grid-cols-2 gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-40 mb-3" />
                    <div className="space-y-2">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="grid grid-cols-2 gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                    </div>
                  </div>

                  <Skeleton className="h-1 w-full" />

                  <div>
                    <Skeleton className="h-4 w-40 mb-3" />
                    <Skeleton className="h-20 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Skeleton className="h-9 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-32" />
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full" />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
