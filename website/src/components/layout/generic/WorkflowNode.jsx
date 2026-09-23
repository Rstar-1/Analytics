import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Icon from '../../common/Icon';
import Modal from '../../common/Modal';
import Fields from '../../forms/Fields';
import Button from '../../common/Button';

export const ICON_OPTIONS = [
  { label: 'Rocket', value: 'Rocket' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Users', value: 'Users' },
  { label: 'Mail', value: 'Mail' },
  { label: 'Sparkles', value: 'Sparkles' },
  { label: 'Trending', value: 'Trending' },
  { label: 'Refresh', value: 'Refresh' },
  { label: 'Code', value: 'Code' },
  { label: 'Layers', value: 'Layers' },
  { label: 'File', value: 'File' },
  { label: 'Clock', value: 'Clock' },
  { label: 'Search', value: 'Search' },
  { label: 'Analytic', value: 'Analytic' },
  { label: 'Receipt', value: 'Receipt' },
  { label: 'Cart', value: 'Cart' },
  { label: 'Support', value: 'Support' },
  { label: 'Check', value: 'Check' },
];

/* --- Shared Handles Component --- */
const NodeHandles = ({ data, top = -4, bottom = -4, left = -4, right = -4 }) => (
  <>
    {data.hasTopHandle !== false && (
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: data.color || '#64748b',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
        }}
      />
    )}
    {data.hasLeftHandle && (
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{
          background: data.color || '#64748b',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          left,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
        }}
      />
    )}
    {data.hasRightHandle && (
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{
          background: data.color || '#64748b',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          right,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
        }}
      />
    )}
    {data.hasBottomHandle !== false && (
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: data.color || '#64748b',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          bottom,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
        }}
      />
    )}
  </>
);

