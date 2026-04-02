export type NodeType = 'presales' | 'evidence' | 'commitment' | 'learning' | 'gate' | 'warning';

export interface EngagementNodeData {
  label: string;
  subtitle: string;
  type: NodeType;
  description: string;
  veraRole: string;
  stacksRole: string;
}

export interface EngagementEdge {
  source: string;
  target: string;
  label: string;
  dashed?: boolean;
}

export const TYPE_COLORS: Record<NodeType, { bg: string; border: string; text: string; fadeBg: string }> = {
  presales:   { bg: '#2d1f3d', border: '#a855f7', text: '#c084fc', fadeBg: '#231730' },
  evidence:   { bg: '#132b2a', border: '#14b8a6', text: '#5eead4', fadeBg: '#0f2120' },
  commitment: { bg: '#2d1a14', border: '#E75437', text: '#fb923c', fadeBg: '#241410' },
  learning:   { bg: '#2d2510', border: '#f59e0b', text: '#fbbf24', fadeBg: '#241e0c' },
  gate:       { bg: '#0f2a2e', border: '#22d3ee', text: '#67e8f9', fadeBg: '#0a1f22' },
  warning:    { bg: '#2d1215', border: '#ef4444', text: '#fca5a5', fadeBg: '#241012' },
};

export const VERA_ACTIVE_NODES = new Set([
  'proposal', 'contract', 'sc', 'assumption_mapping', 'evidence_loop',
  'confidence_gate', 'scope_check', 'commitment_loop', 'commercial_pressure',
  'release', 'production_learning', 'knowledge_capture', 'os_learning',
]);

export const STACKS_ACTIVE_NODES = new Set([
  'first_outreach', 'presales', 'proposal', 'contract', 'sc', 'staffing',
  'kickoff', 'client_orientation', 'assumption_mapping', 'evidence_loop',
  'confidence_gate', 'commitment_loop', 'scope_check', 'release',
  'production_learning', 'engagement_close', 'knowledge_capture', 'os_learning',
]);

