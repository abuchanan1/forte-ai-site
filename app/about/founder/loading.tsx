export default function FounderLoading() {
  return (
    <div className="min-h-screen bg-navy pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-3 w-40 animate-pulse rounded bg-navy-mid" />
        <div className="mt-10 grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <div className="aspect-[5/6] animate-pulse rounded-2xl bg-navy-mid" />
          </div>
          <div className="md:col-span-3">
            <div className="h-12 w-80 animate-pulse rounded bg-navy-mid" />
            <div className="mt-3 h-4 w-48 animate-pulse rounded bg-navy-mid" />
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
              <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-navy-mid" />
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
              <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-navy-mid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
