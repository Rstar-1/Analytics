import React, { useState, useCallback, useRef, useMemo, memo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Container from '../../components/common/Container';
import Icon from '../../components/common/Icon';
import CanvasToolbar from './CanvasToolbar';
import WorkflowNode, {
  StartEndNode,
  ActionNode,
  InputNode,
  MessageNode,
  SwitchNode,
  LoopNode,
  ApiNode,
  DatabaseNode,
  NoteNode,
  DelayNode,
} from './WorkflowNode';
import ConditionNode from './ConditionNode';
import { initialNodes, initialEdges, nodeCategories } from './initialData';

const NodePaletteItem = memo(({ item, onAdd }) => (
  <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData('application/reactflow', JSON.stringify(item));
      e.dataTransfer.effectAllowed = 'move';
    }}
    onClick={() => onAdd(item)}
    className="flex items-center p-10 rounded-5 bg-white cursor-pointer"
  >
    <div className="flex items-center gap-12">
      <div
        className="rounded-5 icon-lg"
        style={{ background: item.color }}
      >
        <Icon name={item.icon} width="20" height="20" stroke="var(--white)" />
      </div>
      <div className="w-85">
        <h6 className="font-500 headmini-text line-clamp1 text-dark">
          {item.name}
        </h6>
        <p className="font-400 mini-text text-gray line-clamp1">
          {item.description}
        </p>
      </div>
    </div>
  </div>
));
NodePaletteItem.displayName = 'NodePaletteItem';

const LeftSidebar = memo(({ categories, onAddNode }) => (
  <div className="w-25 h-full overflow-auto bg-white">
    <div className="p-12">
      <div className="grid-cols-1 gap-12">
        {categories.map((group) => (
          <div key={group.category}>
            <div className="flex items-center justify-between py-8 bordb">
              <h4 className="font-500 text-dark headmini-text">{group.category}</h4>
              <p className="font-400 text-gray mini-text">{group.items.length}</p>
            </div>

            <div className="grid-cols-1 gap-6 bg-forth p-12 mt-8">
              {group.items.map((item) => (
                <NodePaletteItem key={item.id} item={item} onAdd={onAddNode} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
));
LeftSidebar.displayName = 'LeftSidebar';

const FlowBuilderInner = () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState('4');

  const nodeTypes = useMemo(
    () => ({
      workflowNode: WorkflowNode,
      conditionNode: ConditionNode,
      startEndNode: StartEndNode,
      actionNode: ActionNode,
      inputNode: InputNode,
      messageNode: MessageNode,
      switchNode: SwitchNode,
      loopNode: LoopNode,
      apiNode: ApiNode,
      databaseNode: DatabaseNode,
      noteNode: NoteNode,
      delayNode: DelayNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: 'smoothstep', style: { stroke: '#64748b', strokeWidth: 1.5 } },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleAddNode = useCallback(
    (item, pos) => {
      const newNode = {
        id: `${Date.now()}`,
        type: item.type || 'workflowNode',
        position: pos || { x: 260 + (Math.random() * 40 - 20), y: 340 + (Math.random() * 40 - 20) },
        data: {
          title: item.name,
          subtitle: item.description,
          nodeType: item.name,
          color: item.color,
          bg: item.bg,
          border: item.border,
          icon: item.icon,
          hasTopHandle: true,
          hasBottomHandle: true,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      setSelectedNodeId(newNode.id);
    },
    [setNodes]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/reactflow');
      if (!raw) return;
      const item = JSON.parse(raw);
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      handleAddNode(item, position);
    },
    [screenToFlowPosition, handleAddNode]
  );

  const displayNodes = useMemo(
    () => nodes.map((n) => ({ ...n, selected: n.id === selectedNodeId })),
    [nodes, selectedNodeId]
  );

  return (
    <Container>
      <div className="flex w-full gap-12 overflow-hidden relative" style={{ height: '87vh' }}>
        <LeftSidebar
          categories={nodeCategories}
          onAddNode={handleAddNode}
        />

        <div
          ref={reactFlowWrapper}
          className="w-75 h-full relative bg-forth"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <CanvasToolbar />

          <ReactFlow
            nodes={displayNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.12, minZoom: 0.72, maxZoom: 1 }}
            minZoom={0.3}
            maxZoom={1.6}
            defaultViewport={{ x: 30, y: 15, zoom: 0.8 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={18} size={1.2} color="#cbd5e1" />
            <MiniMap
              position="bottom-left"
              nodeColor={(n) => n.data?.color || '#3b82f6'}
              nodeStrokeWidth={2}
              maskColor="rgba(240, 244, 248, 0.65)"
              style={{
                width: 130,
                height: 90,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                marginBottom: 16,
                marginLeft: 16,
              }}
            />
          </ReactFlow>
        </div>
      </div>
    </Container>
  );
};

const Home = () => (
  <ReactFlowProvider>
    <FlowBuilderInner />
  </ReactFlowProvider>
);

export default memo(Home);