export const initialNodes: (EngagementNodeData & { id: string })[] = [
  // ── Pre-engagement ──
  {
    id: 'first_outreach',
    label: 'First Outreach',
    subtitle: 'Before presales is formalized',
    type: 'presales',
    description: 'Initial contact with a potential client problem. No formal process yet — but assumptions are already forming. This is where the engagement fieldbook opens.',
    veraRole: '',
    stacksRole: 'Fieldbook opens. First contact captured. Nothing lost.',
  },
  {
    id: 'presales',
    label: 'Presales',
    subtitle: 'First client contact',
    type: 'presales',
    description: 'The first point of contact with a client problem. Assumptions formed here shape everything downstream. Evidence discipline should begin at this stage.',
    veraRole: '',
    stacksRole: 'Assumptions from early conversations recorded. Context carries forward.',
  },
  {
    id: 'proposal',
    label: 'Proposal / RFP Response',
    subtitle: 'A commitment act in disguise',
    type: 'presales',
    description: 'Proposals and RFP responses are commitment acts. Every promise written into a proposal constrains the engagement before it begins. Assumptions embedded here become invisible constraints.',
    veraRole: 'Drafts SOW language reflecting current confidence. Flags assumptions not yet validated. Cross-references similar past engagements.',
    stacksRole: 'SOW evidence lineage stored. Every commitment traceable to its source.',
  },
  {
    id: 'contract',
    label: 'Contract Signing',
    subtitle: 'Irreversibility formally begins',
    type: 'presales',
    description: 'The contract formalizes commitments. Irreversibility increases sharply. Everything signed here constrains what Evidence, Commitment, and Production Learning can do downstream.',
    veraRole: 'Traces every SOW commitment to its evidence source. Flags where commitments exceed current confidence.',
    stacksRole: 'Full provenance record established. Locked at signing for audit trail.',
  },
  // ── Setup ──
  {
    id: 'sc',
    label: 'Solution Consulting',
    subtitle: 'Scoping & SOW',
    type: 'presales',
    description: 'Scoping conversations, solution design, and SOW creation. Commitments written here become constraints for the entire engagement.',
    veraRole: 'Surfaces highest-risk assumptions from the conversation. Suggests initial evidence priorities.',
    stacksRole: 'Fieldbook forked from presales context. SC inherits full history.',
  },
  {
    id: 'staffing',
    label: 'Staffing',
    subtitle: 'Capability selection',
    type: 'presales',
    description: 'Selection of capabilities and team composition. Staffing decisions are commitments — they increase irreversibility and should be informed by evidence.',
    veraRole: '',
    stacksRole: 'Team composition logged. Capability maturity levels recorded.',
  },
  {
    id: 'kickoff',
    label: 'Engagement Kickoff',
    subtitle: 'System initialized',
    type: 'presales',
    description: 'The engagement formally begins. The delivery team inherits all prior context. The Engagement System is now fully active.',
    veraRole: '',
    stacksRole: 'Full team gains access to accumulated context. No cold starts.',
  },
  {
    id: 'client_orientation',
    label: 'Client Orientation',
    subtitle: 'Setting expectations without exposing the machinery',
    type: 'presales',
    description: 'The client is oriented to the engagement structure. Expectations are set about how work will progress, what visibility they will have, and how decisions will be communicated — without requiring them to adopt the internal operating model.',
    veraRole: '',
    stacksRole: 'Client-facing context layer initialized. Expectation commitments logged.',
  },
  // ── Core Loop ──
  {
    id: 'assumption_mapping',
    label: 'Assumption Mapping',
    subtitle: 'Risks become testable hypotheses',
    type: 'evidence',
    description: 'Assumptions are identified, categorized, and structured into testable hypotheses. This is the translation layer between "we think" and "we can prove." Every assumption gets a risk category and a validation path.',
    veraRole: 'Structures assumptions into testable hypotheses. Suggests slice designs. Flags overlap or bundled assumptions.',
    stacksRole: 'All assumptions logged with source, risk category, and status.',
  },
  {
    id: 'evidence_loop',
    label: 'Evidence Loop',
    subtitle: 'Build to Validate',
    type: 'evidence',
    description: 'Active uncertainty reduction through measurable signal. The continuous practice of asking: what are we assuming, and what would it cost us to be wrong?',
    veraRole: 'Monitors assumption validation rate. Flags when work is trending toward demonstration rather than validation. Surfaces confidence gaps.',
    stacksRole: 'Real-time assumption status updates. Signal recorded against predefined criteria.',
  },
  {
    id: 'confidence_gate',
    label: 'Confidence Gate',
    subtitle: 'The governing question answered',
    type: 'gate',
    description: 'The most critical decision point in the system. The governing question — what must be proven before we can responsibly commit further — is answered here. Three paths: promote to commitment, iterate for more evidence, or pivot assumptions entirely.',
    veraRole: 'Evaluates whether confidence threshold has been met. Surfaces what remains untested. Recommends promote / iterate / pivot.',
    stacksRole: 'Decision logged with full rationale. Assumption status updated: Validated / Invalidated / Conditional.',
  },
  {
    id: 'commercial_pressure',
    label: 'Commercial Pressure Event',
    subtitle: 'Timeline conflicts with confidence',
    type: 'warning',
    description: 'This is where the system is most likely to fail. Commercial pressure does not override the gate. It surfaces the delta between what is being requested and what has been earned through evidence.',
    veraRole: 'Surfaces the delta between current confidence and the commitment being requested. Does not block — informs.',
    stacksRole: '',
  },
  {
    id: 'scope_check',
    label: 'Scope Check',
    subtitle: 'Commercial and confidence checkpoint',
    type: 'commitment',
    description: 'A checkpoint where commercial commitments are reconciled against current confidence levels. Artifacts are regenerated from the current evidence state — not from assumptions or timelines.',
    veraRole: 'Regenerates artifacts — roadmap, backlog, cost model — from current evidence state. Flags where artifacts exceed evidence.',
    stacksRole: 'Current evidence state snapshot taken. Artifact versions tied to evidence state at time of generation.',
  },
  {
    id: 'commitment_loop',
    label: 'Commitment Loop',
    subtitle: 'Build to Operate',
    type: 'commitment',
    description: 'Deepening investment where confidence has been earned. Architecture hardens, operational obligations increase. The transition from evidence is explicit and recorded.',
    veraRole: 'Generates and maintains delivery artifacts. Monitors production-grade work against validated success criteria.',
    stacksRole: 'Promoted assumptions become production commitments. Evidence lineage maintained.',
  },
  {
    id: 'release',
    label: 'Release / Deploy',
    subtitle: 'Validated capability goes live',
    type: 'commitment',
    description: 'A validated capability is deployed to production. This is not the end of the cycle — it is the beginning of Production Learning. Validation metrics are promoted to production KPIs.',
    veraRole: 'Promotes validation metrics to production KPIs. Monitors early adoption signal.',
    stacksRole: 'Deployment logged against validated capability record.',
  },
  // ── Post-engagement & System ──
  {
    id: 'production_learning',
    label: 'Production Learning',
    subtitle: 'Signal re-enters system',
    type: 'learning',
    description: 'Signal generation from what is live. Any commitment operating in the real world generates signals that surface new assumptions, risks, and things worth testing.',
    veraRole: 'Surfaces new assumptions from live signal. Flags drift from validated behavior.',
    stacksRole: 'Live signal logged. New assumptions surface into evidence backlog.',
  },
  {
    id: 'engagement_close',
    label: 'Engagement Close',
    subtitle: 'Contract concludes',
    type: 'learning',
    description: 'The engagement contract concludes. The fieldbook is archived. The full engagement record — every assumption, every decision, every signal — is preserved.',
    veraRole: '',
    stacksRole: 'Fieldbook archived. Full engagement record preserved.',
  },
  {
    id: 'knowledge_capture',
    label: 'Knowledge Capture',
    subtitle: 'Signal feeds future engagements',
    type: 'learning',
    description: 'Patterns are extracted from the engagement record. Reusable signals, validated approaches, and failure modes are structured for future use across the organization.',
    veraRole: 'Structures engagement learnings into reusable evidence patterns for future engagements.',
    stacksRole: 'Patterns extracted. Reusable signal structured for future engagements.',
  },
  {
    id: 'os_learning',
    label: 'OS Learning Loop',
    subtitle: 'SparqOS improves from every engagement',
    type: 'learning',
    description: 'Cross-engagement intelligence feeds back into SparqOS itself. The operating system improves its models, its defaults, and its governance based on accumulated evidence from every engagement.',
    veraRole: "Updates VERA's cross-engagement pattern library. Improves SOW generation, assumption identification, confidence evaluation.",
    stacksRole: 'Cross-engagement intelligence fed back into system. SparqOS improves.',
  },
];

