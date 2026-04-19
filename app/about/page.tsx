import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ValueCard } from '@/components/ui/ValueCard'
import { DataFlowGraphic } from '@/components/ui/DataFlowGraphic'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'Our mission, story, and values. Forte designs decision infrastructure that connects raw data to leadership decisions.',
  path: '/about',
})

const VALUES = [
  {
    title: 'Clarity over complexity',
    body: 'We believe the best solution is the one your team will actually use. We build for the person making the decision, not the person who built the model.',
    id: 'clarity',
  },
  {
    title: 'Outcomes over outputs',
    body: 'We do not measure success by dashboards delivered or models deployed. We measure it by the decisions your organization makes better because of them.',
    id: 'outcomes',
  },
  {
    title: 'Access over exclusivity',
    body: 'Data intelligence should not require a Fortune 100 budget. We price, package, and build for organizations at every stage.',
    id: 'access',
  },
  {
    title: 'Trust through transparency',
    body: 'You own your data, your models, and your infrastructure. We build it. We hand it over. No lock-in, no black boxes.',
    id: 'trust',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="Our Mission" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-normal leading-display text-white md:text-7xl">
              Intelligence should not be a privilege.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-lg font-light leading-body text-white/60">
              For too long, the organizations with the deepest data capabilities
              have been the ones with the biggest budgets. Forte was built to
              change that.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="How We Got Here" index={1} />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <FadeUp delay={0.1}>
              <div>
                <h2 className="font-display text-3xl font-normal leading-display text-white md:text-4xl">
                  Built by people who lived the problem.
                </h2>
                <div className="mt-6 space-y-4">
                  <p className="font-body text-base font-light leading-body text-white/60">
                    Forte was founded on a simple observation: organizations of
                    all sizes are drowning in data and starving for insight. Not
                    because the data is bad, but because the infrastructure to
                    use it has always been too expensive, too technical, or too
                    slow to build.
                  </p>
                  <p className="font-body text-base font-light leading-body text-white/60">
                    We spent years watching talented teams spend more time
                    wrangling spreadsheets than making decisions. We watched
                    executives fly blind through quarters that their own data
                    could have predicted. We decided there was a better way.
                  </p>
                  <p className="font-body text-base font-light leading-body text-white/60">
                    Forte exists to give every organization, regardless of size
                    or technical resources, the data intelligence that used to
                    require a full data science team to achieve. That is what we
                    mean when we say democratized.
                  </p>
                </div>
                <div className="mt-6">
                  <Button href="/about/founder" variant="ghost" size="sm">
                    Meet the Founder →
                  </Button>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <DataFlowGraphic />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <SectionLabel label="What We Stand For" index={2} />
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              Four principles that shape how we work.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <ValueCard
                key={value.id}
                title={value.title}
                body={value.body}
                id={value.id}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Build */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <SectionLabel label="Our Approach to Tools" index={3} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-normal leading-display text-white md:text-4xl">
              How we build.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 font-body text-base font-light leading-body text-white/65">
              The right stack depends on the organization. A 50-person
              nonprofit with a limited budget does not need the same
              infrastructure as a 400-person services firm with a mature data
              team. Matching the tooling to the client is part of the work.
            </p>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              We are deliberately vendor-agnostic. We do not resell software,
              we do not take commissions, and we do not push any specific
              platform. What we do is meet clients where they are, build on
              what they already pay for when it makes sense, and recommend
              alternatives when it does not. Every engagement ends with the
              client owning the work, free to run it, modify it, or migrate
              it without us.
            </p>
            <p className="mt-4 font-body text-base font-light leading-body text-white/65">
              Our typical toolkit spans the following categories. We mix and
              match depending on the client&apos;s size, budget, existing
              stack, and strategy.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-8 space-y-6">
              {[
                {
                  category: 'Data warehousing and storage',
                  body: 'BigQuery, Snowflake, Postgres, and other modern databases depending on scale and what the client already uses. For smaller organizations, a well-structured Postgres instance or BigQuery project often beats a more expensive enterprise warehouse. For larger organizations with existing investments, we integrate rather than replace.',
                },
                {
                  category: 'Dashboards, reporting, and BI',
                  body: 'Looker Studio, Power BI, Tableau, Metabase, and similar tools. For smaller organizations already on Google Workspace, Looker Studio is usually the simplest path. For organizations on Microsoft 365, Power BI is often the natural fit. For clients with dedicated analysts or more complex reporting needs, Tableau or Looker hold up. We pick the tool that matches the team that will actually use it, not the one with the fanciest demos.',
                },
                {
                  category: 'AI and language models',
                  body: 'Our default is Claude (Anthropic API) for agent reasoning and synthesis tasks. We also build with GPT models when the client is already invested in OpenAI, and Gemini when the team lives in Google Workspace. For budget-constrained or privacy-sensitive clients, we work with open-source models including Llama (Meta), Mistral, and Qwen, running locally or on a private cloud instance. The model choice is a strategy decision as much as a pricing one.',
                },
                {
                  category: 'Agent orchestration and workflow',
                  body: "LangGraph, Claude's native tool use, CrewAI, and direct API orchestration for simpler builds. For most engagements at our scale, simpler patterns beat framework-heavy ones. We only reach for full agent frameworks when the complexity genuinely requires them.",
                },
                {
                  category: 'Workflow, messaging, and collaboration',
                  body: 'Slack for team communication and agent notifications. Microsoft Teams when the client lives there instead. We build agents that post directly into existing channels rather than forcing leaders into a new interface.',
                },
                {
                  category: 'Productivity and knowledge work',
                  body: 'Google Workspace (Gmail, Calendar, Drive, Docs, Sheets) and Microsoft 365 (Outlook, OneDrive, SharePoint, Word, Excel). Notion, Asana, Monday, and ClickUp for project and knowledge management. Zoom and Google Meet for meeting transcripts that feed our Synthesis Agent pattern.',
                },
                {
                  category: 'Data pipelines and integration',
                  body: 'Fivetran, Airbyte, or custom connectors depending on the scale and sensitivity of the data. dbt for transformation when the client has a real warehouse. Simpler ETL patterns when they do not.',
                },
                {
                  category: 'CRMs and operational systems',
                  body: 'Salesforce, HubSpot, Bloomerang, DonorPerfect, Apricot, CaseWorthy, PowerSchool, Infinite Campus, and whatever else the client already uses. We build on top of existing systems rather than asking clients to rip and replace.',
                },
              ].map((item) => (
                <div key={item.category}>
                  <p className="font-body text-base font-medium text-white">
                    {item.category}
                  </p>
                  <p className="mt-1 font-body text-sm font-light leading-body text-white/65">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-10 font-body text-base font-light leading-body text-white/65">
              The goal is never to sell a stack. The goal is to build decision
              infrastructure the client can actually operate, with tools that
              match their size, their budget, and where they are going. We
              meet clients where they are. We do not force a proprietary
              stack.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy-deep py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-normal leading-display text-white md:text-5xl">
              See what Forte can do for your organization.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-8">
              <Button href="/services" size="lg">
                Explore Our Solutions
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
