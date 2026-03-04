'use client'

type AnalyticsEvent =
  | 'demo_request_click'
  | 'contact_form_submit'
  | 'contact_form_error'

interface EventParams {
  error_type?: string
  page?: string
  [key: string]: string | undefined
}

export function useAnalytics() {
  const trackEvent = (event: AnalyticsEvent, params?: EventParams) => {
    if (typeof window === 'undefined') return
    if (!('gtag' in window)) return

    const gtag = window.gtag as (
      command: string,
      event: string,
      params?: EventParams,
    ) => void

    gtag('event', event, params)
  }

  return { trackEvent }
}
