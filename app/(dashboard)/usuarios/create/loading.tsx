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
    </div>
  )};

    