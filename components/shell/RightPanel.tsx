import React from "react"
import { PAGES } from "@/data/mockData"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

// --- Interfaces ---

interface Chip {
  label: string
  tone?: string
  icon?: string
}

interface CustomCTA {
  label: string
  sub: string
  icon: string
}

interface ActionableCardData {
  title: string
  icon: string
  risk_reduction: number
  rebates_count: number
  body: string
  tags?: { label: string; tone: string }[]
  specifics?: string[]
  ctas?: CustomCTA[]
}

interface SectionData {
  type?: string
  title?: string
  subtitle?: string
  body?: string
  rows?: { left_label: string; right_value: string }[]
  items?: { title: string; icon: string; body: string }[]
  primary_cta?: { icon: string; label: string }
  cards?: any[]
  callout?: { title: string; body: string }
  description?: string
  current?: number
  target?: number
  label?: string
  cta?: string
}

interface PageData {
  id: string
  right_panel: {
    header: {
      title: string
      subtitle: string
      neighborhood_ranking?: string
      status_chips?: Chip[]
    }
    sections?: SectionData[]
    cards?: SectionData[]
  }
}

// --- Main Component ---

export function RightPanel({ viewId }: { viewId: string }) {
  const pageData = (PAGES.find(p => p.id === viewId) || PAGES[0]) as unknown as PageData
  const { header } = pageData.right_panel
  
  const sections = pageData.right_panel.sections || pageData.right_panel.cards || []

  return (
    <div className="absolute top-[72px] right-4 bottom-4 w-[420px] bg-panel-bg/95 backdrop-blur-xl rounded-panel border border-border-hairline shadow-panel overflow-hidden flex flex-col z-40">
      
      {/* Header (Sticky Top) */}
      <div className="p-6 pb-4 border-b border-border-hairline shrink-0 bg-panel-bg/50">
        <h1 className="text-3xl font-bold leading-tight tracking-tight mb-1">{header.title}</h1>
        <p className="text-text-secondary text-base font-medium mb-3">{header.subtitle}</p>
        
        {header.neighborhood_ranking && (
          <div className="bg-accent-danger/5 border border-accent-danger/10 rounded-lg p-3 mb-4">
            <p className="text-sm text-accent-danger font-semibold leading-relaxed">
              {header.neighborhood_ranking}
            </p>
          </div>
        )}

        {header.status_chips && (
          <div className="flex flex-wrap gap-2">
            {header.status_chips.map((chip, i) => (
              <Badge 
                key={i} 
                variant={
                  chip.tone === 'warning' ? 'status_warning' : 
                  chip.tone === 'danger' ? 'status_danger' : 
                  chip.tone === 'success' ? 'status_success' : 'status_primary'
                }
                className="gap-1.5 py-1 text-sm"
              >
                {chip.icon && <Icon name={chip.icon} className="w-4 h-4" />}
                {chip.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-12">
        {sections.map((section, i) => (
          <SectionRenderer key={i} section={section as SectionData} />
        ))}
        {/* Spacer to prevent chat overlap at the very bottom of scroll */}
        <div className="h-36" /> 
      </div>

      {/* Sticky Assistant Bar (Fixed Bottom) */}
      <div className="shrink-0 h-[144px] border-t border-border-hairline bg-accent-primary/[0.12] p-5 flex flex-col justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Icon name="message_square" className="w-4 h-4 text-accent-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-primary">Ask TMRW</span>
        </div>
        <div className="relative group">
          <input
            type="text"
            placeholder="Ask about your risk or actions..."
            className="h-12 w-full rounded-xl bg-white border border-border-subtle pl-4 pr-12 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 shadow-sm transition-all"
          />
          <div className="absolute right-1.5 top-1.5 h-9 w-9 bg-accent-primary rounded-lg flex items-center justify-center text-white cursor-pointer hover:bg-accent-primary/90 transition-transform active:scale-95">
            <Icon name="arrow_up_right" className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 text-[11px] text-text-muted leading-relaxed italic px-1">
          "What is the bamboo rebate?" • "How do I start a group buy?"
        </div>
      </div>
    </div>
  )
}

function SectionRenderer({ section }: { section: SectionData }) {
  if (section.type === 'actionable_risks') {
    return <ActionableRisks section={section} />
  }
  if (section.type === 'collective_progress') {
    return <CollectiveProgress section={section} />
  }
  if (section.type === 'status_leaderboard') {
    return <StatusLeaderboard section={section} />
  }
  if (section.type === 'hero_metric') {
    return <HeroMetricSection section={section} />
  }
  if (section.type === 'stacked_cards') {
    return <StackedCardsSection section={section} />
  }
  return <StandardCard section={section} />
}

function ActionableRisks({ section }: { section: SectionData }) {
  return (
    <div className="space-y-4">
      <div className="px-1">
        <h3 className="text-xl font-bold text-text-primary">{section.title}</h3>
        {section.subtitle && <p className="text-sm text-text-muted mt-1">{section.subtitle}</p>}
      </div>
      {section.cards?.map((card: ActionableCardData, i: number) => (
        <Card key={i} className="border-border-hairline bg-white shadow-sm overflow-hidden">
          <CardContent className="p-4">
            {/* Title & Risk Reduction */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/5 flex items-center justify-center text-accent-primary shrink-0">
                  <Icon name={card.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">{card.title}</h4>
                  <div className="mt-1 flex gap-2">
                    {card.tags?.map((tag, j) => (
                      <Badge key={j} variant={tag.tone === 'danger' ? 'status_danger' : 'status_warning'} className="text-[10px] h-5">
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-text-muted uppercase font-bold tracking-tighter">Impact</div>
                <div className="text-accent-success font-bold text-sm">-{card.risk_reduction}% Risk</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {card.body}
            </p>

            {/* CTAs - Grid of 4 */}
            <div className="border-t border-border-hairline pt-4">
              <div className="text-xs font-bold text-text-muted uppercase mb-3 px-1">What to do?</div>
              <div className="grid grid-cols-2 gap-2">
                {card.ctas ? (
                  card.ctas.map((cta, idx) => (
                    <Button key={idx} variant="outline" className="justify-start h-auto py-2.5 px-3 border-accent-primary/20 hover:bg-accent-primary/5 group" size="sm">
                      <div className="text-left w-full overflow-hidden">
                        <div className={cn(
                          "text-xs font-bold flex items-center gap-1.5",
                          cta.icon === 'accent-success' ? "text-accent-success" : "text-accent-primary"
                        )}>
                          {cta.label} 
                          {cta.icon !== 'accent-success' && <Icon name={cta.icon} className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                        </div>
                        <div className="text-[10px] text-text-muted truncate">{cta.sub}</div>
                      </div>
                    </Button>
                  ))
                ) : (
                  <>
                    <Button variant="outline" className="justify-start h-auto py-2.5 px-3 border-accent-primary/20 hover:bg-accent-primary/5 group" size="sm">
                      <div className="text-left">
                        <div className="text-xs font-bold text-accent-primary flex items-center gap-1.5">
                          Get Quote <Icon name="arrow_up_right" className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <div className="text-[10px] text-text-muted">Local contractors</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-2.5 px-3 border-accent-primary/20 hover:bg-accent-primary/5" size="sm">
                      <div className="text-left">
                        <div className="text-xs font-bold text-accent-primary">Do it Myself</div>
                        <div className="text-[10px] text-text-muted">View DIY guide</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-2.5 px-3 border-accent-success/20 hover:bg-accent-success/5" size="sm">
                      <div className="text-left">
                        <div className="text-xs font-bold text-accent-success">
                          Rebates {card.rebates_count > 0 && `(${card.rebates_count})`}
                        </div>
                        <div className="text-[10px] text-text-muted">Save on costs</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-2.5 px-3 border-accent-primary/20 hover:bg-accent-primary/5" size="sm">
                      <div className="text-left">
                        <div className="text-xs font-bold text-accent-primary">Neighborhood</div>
                        <div className="text-[10px] text-text-muted">Start group action</div>
                      </div>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CollectiveProgress({ section }: { section: SectionData }) {
  const current = section.current || 0
  const target = section.target || 1
  const percentage = Math.min(100, Math.round((current / target) * 100))

  return (
    <Card className="border-accent-primary/20 bg-accent-primary/5 overflow-hidden">
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-text-primary mb-2">{section.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{section.description}</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-accent-primary">
            <span>Progress: {current} / {target} Houses</span>
            <span>{percentage}% to Tipping Point</span>
          </div>
          <div className="h-2.5 w-full bg-accent-primary/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-accent-primary transition-all duration-1000" 
              style={{ width: `${percentage}%` }} 
            />
          </div>
        </div>

        <Button className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white shadow-lg shadow-accent-primary/20 rounded-xl py-6 text-base font-bold">
          <Icon name="users" className="w-5 h-5 mr-2" />
          {section.cta}
        </Button>
      </CardContent>
    </Card>
  )
}

function StatusLeaderboard({ section }: { section: SectionData }) {
  return (
    <div className="space-y-3">
      <div className="px-1">
        <h3 className="text-base font-bold text-text-primary uppercase tracking-wider">{section.title}</h3>
        {section.subtitle && <p className="text-xs text-text-muted mt-1">{section.subtitle}</p>}
      </div>
      <div className="space-y-2">
        {section.items?.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-hairline rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-success/10 flex items-center justify-center text-accent-success shrink-0">
                <Icon name={item.icon} className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-text-primary">{item.title}</span>
            </div>
            <Badge variant="status_success" className="text-[10px] uppercase font-bold">Verified</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroMetricSection({ section }: { section: SectionData }) {
  return (
    <div className="py-2">
      <h3 className="text-base font-medium text-text-muted mb-3 uppercase tracking-wider text-sm">{section.title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {section.rows?.map((row, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-border-hairline last:border-0">
            <span className="text-text-secondary text-base">{row.left_label}</span>
            <span className="text-text-primary font-medium text-right text-base">{row.right_value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StackedCardsSection({ section }: { section: SectionData }) {
    return (
        <div className="space-y-4">
             <div className="mb-2">
                <h3 className="text-xl font-bold">{section.title}</h3>
                {section.subtitle && <p className="text-base text-text-muted">{section.subtitle}</p>}
             </div>
             {section.cards?.map((card, i) => (
                 <Card key={i} className="border-border-hairline bg-white shadow-sm hover:bg-panel-raised/50 transition-colors group">
                     <CardContent className="p-4">
                         <div className="flex items-start gap-3">
                             <div className="shrink-0 w-10 h-10 rounded-full bg-app-bg flex items-center justify-center text-text-secondary group-hover:text-accent-primary transition-colors">
                                 <Icon name={card.icon} className="w-5 h-5" />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="text-lg font-bold truncate">{card.title}</h4>
                                 </div>
                                 <p className="text-base text-text-secondary leading-relaxed mb-3">{card.body}</p>
                                 {card.specifics && (
                                     <div className="bg-app-bg/50 rounded-lg p-3 text-sm text-text-muted space-y-1.5 mb-3">
                                         {card.specifics.map((s: string, k: number) => (
                                             <div key={k} className="flex gap-2">
                                                 <span className="text-accent-primary font-bold">•</span>
                                                 <span>{s}</span>
                                             </div>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         </div>
                     </CardContent>
                 </Card>
             ))}
        </div>
    )
}

function StandardCard({ section }: { section: SectionData }) {
  return (
    <Card className="border-border-hairline bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
        {section.subtitle && <p className="text-base text-text-muted mt-1">{section.subtitle}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {section.body && <p className="text-base text-text-secondary leading-relaxed">{section.body}</p>}
        
        {/* Items List */}
        {section.items && (
          <div className="space-y-4">
            {section.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-app-bg flex items-center justify-center border border-border-hairline text-accent-primary">
                  <Icon name={item.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">{item.title}</h4>
                  <p className="text-sm text-text-muted leading-relaxed mt-1">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Callout */}
        {section.callout && (
             <div className="bg-accent-warning/5 border border-accent-warning/10 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-accent-warning uppercase mb-1">{section.callout.title}</h4>
                <p className="text-base text-text-secondary leading-relaxed">{section.callout.body}</p>
             </div>
        )}

        {section.primary_cta && (
          <Button className="w-full mt-2" variant="default">
             <Icon name={section.primary_cta.icon} className="w-4 h-4 mr-2" />
             {section.primary_cta.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
