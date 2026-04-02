import { useState } from 'react';
import { useCanvasStore } from './store';
import type { NodeType, EngagementNodeData } from './data';

const typeOptions: { value: NodeType; label: string }[] = [
  { value: 'presales', label: 'Presales' },
  { value: 'evidence', label: 'Evidence' },
  { value: 'commitment', label: 'Commitment' },
  { value: 'learning', label: 'Learning' },
  { value: 'gate', label: 'Gate' },
  { value: 'warning', label: 'Warning' },
];

export default function AddNodeForm({ onClose }: { onClose: () => void }) {
  const addNode = useCanvasStore((s) => s.addNode);
  const addEdge = useCanvasStore((s) => s.addEdge);
  const nodes = useCanvasStore((s) => s.nodes);

  const [mode, setMode] = useState<'node' | 'edge'>('node');
  const [label, setLabel] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState<NodeType>('evidence');
  const [description, setDescription] = useState('');
  const [veraRole, setVeraRole] = useState('');
  const [stacksRole, setStacksRole] = useState('');

  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [edgeLabel, setEdgeLabel] = useState('');

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '7px 10px',
    fontSize: 12,
    border: '1px solid #2a2a2a',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'inherit',
    background: '#111',
    color: '#ccc',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: '#666',
    marginBottom: 4,
    display: 'block',
  };

  function handleAddNode() {
    if (!label.trim()) return;
    const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const node: EngagementNodeData & { id: string } = {
      id,
      label,
      subtitle,
      type,
      description,
      veraRole,
      stacksRole,
    };
    addNode(node, { x: 400 + Math.random() * 100, y: 150 + Math.random() * 100 });
    onClose();
  }

  function handleAddEdge() {
    if (!edgeSource || !edgeTarget || !edgeLabel.trim()) return;
    addEdge(edgeSource, edgeTarget, edgeLabel);
    onClose();
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        right: 16,
        width: 300,
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: 12,
        padding: 20,
        zIndex: 60,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setMode('node')}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid #2a2a2a',
              background: mode === 'node' ? '#e0e0e0' : 'transparent',
              color: mode === 'node' ? '#111' : '#777',
              cursor: 'pointer',
            }}
          >
            Node
          </button>
          <button
            onClick={() => setMode('edge')}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid #2a2a2a',
              background: mode === 'edge' ? '#e0e0e0' : 'transparent',
              color: mode === 'edge' ? '#111' : '#777',
              cursor: 'pointer',
            }}
          >
            Edge
          </button>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: 16, color: '#555', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>

      {mode === 'node' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={labelStyle}>Label</label>
            <input value={label} onChange={(e) => setLabel(e.target.value)} style={inputStyle} placeholder="Node name" />
          </div>
          <div>
            <label style={labelStyle}>Subtitle</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={inputStyle} placeholder="Short description" />
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as NodeType)} style={{ ...inputStyle, appearance: 'auto' }}>
              {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: 48, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>VERA Role</label>
            <textarea value={veraRole} onChange={(e) => setVeraRole(e.target.value)} style={{ ...inputStyle, minHeight: 36, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Stacks Role</label>
            <textarea value={stacksRole} onChange={(e) => setStacksRole(e.target.value)} style={{ ...inputStyle, minHeight: 36, resize: 'vertical' }} />
          </div>
          <button
            onClick={handleAddNode}
            style={{
              marginTop: 4,
              padding: '8px 0',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              background: '#e0e0e0',
              color: '#111',
              cursor: 'pointer',
            }}
          >
            Add Node
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={labelStyle}>From</label>
            <select value={edgeSource} onChange={(e) => setEdgeSource(e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}>
              <option value="">Select node</option>
              {nodes.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>To</label>
            <select value={edgeTarget} onChange={(e) => setEdgeTarget(e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}>
              <option value="">Select node</option>
              {nodes.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Label</label>
            <input value={edgeLabel} onChange={(e) => setEdgeLabel(e.target.value)} style={inputStyle} placeholder="Relationship" />
          </div>
          <button
            onClick={handleAddEdge}
            style={{
              marginTop: 4,
              padding: '8px 0',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              background: '#e0e0e0',
              color: '#111',
              cursor: 'pointer',
            }}
          >
            Add Edge
          </button>
        </div>
      )}
    </div>
  );
}
