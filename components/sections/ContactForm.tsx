'use client'

import { useState } from 'react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations'
import { Button } from '@/components/ui/Button'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import type { ApiResponse } from '@/types'

type FormErrors = Partial<Record<keyof ContactFormValues, string>>

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    company: '',
    role: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const { trackEvent } = useAnalytics()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const result = contactFormSchema.safeParse(values)
    if (result.success) {
      setErrors({})
      return true
    }

    const fieldErrors: FormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ContactFormValues
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }
    setErrors(fieldErrors)
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data: ApiResponse = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        trackEvent('contact_form_submit')
      } else {
        setStatus('error')
        setServerError(data.message)
        trackEvent('contact_form_error', { error_type: 'server' })
      }
    } catch {
      setStatus('error')
      setServerError(
        'Something went wrong. Your information has been preserved. Please try again or email us directly at hello@forteaisolutions.com',
      )
      trackEvent('contact_form_error', { error_type: 'network' })
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-brass/20 bg-navy-mid p-12 text-center">
        <div className="mb-4 h-px w-8 bg-brass" />
        <h3 className="font-display text-2xl font-normal text-white">
          Thank you.
        </h3>
        <p className="mt-3 max-w-sm font-body text-sm font-light leading-body text-white/60">
          We received your message and will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h2 className="mb-6 font-display text-2xl font-normal text-white">
        Start the conversation.
      </h2>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this out</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={values.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        label="Full Name"
        name="name"
        type="text"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Field
        label="Company"
        name="company"
        type="text"
        value={values.company}
        error={errors.company}
        onChange={handleChange}
      />
      <Field
        label="Your Role"
        name="role"
        type="text"
        value={values.role}
        error={errors.role}
        onChange={handleChange}
      />
      <Field
        label="Work Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-body text-xs font-medium uppercase tracking-label text-white/50"
        >
          Tell us about your data challenge
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          value={values.message}
          onChange={handleChange}
          className="w-full rounded-sm border border-brass/10 bg-navy-deep px-4 py-3 font-body text-sm font-light text-white placeholder-white/20 transition-colors focus:border-brass/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        />
        <div className="mt-1 flex justify-between">
          {errors.message ? (
            <p className="font-body text-xs text-red-400" role="alert">
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="font-mono text-[10px] text-white/30">
            {values.message.length}/1000
          </span>
        </div>
      </div>

      {status === 'error' && serverError && (
        <div
          className="rounded-sm border border-red-400/20 bg-red-400/5 px-4 py-3"
          role="alert"
        >
          <p className="font-body text-sm font-light text-red-400">
            {serverError}
          </p>
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg">
        Send Message
      </Button>
    </form>
  )
}

interface FieldProps {
  label: string
  name: string
  type: string
  value: string
  error: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({ label, name, type, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-body text-xs font-medium uppercase tracking-label text-white/50"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-brass/10 bg-navy-deep px-4 py-3 font-body text-sm font-light text-white placeholder-white/20 transition-colors focus:border-brass/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      />
      {error && (
        <p className="mt-1 font-body text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
