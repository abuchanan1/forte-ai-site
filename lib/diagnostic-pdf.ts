'use client'

import jsPDF from 'jspdf'
import {
  DIMENSION_LABELS,
  STAGE_LABELS,
  type ReportPayload,
  type Stage,
} from './diagnostic'

const NAVY_DEEP: [number, number, number] = [6, 14, 28]
const NAVY: [number, number, number] = [12, 27, 51]
const NAVY_MID: [number, number, number] = [22, 36, 68]
const BRASS: [number, number, number] = [160, 120, 64]
const BRASS_LIGHT: [number, number, number] = [196, 154, 88]
const WHITE: [number, number, number] = [247, 244, 238]
const MUTED: [number, number, number] = [180, 177, 170]

const STAGE_INDEX: Record<Stage, number> = {
  Scattered: 0,
  Centralized: 1,
  Integrated: 2,
  Intelligent: 3,
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'report'
}

export async function generateAssessmentPdf(
  report: ReportPayload,
  organization?: string,
): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const w = doc.internal.pageSize.getWidth()
  const h = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentW = w - margin * 2

  const wrap = (text: string, maxWidth: number, fontSize: number): string[] => {
    doc.setFontSize(fontSize)
    return doc.splitTextToSize(text, maxWidth) as string[]
  }

  const bgPage = () => {
    doc.setFillColor(...NAVY_DEEP)
    doc.rect(0, 0, w, h, 'F')
    doc.setFillColor(...BRASS)
    doc.rect(0, 0, w, 1.5, 'F')
  }

  const footer = (pageNum: number) => {
    doc.setFillColor(...BRASS)
    doc.rect(0, h - 1.5, w, 1.5, 'F')
    doc.setFontSize(7)
    doc.setTextColor(...MUTED)
    doc.setFont('helvetica', 'normal')
    doc.text('forteaisolutions.com', margin, h - 6)
    doc.text(String(pageNum), w - margin, h - 6, { align: 'right' })
  }

  const logoMark = (x: number, y: number) => {
    // Three-bar logo mark
    doc.setFillColor(...BRASS)
    doc.roundedRect(x, y, 10, 1.2, 0.4, 0.4, 'F')
    doc.setFillColor(...BRASS_LIGHT)
    doc.roundedRect(x, y + 2.2, 7, 1.2, 0.4, 0.4, 'F')
    doc.setFillColor(...BRASS)
    doc.roundedRect(x, y + 4.4, 4, 1.2, 0.4, 0.4, 'F')
  }

  // =========== Page 1 — Cover ===========
  bgPage()
  logoMark(w / 2 - 5, 35)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...BRASS)
  doc.text('FORTE AI SOLUTIONS', w / 2, 50, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...MUTED)
  doc.text('Decision Readiness Report', w / 2, 58, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...WHITE)
  const heading = organization || 'Prepared for your organization'
  const headingLines = wrap(heading, contentW, 22)
  let y = 95
  for (const line of headingLines) {
    doc.text(line, w / 2, y, { align: 'center' })
    y += 10
  }

  y += 6
  doc.setDrawColor(...BRASS)
  doc.setLineWidth(0.4)
  doc.line(w / 2 - 25, y, w / 2 + 25, y)
  y += 12

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text('CURRENT STAGE', w / 2, y, { align: 'center' })
  y += 9
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(32)
  doc.setTextColor(...BRASS_LIGHT)
  doc.text(report.bottleneckStage, w / 2, y, { align: 'center' })

  y += 14
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...MUTED)
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  doc.text(`Generated ${dateStr}`, w / 2, y, { align: 'center' })
  footer(1)

  // =========== Page 2 — Executive summary ===========
  doc.addPage()
  bgPage()
  y = 30

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRASS)
  doc.text('EXECUTIVE SUMMARY', margin, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...WHITE)
  const headlineLines = wrap(report.insight.headline, contentW, 18)
  for (const line of headlineLines) {
    doc.text(line, margin, y)
    y += 8
  }
  y += 4

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...WHITE)
  const insightLines = wrap(report.insight.body, contentW, 11)
  for (const line of insightLines) {
    doc.text(line, margin, y)
    y += 5.5
  }
  y += 6

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...BRASS_LIGHT)
  const nextHeadlineLines = wrap(report.nextStep.headline, contentW, 11)
  for (const line of nextHeadlineLines) {
    doc.text(line, margin, y)
    y += 5.5
  }
  y += 2

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...MUTED)
  const nextBodyLines = wrap(report.nextStep.body, contentW, 10)
  for (const line of nextBodyLines) {
    doc.text(line, margin, y)
    y += 5
  }

  footer(2)

  // =========== Page 3 — Scores ===========
  doc.addPage()
  bgPage()
  y = 30

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRASS)
  doc.text('YOUR SCORES', margin, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...WHITE)
  doc.text('Four dimensions, one bottleneck.', margin, y)
  y += 12

  for (const s of report.scores) {
    // Card background
    doc.setFillColor(...NAVY)
    doc.roundedRect(margin, y, contentW, 28, 2, 2, 'F')
    doc.setDrawColor(...BRASS)
    doc.setLineWidth(0.2)
    doc.roundedRect(margin, y, contentW, 28, 2, 2, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...BRASS_LIGHT)
    doc.text(DIMENSION_LABELS[s.dimension].toUpperCase(), margin + 5, y + 8)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(...WHITE)
    doc.text(`${s.average.toFixed(1)} / 4.0`, margin + 5, y + 17)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(`Stage: ${s.stage}`, margin + 50, y + 17)

    // Progress bar
    const barX = margin + contentW - 55
    const barY = y + 12
    const barW = 48
    const barH = 3
    doc.setFillColor(60, 70, 90)
    doc.rect(barX, barY, barW, barH, 'F')
    doc.setFillColor(...BRASS)
    doc.rect(barX, barY, barW * (s.average / 4.0), barH, 'F')

    // Stage markers below bar
    doc.setFontSize(6)
    doc.setTextColor(...MUTED)
    const stageLabels = STAGE_LABELS as readonly string[]
    for (let i = 0; i < stageLabels.length; i++) {
      const label = stageLabels[i] ?? ''
      const lx = barX + (barW / (stageLabels.length - 1)) * i
      doc.text(label, lx, barY + 6, { align: i === 0 ? 'left' : i === stageLabels.length - 1 ? 'right' : 'center' })
    }
    void STAGE_INDEX

    y += 32
  }

  footer(3)

  // =========== Page 4 — Unique insight ===========
  doc.addPage()
  bgPage()
  y = 30

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRASS)
  doc.text('THE UNIQUE INSIGHT', margin, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...WHITE)
  for (const line of wrap(report.insight.headline, contentW, 18)) {
    doc.text(line, margin, y)
    y += 8
  }
  y += 4

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...WHITE)
  for (const line of wrap(report.insight.body, contentW, 11)) {
    doc.text(line, margin, y)
    y += 5.5
  }
  y += 8

  if (report.statedPain) {
    doc.setFillColor(...NAVY_MID)
    const painLines = wrap(report.statedPain, contentW - 10, 10)
    const boxH = 10 + painLines.length * 5 + 8
    doc.roundedRect(margin, y, contentW, boxH, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...BRASS_LIGHT)
    doc.text('YOU TOLD US THE BIGGEST PAIN TO SOLVE IS', margin + 5, y + 7)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(10)
    doc.setTextColor(...WHITE)
    let py = y + 14
    for (const line of painLines) {
      doc.text(`"${line}"`, margin + 5, py)
      py += 5
    }
    y += boxH + 6
  }

  if (report.toolsSelected.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...BRASS_LIGHT)
    doc.text('TOOLS YOU TOLD US ABOUT', margin, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    const toolsText = report.toolsSelected.join(' · ')
    for (const line of wrap(toolsText, contentW, 9)) {
      doc.text(line, margin, y)
      y += 4.5
    }
  }

  footer(4)

  // =========== Page 5 — Top three priorities ===========
  doc.addPage()
  bgPage()
  y = 30

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRASS)
  doc.text('YOUR TOP THREE PRIORITIES', margin, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...WHITE)
  doc.text('In this order.', margin, y)
  y += 14

  for (let i = 0; i < report.priorities.length; i++) {
    const p = report.priorities[i]
    if (!p) continue
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.setTextColor(...BRASS_LIGHT)
    doc.text(String(i + 1).padStart(2, '0'), margin, y + 2)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...WHITE)
    const pTitle = wrap(p.title, contentW - 18, 12)
    for (const line of pTitle) {
      doc.text(line, margin + 18, y)
      y += 6
    }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...MUTED)
    const pBody = wrap(p.body, contentW - 18, 10)
    for (const line of pBody) {
      doc.text(line, margin + 18, y)
      y += 5
    }

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...BRASS_LIGHT)
    doc.text(`Estimate: ${p.estimate}`, margin + 18, y + 1)
    y += 12
  }

  footer(5)

  // =========== Page 6 — Recommended next step ===========
  doc.addPage()
  bgPage()
  y = 30

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...BRASS)
  doc.text('RECOMMENDED NEXT STEP', margin, y)
  y += 12

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...WHITE)
  for (const line of wrap(report.nextStep.headline, contentW, 18)) {
    doc.text(line, margin, y)
    y += 8
  }
  y += 4

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...WHITE)
  for (const line of wrap(report.nextStep.body, contentW, 11)) {
    doc.text(line, margin, y)
    y += 5.5
  }
  y += 10

  // CTA callout
  doc.setFillColor(...NAVY_MID)
  doc.setDrawColor(...BRASS)
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentW, 30, 2, 2, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...BRASS_LIGHT)
  doc.text('TALK IT THROUGH', margin + 6, y + 9)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...WHITE)
  const cta = 'Book a 30-minute discovery call at forteaisolutions.com/contact. No pitch, no pressure.'
  const ctaLines = wrap(cta, contentW - 12, 9)
  let cy = y + 16
  for (const line of ctaLines) {
    doc.text(line, margin + 6, cy)
    cy += 5
  }
  y += 38

  // Closing
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  const closing =
    'This report is yours. Use it however you want. Hire Forte or not. If you want to talk through what to do next, book a discovery call at forteaisolutions.com/contact.'
  for (const line of wrap(closing, contentW, 9)) {
    doc.text(line, margin, y)
    y += 4.5
  }

  footer(6)

  // Save
  const orgPart = organization
    ? sanitizeFilename(organization)
    : new Date().toISOString().slice(0, 10)
  doc.save(`Forte-Decision-Readiness-Report-${orgPart}.pdf`)
}
