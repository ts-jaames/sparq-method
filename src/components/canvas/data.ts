export type NodeType = 'presales' | 'evidence' | 'commitment' | 'learning' | 'gate' | 'warning';

export interface EngagementNodeData {
  label: string;
  subtitle: string;
  type: NodeType;
  description: string;
  bullets: string[];
  relatedNodes: string[];
  veraRole: string[];
  stacksRole: string[];
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
    description: 'Initial contact with a potential client problem.',
    bullets: [
      'No formal process yet — assumptions are already forming',
      'Engagement fieldbook opens here',
      'Early signals shape all downstream work',
    ],
    relatedNodes: ['presales'],
    veraRole: [],
    stacksRole: ['Fieldbook opens', 'First contact captured'],
  },
  {
    id: 'presales',
    label: 'Presales',
    subtitle: 'First client contact',
    type: 'presales',
    description: 'First point of contact with a client problem.',
    bullets: [
      'Assumptions formed here shape everything downstream',
      'Evidence discipline should begin at this stage',
      'Context must carry forward — not be recreated later',
    ],
    relatedNodes: ['proposal', 'assumption_mapping'],
    veraRole: [],
    stacksRole: ['Early conversation assumptions recorded', 'Context carries forward'],
  },
  {
    id: 'proposal',
    label: 'Proposal / RFP Response',
    subtitle: 'A commitment act in disguise',
    type: 'presales',
    description: 'Proposals are commitment acts.',
    bullets: [
      'Every promise constrains the engagement before it begins',
      'Assumptions embedded here become invisible constraints',
      'Should reflect current confidence — not aspirations',
    ],
    relatedNodes: ['contract', 'confidence_gate'],
    veraRole: ['Drafts SOW language reflecting current confidence', 'Flags unvalidated assumptions', 'Cross-references similar past engagements'],
    stacksRole: ['SOW evidence lineage stored', 'Every commitment traceable to source'],
  },
  {
    id: 'contract',
    label: 'Contract Signing',
    subtitle: 'Irreversibility formally begins',
    type: 'presales',
    description: 'Formalizes commitments — irreversibility increases sharply.',
    bullets: [
      'Everything signed constrains downstream nodes',
      'Commitments should not exceed current confidence',
      'Creates the boundary conditions for the engagement',
    ],
    relatedNodes: ['evidence_loop', 'commitment_loop', 'production_learning'],
    veraRole: ['Traces SOW commitments to evidence sources', 'Flags where commitments exceed confidence'],
    stacksRole: ['Full provenance record established', 'Locked at signing for audit trail'],
  },
  // ── Setup ──
  {
    id: 'sc',
    label: 'Solution Consulting',
    subtitle: 'Scoping & SOW',
    type: 'presales',
    description: 'Scoping conversations and solution design.',
    bullets: [
      'Commitments written here constrain the entire engagement',
      'Highest-risk assumptions should be identified early',
      'SOW creation is an evidence act',
    ],
    relatedNodes: ['proposal', 'evidence_loop', 'assumption_mapping'],
    veraRole: ['Surfaces highest-risk assumptions', 'Suggests initial evidence priorities'],
    stacksRole: ['Fieldbook forked from presales context', 'SC inherits full history'],
  },
  {
    id: 'staffing',
    label: 'Staffing',
    subtitle: 'Capability selection',
    type: 'presales',
    description: 'Team composition and capability selection.',
    bullets: [
      'Staffing decisions are commitments — they increase irreversibility',
      'Should be informed by evidence, not assumptions',
      'Capability maturity affects what can be validated',
    ],
    relatedNodes: ['kickoff', 'contract'],
    veraRole: [],
    stacksRole: ['Team composition logged', 'Capability maturity levels recorded'],
  },
  {
    id: 'kickoff',
    label: 'Engagement Kickoff',
    subtitle: 'System initialized',
    type: 'presales',
    description: 'The engagement formally begins.',
    bullets: [
      'Delivery team inherits all prior context',
      'Engagement System is now fully active',
      'No cold starts — everything carries forward',
    ],
    relatedNodes: ['client_orientation', 'evidence_loop'],
    veraRole: [],
    stacksRole: ['Full team gains access to accumulated context'],
  },
  {
    id: 'client_orientation',
    label: 'Client Orientation',
    subtitle: 'Setting expectations without exposing the machinery',
    type: 'presales',
    description: 'Client is oriented to the engagement structure.',
    bullets: [
      'Sets expectations about progress visibility',
      'Communicates decision cadence',
      'Client does not need to adopt the internal operating model',
    ],
    relatedNodes: ['evidence_loop', 'confidence_gate'],
    veraRole: [],
    stacksRole: ['Client-facing context layer initialized', 'Expectation commitments logged'],
  },
  // ── Core Loop ──
  {
    id: 'assumption_mapping',
    label: 'Assumption Mapping',
    subtitle: 'Risks become testable hypotheses',
    type: 'evidence',
    description: 'Translation layer between "we think" and "we can prove."',
    bullets: [
      'Assumptions identified, categorized, and structured',
      'Each gets a risk category and validation path',
      'Bundled assumptions are decomposed',
    ],
    relatedNodes: ['evidence_loop', 'confidence_gate'],
    veraRole: ['Structures assumptions into testable hypotheses', 'Suggests slice designs', 'Flags overlap or bundled assumptions'],
    stacksRole: ['All assumptions logged with source and risk category', 'Status tracked continuously'],
  },
  {
    id: 'evidence_loop',
    label: 'Evidence Loop',
    subtitle: 'Build to Validate',
    type: 'evidence',
    description: 'Active uncertainty reduction through measurable signal.',
    bullets: [
      'What are we assuming?',
      'What would it cost us to be wrong?',
      'Work produces signal — not just output',
    ],
    relatedNodes: ['confidence_gate', 'assumption_mapping', 'production_learning'],
    veraRole: ['Monitors assumption validation rate', 'Flags demonstration over validation', 'Surfaces confidence gaps'],
    stacksRole: ['Real-time assumption status updates', 'Signal recorded against predefined criteria'],
  },
  {
    id: 'confidence_gate',
    label: 'Confidence Gate',
    subtitle: 'The governing question answered',
    type: 'gate',
    description: 'Most critical decision point in the system.',
    bullets: [
      'Has the governing question been answered?',
      'Three paths: promote, iterate, or pivot',
      'Confidence threshold must be met — not approximated',
    ],
    relatedNodes: ['commitment_loop', 'evidence_loop', 'assumption_mapping'],
    veraRole: ['Evaluates confidence threshold', 'Surfaces what remains untested', 'Recommends promote / iterate / pivot'],
    stacksRole: ['Decision logged with full rationale', 'Status updated: Validated / Invalidated / Conditional'],
  },
  {
    id: 'commercial_pressure',
    label: 'Commercial Pressure Event',
    subtitle: 'Timeline conflicts with confidence',
    type: 'warning',
    description: 'Where the system is most likely to fail.',
    bullets: [
      'Commercial pressure does not override the gate',
      'Surfaces the delta between request and evidence',
      'Informs — does not block',
    ],
    relatedNodes: ['confidence_gate'],
    veraRole: ['Surfaces delta between confidence and requested commitment', 'Informs without blocking'],
    stacksRole: [],
  },
  {
    id: 'scope_check',
    label: 'Scope Check',
    subtitle: 'Commercial and confidence checkpoint',
    type: 'commitment',
    description: 'Reconciles commitments against current confidence.',
    bullets: [
      'Artifacts regenerated from current evidence state',
      'Not from assumptions or timelines',
      'Flags where artifacts exceed what evidence supports',
    ],
    relatedNodes: ['confidence_gate', 'commitment_loop'],
    veraRole: ['Regenerates roadmap, backlog, cost model from evidence', 'Flags where artifacts exceed evidence'],
    stacksRole: ['Evidence state snapshot taken', 'Artifact versions tied to evidence state'],
  },
  {
    id: 'commitment_loop',
    label: 'Commitment Loop',
    subtitle: 'Build to Operate',
    type: 'commitment',
    description: 'Deepening investment where confidence has been earned.',
    bullets: [
      'Architecture hardens',
      'Operational obligations increase',
      'Transition from evidence is explicit and recorded',
    ],
    relatedNodes: ['evidence_loop', 'release', 'confidence_gate'],
    veraRole: ['Generates and maintains delivery artifacts', 'Monitors against validated success criteria'],
    stacksRole: ['Promoted assumptions become production commitments', 'Evidence lineage maintained'],
  },
  {
    id: 'release',
    label: 'Release / Deploy',
    subtitle: 'Validated capability goes live',
    type: 'commitment',
    description: 'Validated capability deployed to production.',
    bullets: [
      'Not the end — beginning of Production Learning',
      'Validation metrics promoted to production KPIs',
      'Deployment is a commitment act',
    ],
    relatedNodes: ['production_learning', 'commitment_loop'],
    veraRole: ['Promotes validation metrics to production KPIs', 'Monitors early adoption signal'],
    stacksRole: ['Deployment logged against validated capability record'],
  },
  // ── Post-engagement & System ──
  {
    id: 'production_learning',
    label: 'Production Learning',
    subtitle: 'Signal re-enters system',
    type: 'learning',
    description: 'Signal generation from what is live.',
    bullets: [
      'Live systems generate new assumptions and risks',
      'Signal surfaces things worth testing',
      'Feeds back into the evidence loop',
    ],
    relatedNodes: ['evidence_loop', 'engagement_close'],
    veraRole: ['Surfaces new assumptions from live signal', 'Flags drift from validated behavior'],
    stacksRole: ['Live signal logged', 'New assumptions surface into evidence backlog'],
  },
  {
    id: 'engagement_close',
    label: 'Engagement Close',
    subtitle: 'Contract concludes',
    type: 'learning',
    description: 'Engagement contract concludes.',
    bullets: [
      'Fieldbook is archived',
      'Full engagement record preserved',
      'Every assumption, decision, and signal retained',
    ],
    relatedNodes: ['knowledge_capture'],
    veraRole: [],
    stacksRole: ['Fieldbook archived', 'Full engagement record preserved'],
  },
  {
    id: 'knowledge_capture',
    label: 'Knowledge Capture',
    subtitle: 'Signal feeds future engagements',
    type: 'learning',
    description: 'Patterns extracted from the engagement record.',
    bullets: [
      'Reusable signals structured for future use',
      'Validated approaches catalogued',
      'Failure modes documented for the organization',
    ],
    relatedNodes: ['os_learning', 'engagement_close'],
    veraRole: ['Structures learnings into reusable evidence patterns'],
    stacksRole: ['Patterns extracted', 'Reusable signal structured for future engagements'],
  },
  {
    id: 'os_learning',
    label: 'OS Learning Loop',
    subtitle: 'SparqOS improves from every engagement',
    type: 'learning',
    description: 'Cross-engagement intelligence feeds back into SparqOS.',
    bullets: [
      'Operating system improves its models and defaults',
      'Governance evolves based on accumulated evidence',
      'Every engagement makes the next one better',
    ],
    relatedNodes: ['first_outreach', 'knowledge_capture'],
    veraRole: ['Updates cross-engagement pattern library', 'Improves SOW generation and confidence evaluation'],
    stacksRole: ['Cross-engagement intelligence fed back into system'],
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
