export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface Service {
  id: string
  title: string
  description: string
  outcomes: string[]
  icon: string
}

export interface SocialLink {
  platform: string
  href: string
  label: string
}

export interface Stat {
  num: string
  label: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  email: string
  founded: number
}

export interface ContactFormData {
  name: string
  company: string
  role: string
  email: string
  message: string
  honeypot?: string
}

export interface ApiResponse<T = undefined> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  pillar: 'data-ai' | 'tech-gap' | 'decision-infrastructure'
  publishedAt: string
  readTime: string
  featured?: boolean
  faq: { question: string; answer: string }[]
}

export interface CompanyInfoResponse {
  name: string
  tagline: string
  description: string
  services: Service[]
  founded: number
  contact: {
    email: string
  }
  pages: {
    path: string
    description: string
  }[]
}