export const initialEdges: EngagementEdge[] = [
  // Pre-engagement flow
  { source: 'first_outreach',      target: 'presales',            label: 'leads to' },
  { source: 'presales',            target: 'proposal',            label: 'shapes' },
  { source: 'proposal',            target: 'contract',            label: 'formalizes' },
  // Setup
  { source: 'contract',            target: 'sc',                  label: 'initiates' },
  { source: 'contract',            target: 'staffing',            label: 'constrains' },
  { source: 'contract',            target: 'assumption_mapping',  label: 'surfaces' },
  { source: 'sc',                  target: 'staffing',            label: 'shapes' },
  { source: 'sc',                  target: 'evidence_loop',       label: 'first signal' },
  { source: 'staffing',            target: 'kickoff',             label: 'enables' },
  { source: 'kickoff',             target: 'client_orientation',  label: 'begins' },
  // Core loop entries
  { source: 'client_orientation',  target: 'evidence_loop',       label: 'enters' },
  { source: 'assumption_mapping',  target: 'evidence_loop',       label: 'feeds' },
  // Core loop
  { source: 'evidence_loop',       target: 'confidence_gate',     label: 'presents evidence' },
  { source: 'confidence_gate',     target: 'commitment_loop',     label: 'promote' },
  { source: 'confidence_gate',     target: 'evidence_loop',       label: 'iterate' },
  { source: 'confidence_gate',     target: 'assumption_mapping',  label: 'pivot' },
  // Pressure & scope
  { source: 'commercial_pressure', target: 'confidence_gate',     label: 'tests the gate', dashed: true },
  { source: 'scope_check',         target: 'confidence_gate',     label: 'informs' },
  { source: 'scope_check',         target: 'commitment_loop',     label: 'validates scope' },
  // Commitment → production
  { source: 'commitment_loop',     target: 'release',             label: 'ships' },
  { source: 'release',             target: 'production_learning', label: 'generates signal' },
  { source: 'production_learning', target: 'evidence_loop',       label: 'closes loop' },
  // Post-engagement
  { source: 'engagement_close',    target: 'knowledge_capture',   label: 'archives' },
  { source: 'knowledge_capture',   target: 'os_learning',         label: 'structures' },
  { source: 'os_learning',         target: 'first_outreach',      label: 'improves next' },
];

export const defaultPositions: Record<string, { x: number; y: number }> = {
  // Far left — pre-engagement
  first_outreach:      { x: 0,    y: 60 },
  presales:            { x: 0,    y: 200 },
  proposal:            { x: 220,  y: 60 },
  contract:            { x: 220,  y: 200 },
  // Center left — setup
  sc:                  { x: 440,  y: 60 },
  staffing:            { x: 440,  y: 200 },
  client_orientation:  { x: 440,  y: 340 },
  kickoff:             { x: 660,  y: 200 },
  // Center — core loop
  assumption_mapping:  { x: 660,  y: 60 },
  evidence_loop:       { x: 880,  y: 60 },
  confidence_gate:     { x: 880,  y: 200 },
  commercial_pressure: { x: 880,  y: 370 },
  // Center right
  scope_check:         { x: 1100, y: 60 },
  commitment_loop:     { x: 1100, y: 200 },
  release:             { x: 1100, y: 340 },
  // Far right — post
  production_learning: { x: 1320, y: 60 },
  engagement_close:    { x: 1320, y: 200 },
  knowledge_capture:   { x: 1320, y: 340 },
  os_learning:         { x: 1540, y: 200 },
};
