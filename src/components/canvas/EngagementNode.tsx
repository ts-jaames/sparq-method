import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeType } from './data';
import { TYPE_COLORS, VERA_ACTIVE_NODES, STACKS_ACTIVE_NODES } from './data';
import { useCanvasStore } from './store';

interface Props {
  id: string;
  data: {
    label: string;
    subtitle: string;
    type: NodeType;
  };
}

function EngagementNode({ id, data }: Props) {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const downstreamIds = useCanvasStore((s) => s.downstreamIds);
  const selectNode = useCanvasStore((s) => s.selectNode);
  const colors = TYPE_COLORS[data.type];

  const isSelected = selectedNodeId === id;
  const isDownstream = downstreamIds.includes(id);
  const isFaded = selectedNodeId !== null && !isSelected && !isDownstream;

  const isGate = data.type === 'gate';
  const isWarning = data.type === 'warning';
  const hasVera = VERA_ACTIVE_NODES.has(id);
  const hasStacks = STACKS_ACTIVE_NODES.has(id);

  let borderStyle = `1px solid #2a2a2a`;
  let bg = '#1a1a1a';
  let opacity = 1;
  let boxShadow = 'none';

  if (isGate) {
    borderStyle = `2px solid ${colors.border}`;
    bg = colors.bg;
    if (isSelected) {
      boxShadow = `0 0 16px ${colors.border}60, 0 0 32px ${colors.border}30`;
    }
  } else if (isWarning) {
    borderStyle = `1px solid ${colors.border}60`;
    bg = colors.bg;
  }

  if (isSelected && !isGate) {
    borderStyle = `2px solid ${colors.border}`;
    bg = colors.bg;
  } else if (isDownstream) {
    borderStyle = `1.5px dashed ${colors.border}`;
    bg = colors.fadeBg;
  } else if (isFaded) {
    opacity = 0.12;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectNode(isSelected ? null : id);
      }}
      className={isGate && isSelected ? 'gate-glow' : undefined}
      style={{
        width: 172,
        minHeight: 68,
        padding: '14px 16px',
        borderRadius: 8,
        border: borderStyle,
        background: bg,
        opacity,
        boxShadow,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        borderLeft: isWarning && !isSelected ? `3px solid ${colors.border}` : undefined,
      }}
    >
      <div style={{
        fontSize: 13,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 3,
        letterSpacing: '-0.01em',
      }}>
        {data.label}
      </div>
      <div style={{
        fontSize: isGate ? 11 : 11,
        color: isGate ? colors.text + 'bb' : '#8a8a8a',
        lineHeight: 1.4,
        fontStyle: isGate ? 'italic' : undefined,
      }}>
        {data.subtitle}
      </div>

      {/* Infrastructure indicator dots */}
      <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
        {hasVera && (
          <div
            title="VERA active"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#d97706',
            }}
          />
        )}
        {hasStacks && (
          <div
            title="Stacks active"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#60a5fa',
            }}
          />
        )}
        {!hasVera && !hasStacks && (
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: colors.border }} />
        )}
      </div>

      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 1, height: 1 }} />
    </div>
  );
}

export default memo(EngagementNode);
