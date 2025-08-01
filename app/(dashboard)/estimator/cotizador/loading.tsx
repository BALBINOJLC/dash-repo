import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-8 h-8 rounded-full mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
            ))}
          </div>
          <Skeleton className="h-1 w-full mb-6" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>

      <div className="mt-6 flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}
