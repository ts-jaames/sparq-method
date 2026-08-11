import { useCanvasStore } from './store';
import { TYPE_COLORS, VERA_ACTIVE_NODES, STACKS_ACTIVE_NODES } from './data';

export default function DetailPanel() {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const nodes = useCanvasStore((s) => s.nodes);
  const downstreamIds = useCanvasStore((s) => s.downstreamIds);
  const selectNode = useCanvasStore((s) => s.selectNode);

  if (!selectedNodeId) return null;

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const colors = TYPE_COLORS[node.type];
  const downstreamNodes = nodes.filter((n) => downstreamIds.includes(n.id));
  const hasVera = VERA_ACTIVE_NODES.has(selectedNodeId);
  const hasStacks = STACKS_ACTIVE_NODES.has(selectedNodeId);
  const isWarning = node.type === 'warning';

  const relatedNodeData = nodes.filter((n) => node.relatedNodes?.includes(n.id));
  const infraCount = (hasVera ? 1 : 0) + (hasStacks ? 1 : 0);

  function NodeChip({ nodeId }: { nodeId: string }) {
    const target = nodes.find((n) => n.id === nodeId);
    if (!target) return null;
    const chipColors = TYPE_COLORS[target.type];
    return (
      <button
        onClick={() => selectNode(nodeId)}
        style={{
          fontSize: 10,
          padding: '2px 8px',
          borderRadius: 10,
          border: `1px solid ${chipColors.border}50`,
          background: chipColors.fadeBg,
          color: chipColors.text,
          fontWeight: 500,
          cursor: 'pointer',
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        }}
      >
        {target.label}
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 72,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(760px, calc(100vw - 48px))',
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: 12,
        padding: '20px 24px 16px',
        maxHeight: '44vh',
        overflowY: 'auto',
        zIndex: 50,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      <button
        onClick={() => selectNode(null)}
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          background: 'none',
          border: 'none',
          fontSize: 16,
          color: '#555',
          cursor: 'pointer',
          lineHeight: 1,
        }}
        aria-label="Close"
      >
        ×
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: colors.border,
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', letterSpacing: '-0.01em' }}>{node.label}</div>
          <div style={{ fontSize: 10, color: '#777' }}>{node.subtitle}</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Left: description + bullets */}
        <div>
          <p style={{ fontSize: 11, lineHeight: 1.6, color: '#b0b0b0', margin: '0 0 8px' }}>{node.description}</p>
          {node.bullets && node.bullets.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: 14, listStyle: 'none' }}>
              {node.bullets.map((bullet, i) => (
                <li key={i} style={{ fontSize: 10, lineHeight: 1.7, color: '#999', position: 'relative', paddingLeft: 8, marginBottom: 2 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#555' }}>·</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: related nodes + VERA/Stacks + downstream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Related Nodes as chips */}
          {relatedNodeData.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', marginBottom: 5 }}>Related</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {relatedNodeData.map((rn) => (
                  <NodeChip key={rn.id} nodeId={rn.id} />
                ))}
              </div>
            </div>
          )}

          {/* VERA */}
          {hasVera && node.veraRole && node.veraRole.length > 0 && (
            <div style={{ padding: '8px 10px', background: '#141414', borderRadius: 6, border: '1px solid #d9770620' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#d97706' }} />
                <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d97706' }}>VERA</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 12, listStyle: 'none' }}>
                {node.veraRole.map((item, i) => (
                  <li key={i} style={{ fontSize: 10, lineHeight: 1.6, color: '#888', position: 'relative', paddingLeft: 7 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#d9770660' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stacks */}
          {hasStacks && node.stacksRole && node.stacksRole.length > 0 && (
            <div style={{ padding: '8px 10px', background: '#141414', borderRadius: 6, border: '1px solid #60a5fa18' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa' }} />
                <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#60a5fa' }}>Stacks</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 12, listStyle: 'none' }}>
                {node.stacksRole.map((item, i) => (
                  <li key={i} style={{ fontSize: 10, lineHeight: 1.6, color: '#888', position: 'relative', paddingLeft: 7 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#60a5fa50' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Downstream Ripple */}
          {downstreamNodes.length > 0 && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', marginBottom: 5 }}>Downstream</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {downstreamNodes.map((dn) => (
                  <NodeChip key={dn.id} nodeId={dn.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warning callout */}
      {isWarning && (
        <div style={{
          padding: '10px 12px',
          background: '#1f1012',
          border: '1px solid #ef444440',
          borderRadius: 6,
          marginTop: 12,
        }}>
          <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ef4444', marginBottom: 4 }}>System Warning</div>
          <p style={{ fontSize: 10, lineHeight: 1.6, color: '#fca5a5', margin: 0 }}>
            Commercial pressure does not override the gate. It surfaces the delta between what's being requested and what's been earned.
          </p>
        </div>
      )}
    </div>
  );
}
