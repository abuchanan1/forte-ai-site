export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-navy-deep pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="h-3 w-32 animate-pulse rounded bg-navy-mid" />
            <div className="mt-6 h-12 w-80 animate-pulse rounded bg-navy-mid" />
          </div>
          <div className="space-y-4">
            <div className="h-10 w-full animate-pulse rounded bg-navy-mid" />
            <div className="h-10 w-full animate-pulse rounded bg-navy-mid" />
            <div className="h-10 w-full animate-pulse rounded bg-navy-mid" />
          </div>
        </div>
      </div>
    </div>
  )
}