/* --- Shared Content Layout with Generous Padding --- */
const NodeInner = ({ data }) => (
  <div className="flex items-center gap-12 w-full overflow-hidden">
    <div
      className="flex items-center justify-center rounded-8 flex-shrink-0"
      style={{
        width: 34,
        height: 34,
        background: data.color || '#3b82f6',
        color: '#ffffff',
      }}
    >
      <Icon name={data.icon || 'Sparkles'} width="18" height="18" stroke="#ffffff" />
    </div>
    <div className="flex flex-column overflow-hidden flex-1">
      <span
        className="font-600 text-dark"
        style={{
          fontSize: '12.5px',
          lineHeight: '17px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {data.title}
      </span>
      <span
        className="text-gray"
        style={{
          fontSize: '10px',
          lineHeight: '14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={data.subtitle || data.description}
      >
        {data.subtitle || data.description}
      </span>
    </div>
  </div>
);

/* =========================================================================
   1. Start / End Node (Capsule / Stadium - Flowchart Terminator)
   ========================================================================= */
export const StartEndNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#86efac');
  const fillColor = selected ? '#f0fdf4' : (data.bg || '#f0fdf4');

  return (
    <div
      className="flex items-center px-20 relative cursor-pointer"
      style={{
        width: 250,
        height: 58,
        borderRadius: 9999,
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      <NodeHandles data={data} top={-4} bottom={-4} left={-4} right={-4} />
      <NodeInner data={data} />
    </div>
  );
});
StartEndNode.displayName = 'StartEndNode';

/* =========================================================================
   2. Action Node (Process Box - Flowchart Process Rectangle)
   ========================================================================= */
export const ActionNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#93c5fd');
  const fillColor = selected ? '#eff6ff' : (data.bg || '#ffffff');

  return (
    <div
      className="flex items-center px-16 relative cursor-pointer"
      style={{
        width: 250,
        height: 58,
        borderRadius: 8,
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        borderLeft: `4px solid ${data.color || strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      <NodeHandles data={data} top={-4} bottom={-4} left={-4} right={-4} />
      <NodeInner data={data} />
    </div>
  );
});
ActionNode.displayName = 'ActionNode';

/* =========================================================================
   3. User Input Node (Parallelogram - Flowchart Input / Output)
   ========================================================================= */
export const InputNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#d8b4fe');
  const fillColor = selected ? '#faf5ff' : (data.bg || '#faf5ff');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 256,
        height: 58,
        padding: '0 26px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="256"
        height="58"
        viewBox="0 0 256 58"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="18,2 252,2 238,56 4,56"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={4} right={4} />
      <div className="relative z-1 w-full">
        <NodeInner data={data} />
      </div>
    </div>
  );
});
InputNode.displayName = 'InputNode';

/* =========================================================================
   4. Message Node (Document Wave Bottom - Flowchart Document)
   ========================================================================= */
export const MessageNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#99f6e4');
  const fillColor = selected ? '#f0fdfa' : (data.bg || '#f0fdfa');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 250,
        height: 60,
        padding: '0 16px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="250"
        height="60"
        viewBox="0 0 250 60"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 2,4 Q 2,2 4,2 L 246,2 Q 248,2 248,4 L 248,48 Q 186,38 125,49 Q 62,60 2,48 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-1} left={-2} right={-2} />
      <div className="relative z-1 w-full" style={{ marginBottom: 4 }}>
        <NodeInner data={data} />
      </div>
    </div>
  );
});
MessageNode.displayName = 'MessageNode';

/* =========================================================================
   5. Switch Node (Trapezoid - Flowchart Multi-Way Branch)
   ========================================================================= */
export const SwitchNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#fbcfe8');
  const fillColor = selected ? '#fdf2f8' : (data.bg || '#fdf2f8');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 250,
        height: 58,
        padding: '0 24px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="250"
        height="58"
        viewBox="0 0 250 58"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="8,2 242,2 226,56 24,56"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={10} right={10} />
      <div className="relative z-1 w-full">
        <NodeInner data={data} />
      </div>
    </div>
  );
});
SwitchNode.displayName = 'SwitchNode';

/* =========================================================================
   6. Loop Node (Hexagon - Flowchart Loop / Preparation)
   ========================================================================= */
export const LoopNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#ddd6fe');
  const fillColor = selected ? '#f5f3ff' : (data.bg || '#f5f3ff');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 250,
        height: 58,
        padding: '0 28px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="250"
        height="58"
        viewBox="0 0 250 58"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="18,29 34,2 216,2 232,29 216,56 34,56"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={12} right={12} />
      <div className="relative z-1 w-full">
        <NodeInner data={data} />
      </div>
    </div>
  );
});
LoopNode.displayName = 'LoopNode';

/* =========================================================================
   7. API Node (Subprocess / Predefined Process - Double Vertical Bars)
   ========================================================================= */
export const ApiNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#a5f3fc');
  const fillColor = selected ? '#ecfeff' : (data.bg || '#ecfeff');

  return (
    <div
      className="flex items-center px-20 relative cursor-pointer"
      style={{
        width: 250,
        height: 58,
        borderRadius: 8,
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: strokeColor,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 12,
          top: 0,
          bottom: 0,
          width: 1.5,
          background: strokeColor,
          opacity: 0.7,
        }}
      />
      <NodeHandles data={data} top={-4} bottom={-4} left={-4} right={-4} />
      <div style={{ marginLeft: 4, width: '100%' }}>
        <NodeInner data={data} />
      </div>
    </div>
  );
});
ApiNode.displayName = 'ApiNode';

/* =========================================================================
   8. Database Node (Cylinder - Flowchart Direct Access Storage)
   ========================================================================= */
export const DatabaseNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#93c5fd');
  const fillColor = selected ? '#eff6ff' : (data.bg || '#eff6ff');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 250,
        height: 60,
        padding: '0 18px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="250"
        height="60"
        viewBox="0 0 250 60"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 3,12 L 3,46 A 122 10 0 0 0 247,46 L 247,12 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="125"
          cy="12"
          rx="122"
          ry="10"
          fill={selected ? '#e0f2fe' : (data.bg || '#f0f9ff')}
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={-2} right={-2} />
      <div className="relative z-1 w-full" style={{ marginTop: 6 }}>
        <NodeInner data={data} />
      </div>
    </div>
  );
});
DatabaseNode.displayName = 'DatabaseNode';

/* =========================================================================
   9. Note Node (Sticky Note with Folded Dog-Ear Corner)
   ========================================================================= */
export const NoteNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#fde047');
  const fillColor = selected ? '#fefce8' : (data.bg || '#fefce8');

  return (
    <div
      className="relative flex items-center cursor-pointer"
      style={{
        width: 246,
        height: 58,
        padding: '0 16px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="246"
        height="58"
        viewBox="0 0 246 58"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 2,4 Q 2,2 4,2 L 222,2 L 244,24 L 244,54 Q 244,56 242,56 L 4,56 Q 2,56 2,54 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points="222,2 222,24 244,24"
          fill={data.border || '#fde047'}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={-2} right={-2} />
      <div className="relative z-1 w-full">
        <NodeInner data={data} />
      </div>
    </div>
  );
});
NoteNode.displayName = 'NoteNode';

/* =========================================================================
   10. Delay Node (D-Shape - Flowchart Stored Delay / Wait)
   ========================================================================= */
export const DelayNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#cbd5e1');
  const fillColor = selected ? '#f8fafc' : (data.bg || '#f8fafc');

  return (
    <div
      className="flex items-center px-18 relative cursor-pointer"
      style={{
        width: 240,
        height: 58,
        borderRadius: '8px 28px 28px 8px',
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      <NodeHandles data={data} top={-4} bottom={-4} left={-4} right={-4} />
      <NodeInner data={data} />
    </div>
  );
});
DelayNode.displayName = 'DelayNode';

/* =========================================================================
   11. Condition Node (Diamond / Rhombus - Flowchart Decision)
   ========================================================================= */
export const ConditionNode = memo(({ id, data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#f97316');
  const fillColor = selected ? '#f0f7ff' : (data.bg || '#fff7ed');

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      style={{
        width: 170,
        height: 110,
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.4))'
          : 'drop-shadow(0 1px 3px rgba(0,0,0,0.08))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="170"
        height="110"
        viewBox="0 0 170 110"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="85,3 167,55 85,107 3,55"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: data.color || '#f97316',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}
      />

      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          background: data.color || '#f97316',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}
      />

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{
          background: data.color || '#f97316',
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          zIndex: 5,
        }}
      />

      <div
        className="flex flex-column items-center justify-center relative"
        style={{
          zIndex: 2,
          padding: '0 18px',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{
            width: 26,
            height: 26,
            background: data.color || '#f97316',
            color: '#ffffff',
          }}
        >
          <Icon name={data.icon || 'Sparkles'} width="14" height="14" stroke="#ffffff" />
        </div>

        <span
          className="font-600 text-dark"
          style={{
            fontSize: '11.5px',
            lineHeight: '14px',
            marginBottom: '2px',
          }}
        >
          {data.title}
        </span>

        <span
          className="text-gray"
          style={{
            fontSize: '9px',
            lineHeight: '12px',
            maxWidth: '125px',
          }}
        >
          {data.subtitle || data.description}
        </span>
      </div>
    </div>
  );
});
ConditionNode.displayName = 'ConditionNode';

/* =========================================================================
   WorkflowNode: Master Dynamic Dispatcher
   ========================================================================= */
const WorkflowNode = (props) => {
  const nodeType = props.data?.nodeType || '';

  switch (nodeType) {
    case 'Start / End':
      return <StartEndNode {...props} />;
    case 'User Input':
      return <InputNode {...props} />;
    case 'Condition':
      return <ConditionNode {...props} />;
    case 'Message':
      return <MessageNode {...props} />;
    case 'Delay':
      return <DelayNode {...props} />;
    case 'Loop':
      return <LoopNode {...props} />;
    case 'Switch':
      return <SwitchNode {...props} />;
    case 'API':
      return <ApiNode {...props} />;
    case 'Database':
      return <DatabaseNode {...props} />;
    case 'Note':
      return <NoteNode {...props} />;
    case 'Action':
    default:
      return <ActionNode {...props} />;
  }
};

/* =========================================================================
   NodeEditSidebar: Sidebar Modal for editing Icon, Title, and Description
   ========================================================================= */
export const NodeEditSidebar = memo(({ isOpen, onClose, node, onUpdate }) => {
  if (!node) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type="sidebar"
      placement="right"
      size="sm"
      title={`${node.data?.nodeType || 'Node'} Properties`}
      footer={
        <div className="flex items-center justify-end w-full">
          <Button
            onClick={onClose}
            bg="primary"
            color="white"
            version="v0"
            className="px-16 py-8 font-500 rounded-5"
          >
            Done
          </Button>
        </div>
      }
    >
      <div className="grid-cols-1 gap-12">
        <Fields
          type="input"
          label="Icon"
          value={node.data?.icon || 'Settings'}
          options={ICON_OPTIONS}
          onChange={(val) => onUpdate?.('icon', val)}
        />

        <Fields
          type="input"
          label="Title"
          placeholder="Enter title..."
          value={node.data?.title || ''}
          onChange={(val) => onUpdate?.('title', val)}
        />

        <Fields
          type="textarea"
          label="Description"
          placeholder="Enter description..."
          value={node.data?.subtitle || node.data?.description || ''}
          onChange={(val) => onUpdate?.('description', val)}
          style={{ width: '95%' }}
        />
      </div>
    </Modal>
  );
});
NodeEditSidebar.displayName = 'NodeEditSidebar';

export default memo(WorkflowNode);
