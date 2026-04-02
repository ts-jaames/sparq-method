import { create } from 'zustand';
import type { EngagementNodeData, EngagementEdge } from './data';
import { initialNodes, initialEdges, defaultPositions } from './data';

interface CanvasState {
  nodes: (EngagementNodeData & { id: string })[];
  edges: EngagementEdge[];
  positions: Record<string, { x: number; y: number }>;
  selectedNodeId: string | null;
  downstreamIds: string[];

  selectNode: (id: string | null) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  addNode: (node: EngagementNodeData & { id: string }, position: { x: number; y: number }) => void;
  addEdge: (source: string, target: string, label: string) => void;
}

function getDownstream(nodeId: string, edges: { source: string; target: string }[]): string[] {
  const visited = new Set<string>();
  const queue = [nodeId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of edges) {
      if (edge.source === current && !visited.has(edge.target)) {
        visited.add(edge.target);
        queue.push(edge.target);
      }
    }
  }
  return Array.from(visited);
}

function loadPositions(): Record<string, { x: number; y: number }> {
  if (typeof window === 'undefined') return defaultPositions;
  try {
    const stored = localStorage.getItem('sparqos-canvas-positions-v2');
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultPositions, ...parsed };
    }
  } catch { /* ignore */ }
  return defaultPositions;
}

function savePositions(positions: Record<string, { x: number; y: number }>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('sparqos-canvas-positions-v2', JSON.stringify(positions));
  } catch { /* ignore */ }
}

function loadCustomNodes(): (EngagementNodeData & { id: string })[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('sparqos-canvas-custom-nodes-v2');
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

function loadCustomEdges(): EngagementEdge[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('sparqos-canvas-custom-edges-v2');
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  nodes: [...initialNodes, ...loadCustomNodes()],
  edges: [...initialEdges, ...loadCustomEdges()],
  positions: loadPositions(),
  selectedNodeId: null,
  downstreamIds: [],

  selectNode: (id) => {
    if (id === null) {
      set({ selectedNodeId: null, downstreamIds: [] });
    } else {
      const downstream = getDownstream(id, get().edges);
      set({ selectedNodeId: id, downstreamIds: downstream });
    }
  },

  updatePosition: (id, x, y) => {
    const positions = { ...get().positions, [id]: { x, y } };
    savePositions(positions);
    set({ positions });
  },

  addNode: (node, position) => {
    const nodes = [...get().nodes, node];
    const positions = { ...get().positions, [node.id]: position };
    savePositions(positions);
    const customNodes = nodes.filter((n) => !initialNodes.find((ini) => ini.id === n.id));
    localStorage.setItem('sparqos-canvas-custom-nodes-v2', JSON.stringify(customNodes));
    set({ nodes, positions });
  },

  addEdge: (source, target, label) => {
    const edges = [...get().edges, { source, target, label }];
    const customEdges = edges.filter(
      (e) => !initialEdges.find((ini) => ini.source === e.source && ini.target === e.target)
    );
    localStorage.setItem('sparqos-canvas-custom-edges-v2', JSON.stringify(customEdges));
    set({ edges });
  },
}));
