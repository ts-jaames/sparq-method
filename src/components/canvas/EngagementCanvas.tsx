import { useMemo, useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeChange,
  type NodeTypes,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCanvasStore } from './store';
import { VERA_ACTIVE_NODES, STACKS_ACTIVE_NODES } from './data';
import EngagementNode from './EngagementNode';
import DetailPanel from './DetailPanel';
import AddNodeForm from './AddNodeForm';

const nodeTypes: NodeTypes = {
  engagement: EngagementNode,
};

export default function EngagementCanvas() {
  const storeNodes = useCanvasStore((s) => s.nodes);
  const storeEdges = useCanvasStore((s) => s.edges);
  const positions = useCanvasStore((s) => s.positions);
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const downstreamIds = useCanvasStore((s) => s.downstreamIds);
  const selectNode = useCanvasStore((s) => s.selectNode);
  const updatePosition = useCanvasStore((s) => s.updatePosition);

  const [showAddForm, setShowAddForm] = useState(false);

  const veraActive = selectedNodeId !== null && VERA_ACTIVE_NODES.has(selectedNodeId);
  const stacksActive = selectedNodeId !== null && STACKS_ACTIVE_NODES.has(selectedNodeId);

  const rfNodes: Node[] = useMemo(
    () =>
      storeNodes.map((n) => ({
        id: n.id,
        type: 'engagement',
        position: positions[n.id] || { x: 0, y: 0 },
        data: { label: n.label, subtitle: n.subtitle, type: n.type },
      })),
    [storeNodes, positions]
  );

  const rfEdges: Edge[] = useMemo(
    () =>
      storeEdges.map((e, i) => {
        const isHighlighted =
          selectedNodeId !== null &&
          (e.source === selectedNodeId || downstreamIds.includes(e.source)) &&
          (e.target === selectedNodeId || downstreamIds.includes(e.target));

        const isFaded = selectedNodeId !== null && !isHighlighted;
        const isDashed = 'dashed' in e && e.dashed;

        return {
          id: `e-${i}`,
          source: e.source,
          target: e.target,
          label: e.label,
          type: 'default',
          animated: isHighlighted,
          style: {
            stroke: isFaded ? '#222' : isDashed ? '#ef4444' : '#555',
            strokeWidth: isHighlighted ? 1.5 : 0.75,
            strokeDasharray: isDashed ? '6 3' : undefined,
            opacity: isFaded ? 0.15 : 1,
            transition: 'all 0.2s ease',
          },
          labelStyle: {
            fontSize: 10,
            fontWeight: 500,
            fill: isFaded ? '#333' : '#888',
            opacity: isFaded ? 0.15 : 1,
          },
          labelBgStyle: {
            fill: '#111',
            opacity: isFaded ? 0.15 : 0.85,
          },
          labelBgPadding: [6, 4] as [number, number],
          labelBgBorderRadius: 4,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: isFaded ? '#222' : isDashed ? '#ef4444' : '#555',
          },
        };
      }),
    [storeEdges, selectedNodeId, downstreamIds]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      for (const change of changes) {
        if (change.type === 'position' && change.position && change.id) {
          updatePosition(change.id, change.position.x, change.position.y);
        }
      }
    },
    [updatePosition]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') selectNode(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectNode]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: '#0e0e0e',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          background: '#141414',
          borderBottom: '1px solid #222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="/"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: '#666',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Sparq OS
          </a>
          <span style={{ color: '#2a2a2a' }}>|</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0' }}>Engagement System Canvas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: '5px 12px',
              borderRadius: 6,
              border: '1px solid #2a2a2a',
              background: showAddForm ? '#e0e0e0' : 'transparent',
              color: showAddForm ? '#111' : '#777',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            + Add
          </button>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 }}>
            {([
              ['#a855f7', 'Presales'],
              ['#14b8a6', 'Evidence'],
              ['#E75437', 'Commitment'],
              ['#f59e0b', 'Learning'],
              ['#22d3ee', 'Gate'],
              ['#ef4444', 'Pressure'],
            ] as const).map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 10, color: '#777', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddForm && <AddNodeForm onClose={() => setShowAddForm(false)} />}

      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#0e0e0e' }}
      >
        <Background color="#1a1a1a" gap={32} size={1} />
        <Controls
          showInteractive={false}
          style={{
            borderRadius: 8,
            border: '1px solid #2a2a2a',
            overflow: 'hidden',
            background: '#141414',
          }}
        />
      </ReactFlow>

      {/* Infrastructure bands — always visible at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            height: 28,
            background: veraActive ? 'rgba(217,119,6,0.14)' : 'rgba(217,119,6,0.05)',
            borderTop: `1px solid rgba(217,119,6,${veraActive ? '0.35' : '0.12'})`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706', marginRight: 8, opacity: veraActive ? 1 : 0.5 }} />
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: veraActive ? '#fbbf24' : '#d9770680',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'color 0.25s ease',
          }}>
            VERA — evidence monitor + artifact layer
          </span>
        </div>
        <div
          style={{
            height: 28,
            background: stacksActive ? 'rgba(96,165,250,0.12)' : 'rgba(96,165,250,0.04)',
            borderTop: `1px solid rgba(96,165,250,${stacksActive ? '0.3' : '0.1'})`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', marginRight: 8, opacity: stacksActive ? 1 : 0.5 }} />
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: stacksActive ? '#93c5fd' : '#60a5fa60',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'color 0.25s ease',
          }}>
            Stacks — context layer
          </span>
        </div>
      </div>

      <DetailPanel />
    </div>
  );
}
