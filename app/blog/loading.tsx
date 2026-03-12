export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-navy-deep pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-3 w-24 animate-pulse rounded bg-navy-mid" />
        <div className="mt-6 h-12 w-96 animate-pulse rounded bg-navy-mid" />
        <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-navy-mid" />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border border-brass/10 bg-navy-mid p-8"
            >
              <div className="h-3 w-20 animate-pulse rounded bg-navy-deep" />
              <div className="mt-4 h-8 w-full animate-pulse rounded bg-navy-deep" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-navy-deep" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
