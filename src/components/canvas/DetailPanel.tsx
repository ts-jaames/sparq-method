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

  const infraCount = (hasVera ? 1 : 0) + (hasStacks ? 1 : 0);

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
        padding: '24px 28px 20px',
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
          top: 14,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: 18,
          color: '#555',
          cursor: 'pointer',
          lineHeight: 1,
        }}
        aria-label="Close"
      >
        ×
      </button>

      {/* 1. Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: colors.border,
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f0', letterSpacing: '-0.01em' }}>{node.label}</div>
          <div style={{ fontSize: 11, color: '#777' }}>{node.subtitle}</div>
        </div>
      </div>

      {/* 2. Description */}
      <p style={{ fontSize: 13, lineHeight: 1.7, color: '#b0b0b0', margin: '0 0 16px' }}>{node.description}</p>

      {/* Warning callout for commercial pressure */}
      {isWarning && (
        <div style={{
          padding: '12px 14px',
          background: '#1f1012',
          border: '1px solid #ef444440',
          borderRadius: 8,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ef4444', marginBottom: 6 }}>System Warning</div>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: '#fca5a5', margin: 0 }}>
            This is where the system is most likely to fail. Commercial pressure does not override the gate. It surfaces the delta between what's being requested and what's been earned.
          </p>
        </div>
      )}

      {/* 3 & 4. VERA + Stacks */}
      {(hasVera || hasStacks) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: infraCount === 2 ? '1fr 1fr' : '1fr',
          gap: 12,
          marginBottom: 16,
        }}>
          {hasVera && node.veraRole && (
            <div style={{ padding: '12px 14px', background: '#141414', borderRadius: 8, border: '1px solid #d9770625' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706' }} />
                <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d97706' }}>VERA at this node</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#999', margin: 0 }}>{node.veraRole}</p>
            </div>
          )}
          {hasStacks && node.stacksRole && (
            <div style={{ padding: '12px 14px', background: '#141414', borderRadius: 8, border: '1px solid #60a5fa20' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa' }} />
                <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#60a5fa' }}>Stacks at this node</span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#999', margin: 0 }}>{node.stacksRole}</p>
            </div>
          )}
        </div>
      )}

      {/* 5. Downstream Ripple */}
      {downstreamNodes.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', marginBottom: 8 }}>Downstream Ripple</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {downstreamNodes.map((dn) => (
              <span
                key={dn.id}
                style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 5,
                  border: `1px solid ${TYPE_COLORS[dn.type].border}40`,
                  background: TYPE_COLORS[dn.type].fadeBg,
                  color: TYPE_COLORS[dn.type].text,
                  fontWeight: 500,
                }}
              >
                {dn.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
