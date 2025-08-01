import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfileLoading() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="border rounded-lg p-6">
            <div className="space-y-2 pb-4">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
            <div className="flex flex-col items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[180px] mb-4" />
              <div className="w-full space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-9 w-full mt-6" />
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="space-y-6">
            <div className="border rounded-lg p-1">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="border rounded-lg p-6">
              <div className="space-y-2 mb-6">
                <Skeleton className="h-5 w-[180px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-[80px]" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-[150px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
