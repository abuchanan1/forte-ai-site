export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-navy-deep pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="h-3 w-32 animate-pulse rounded bg-navy-mid" />
        <div className="mt-6 h-12 w-full animate-pulse rounded bg-navy-mid" />
        <div className="mt-4 h-3 w-40 animate-pulse rounded bg-navy-mid" />
        <div className="mt-16 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
          <div className="h-4 w-full animate-pulse rounded bg-navy-mid" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-navy-mid" />
          <div className="mt-8 h-4 w-full animate-pulse rounded bg-navy-mid" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-navy-mid" />
        </div>
      </div>
    </div>
  )
}
