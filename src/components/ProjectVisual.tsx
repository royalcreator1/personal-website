import {
  ArrowUpRight, Check, CheckCheck, ChevronRight, Code2, CreditCard,
  FileCheck2, Layers3, MapPin, Mic, MoreHorizontal, MousePointer2,
  PackageCheck, Phone, Play, Radio, ScanLine, Search, ShieldCheck,
  UserCheck, Video, Zap,
} from 'lucide-react'

const labels: Record<string, string> = {
  scan: 'Mediscan / inventory',
  grid: 'OnboardIQ / assessments',
  orbit: 'EFleet.ai / connected fleet',
  steps: 'Sedstart / test studio',
  bars: 'NBX / sales workspace',
  mesh: 'Synergy / communications',
  pulse: 'Zivian / provider workspace',
}

function ScanPreview() {
  return (
    <div className="pv-scan-layout">
      <div className="pv-phone">
        <div className="pv-phone-speaker" />
        <div className="pv-phone-top"><span>Receive inventory</span><ScanLine size={15} /></div>
        <div className="pv-scanner"><span /><ScanLine size={42} strokeWidth={1} /><span /></div>
        <p className="pv-muted">Scan. Match. Receive.</p>
        <div className="pv-phone-item"><PackageCheck size={18} /><div><strong>Purchase order</strong><small>Ready for receiving</small></div><Check size={14} /></div>
        <div className="pv-solid-action">Confirm receipt <ChevronRight size={13} /></div>
      </div>
      <div className="pv-scan-workflow">
        <span className="pv-kicker">CONNECTED WORKFLOW</span>
        <h4>Inventory,<br />in sync.</h4>
        {['Scan item', 'Match order', 'Receive goods'].map((step, index) => <div className="pv-flow-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><Check size={13} /></div>)}
        <div className="pv-integration"><Layers3 size={15} /> Oracle Fusion <ArrowUpRight size={12} /></div>
      </div>
    </div>
  )
}

function AssessmentPreview() {
  return (
    <div className="pv-assessment">
      <div className="pv-assessment-nav">
        <span className="pv-kicker">EXAM WORKSPACE</span>
        <div className="pv-nav-item is-selected"><Code2 size={14} /><span>Coding</span><span className="pv-indicator" /></div>
        <div className="pv-nav-item"><FileCheck2 size={14} /><span>Aptitude</span></div>
        <div className="pv-nav-item"><ShieldCheck size={14} /><span>Proctoring</span></div>
        <div className="pv-nav-item"><CheckCheck size={14} /><span>Evaluation</span></div>
      </div>
      <div className="pv-editor">
        <div className="pv-editor-tabs"><span>solution.py</span><small>Python</small></div>
        <div className="pv-code"><p><em>01</em><span>def</span> solve(items):</p><p><em>02</em>    result = []</p><p><em>03</em>    <span>for</span> item in items:</p><p><em>04</em>        result.append(item)</p><p><em>05</em>    <span>return</span> result</p></div>
        <div className="pv-editor-bottom"><span><span className="pv-indicator" /> Assessment in progress</span><span className="pv-mini-button"><Play size={10} fill="currentColor" /> Run code</span></div>
      </div>
    </div>
  )
}

function FleetPreview() {
  return (
    <div className="pv-fleet">
      <div className="pv-map">
        <div className="pv-map-grid" />
        <svg viewBox="0 0 400 200" fill="none" className="pv-map-route"><path d="M25 155H100V100H200V45H340" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" /><circle cx="100" cy="100" r="7" fill="currentColor" /><circle cx="340" cy="45" r="5" fill="currentColor" /></svg>
        <div className="pv-map-label"><MapPin size={12} /> Fleet overview</div>
        <div className="pv-vehicle-pin"><Zap size={14} fill="currentColor" /><span>Connected vehicle</span></div>
        <div className="pv-map-legend"><span className="pv-indicator" /> Telemetry connected</div>
      </div>
      <div className="pv-chart"><div><span className="pv-kicker">VEHICLE TELEMETRY</span><span className="pv-muted">Energy / activity</span></div><svg viewBox="0 0 400 70" fill="none" preserveAspectRatio="none"><path d="M0 60L28 56L50 59L80 42L108 47L135 28L160 32L185 24L210 35L236 18L265 23L290 8L322 17L350 10L380 14L400 4" stroke="currentColor" strokeWidth="2" /><path d="M0 69H400" stroke="currentColor" opacity=".15" /></svg></div>
    </div>
  )
}

function RecorderPreview() {
  return (
    <div className="pv-recorder">
      <div className="pv-recorder-stage"><div className="pv-recorder-badge"><span className="pv-indicator" /> Screen session</div><div className="pv-ghost-ui"><div /><div /><div /><span /></div><MousePointer2 className="pv-record-cursor" size={30} fill="currentColor" strokeWidth={1} /><span className="pv-record-hint">Every action. A test step.</span></div>
      <div className="pv-event-list"><div className="pv-event-heading"><span className="pv-kicker">GENERATED STEPS</span><Code2 size={14} /></div>{[['Navigate', 'Open application'], ['Click', 'Select a control'], ['Assert', 'Verify expected state']].map(([verb, text], index) => <div className="pv-event" key={verb}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{verb}</strong><small>{text}</small></div><Check size={12} /></div>)}</div>
    </div>
  )
}

function SalesPreview() {
  return (
    <div className="pv-sales">
      <div className="pv-sales-heading"><div><span className="pv-kicker">NEXT BEST EXPERIENCE</span><h4>A clearer next step.</h4></div><div className="pv-search"><Search size={13} /><span>Find a provider</span></div></div>
      <div className="pv-sales-tabs"><span className="is-selected">Provider insights</span><span>Territories</span><span>Overview</span></div>
      <div className="pv-table"><div className="pv-table-row pv-table-head"><span>Provider</span><span>Specialty</span><span>Review</span></div>{['Endocrinology', 'Specialist care', 'Clinical practice'].map((specialty, index) => <div className="pv-table-row" key={specialty}><span><span className="pv-table-avatar">{String(index + 1).padStart(2, '0')}</span><span className="pv-skeleton" /></span><span>{specialty}</span><span><ArrowUpRight size={14} /></span></div>)}</div>
    </div>
  )
}

function CallPreview() {
  return (
    <div className="pv-call">
      <div className="pv-call-heading"><span><Radio size={12} /> Ship-to-shore connection</span><span className="pv-call-quality">Adaptive quality</span></div>
      <div className="pv-participants"><div className="pv-participant"><span className="pv-avatar">S</span><small><span className="pv-indicator" /> Shore team</small></div><div className="pv-participant"><span className="pv-avatar">M</span><small><span className="pv-indicator" /> Marine team</small></div></div>
      <div className="pv-call-controls"><span><Mic size={15} /></span><span><Video size={15} /></span><span className="pv-end-call"><Phone size={15} /></span><span><MoreHorizontal size={16} /></span></div>
    </div>
  )
}

function HealthPreview() {
  return (
    <div className="pv-health">
      <div className="pv-health-core"><div className="pv-health-mark"><ShieldCheck size={28} strokeWidth={1.25} /></div><span className="pv-kicker">PROVIDER WORKSPACE</span><h4>Connected care.<br />Behind the scenes.</h4></div>
      <div className="pv-health-connections">{[[UserCheck, 'Provider verification', 'Verifiable'], [CreditCard, 'Payments & subscriptions', 'Stripe'], [ShieldCheck, 'Secure authentication', 'Twilio']].map(([Icon, label, tool]) => { const ConnectionIcon = Icon as typeof UserCheck; return <div className="pv-connection" key={String(tool)}><span className="pv-connection-icon"><ConnectionIcon size={17} /></span><div><strong>{String(label)}</strong><small>{String(tool)}</small></div><Check size={13} /></div> })}</div>
    </div>
  )
}

export default function ProjectVisual({ kind, compact = false }: { kind: string; compact?: boolean }) {
  return (
    <div className={`pv pv--${kind}${compact ? ' pv--compact' : ''}`} aria-hidden="true">
      <div className="pv-window">
        <div className="pv-toolbar"><span className="pv-dots"><i /><i /><i /></span><span>{labels[kind] ?? 'Project workspace'}</span><MoreHorizontal size={14} /></div>
        <div className="pv-body">
          {kind === 'scan' ? <ScanPreview /> : kind === 'grid' ? <AssessmentPreview /> : kind === 'orbit' ? <FleetPreview /> : kind === 'steps' ? <RecorderPreview /> : kind === 'bars' ? <SalesPreview /> : kind === 'mesh' ? <CallPreview /> : <HealthPreview />}
        </div>
      </div>
    </div>
  )
}
