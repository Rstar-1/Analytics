import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Icon from '../../components/common/Icon';
import ConditionNode from './ConditionNode';

/* --- Shared Handles Component --- */
const NodeHandles = ({ data, top = -4, bottom = -4, left = -4, right = -4 }) => (
  <>
    {data.hasTopHandle !== false && (
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: data.color || '#64748b',
          width: 7,
          height: 7,
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
          width: 7,
          height: 7,
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
          width: 7,
          height: 7,
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
          width: 7,
          height: 7,
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

/* --- Shared Content Layout --- */
const NodeInner = ({ data, maxWidth = '160px' }) => (
  <div className="flex items-center gap-10 overflow-hidden" style={{ maxWidth: 'calc(100% - 10px)' }}>
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: 30,
        height: 30,
        background: data.color || '#3b82f6',
        color: '#ffffff',
      }}
    >
      <Icon name={data.icon || 'Sparkles'} width="15" height="15" stroke="#ffffff" />
    </div>
    <div className="flex flex-column overflow-hidden">
      <span
        className="font-600 text-dark"
        style={{
          fontSize: '12px',
          lineHeight: '16px',
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
          fontSize: '9.5px',
          lineHeight: '13px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth,
        }}
        title={data.subtitle}
      >
        {data.subtitle}
      </span>
    </div>
  </div>
);

/* =========================================================================
   1. Start / End Node (Pill / Capsule / Stadium shape - Flowchart Terminator)
   ========================================================================= */
export const StartEndNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#86efac');
  const fillColor = selected ? '#f0fdf4' : (data.bg || '#f0fdf4');

  return (
    <div
      className="flex items-center justify-between px-16 relative cursor-pointer"
      style={{
        width: 220,
        height: 50,
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
      <NodeInner data={data} maxWidth="140px" />
      <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
        <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
      </div>
    </div>
  );
});
StartEndNode.displayName = 'StartEndNode';

/* =========================================================================
   2. Action Node (Process Box - Flowchart Rectangle with Accent Left Bar)
   ========================================================================= */
export const ActionNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#93c5fd');
  const fillColor = selected ? '#eff6ff' : (data.bg || '#ffffff');

  return (
    <div
      className="flex items-center justify-between px-12 relative cursor-pointer"
      style={{
        width: 220,
        height: 50,
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
      <NodeInner data={data} maxWidth="145px" />
      <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
        <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
      </div>
    </div>
  );
});
ActionNode.displayName = 'ActionNode';

/* =========================================================================
   3. User Input Node (Parallelogram - Flowchart Input / Output symbol)
   ========================================================================= */
export const InputNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#d8b4fe');
  const fillColor = selected ? '#faf5ff' : (data.bg || '#faf5ff');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 226,
        height: 52,
        padding: '0 24px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="226"
        height="52"
        viewBox="0 0 226 52"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="16,2 222,2 210,50 4,50"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={4} right={4} />
      <div className="relative z-1 flex items-center justify-between w-full">
        <NodeInner data={data} maxWidth="135px" />
        <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
          <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
        </div>
      </div>
    </div>
  );
});
InputNode.displayName = 'InputNode';

/* =========================================================================
   4. Message Node (Document / Message Wave bottom - Flowchart Document)
   ========================================================================= */
export const MessageNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#99f6e4');
  const fillColor = selected ? '#f0fdfa' : (data.bg || '#f0fdfa');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 220,
        height: 54,
        padding: '0 14px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="220"
        height="54"
        viewBox="0 0 220 54"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 2,4 Q 2,2 4,2 L 216,2 Q 218,2 218,4 L 218,44 Q 163,35 110,45 Q 57,55 2,44 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-1} left={-2} right={-2} />
      <div className="relative z-1 flex items-center justify-between w-full" style={{ marginBottom: 4 }}>
        <NodeInner data={data} maxWidth="140px" />
        <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
          <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
        </div>
      </div>
    </div>
  );
});
MessageNode.displayName = 'MessageNode';

/* =========================================================================
   5. Switch Node (Trapezoid - Flowchart Manual Operation / Multi-way branch)
   ========================================================================= */
export const SwitchNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#fbcfe8');
  const fillColor = selected ? '#fdf2f8' : (data.bg || '#fdf2f8');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 220,
        height: 52,
        padding: '0 20px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="220"
        height="52"
        viewBox="0 0 220 52"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="6,2 214,2 198,50 22,50"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={10} right={10} />
      <div className="relative z-1 flex items-center justify-between w-full">
        <NodeInner data={data} maxWidth="135px" />
        <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
          <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
        </div>
      </div>
    </div>
  );
});
SwitchNode.displayName = 'SwitchNode';

/* =========================================================================
   6. Loop Node (Hexagon - Flowchart Loop / Preparation symbol)
   ========================================================================= */
export const LoopNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#ddd6fe');
  const fillColor = selected ? '#f5f3ff' : (data.bg || '#f5f3ff');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 220,
        height: 52,
        padding: '0 24px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="220"
        height="52"
        viewBox="0 0 220 52"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <polygon
          points="16,26 30,2 190,2 204,26 190,50 30,50"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={12} right={12} />
      <div className="relative z-1 flex items-center justify-between w-full">
        <NodeInner data={data} maxWidth="130px" />
        <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
          <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
        </div>
      </div>
    </div>
  );
});
LoopNode.displayName = 'LoopNode';

/* =========================================================================
   7. API Node (Predefined Process - Flowchart Subprocess with double side bars)
   ========================================================================= */
export const ApiNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#a5f3fc');
  const fillColor = selected ? '#ecfeff' : (data.bg || '#ecfeff');

  return (
    <div
      className="flex items-center justify-between px-18 relative cursor-pointer"
      style={{
        width: 220,
        height: 50,
        borderRadius: 6,
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Flowchart Predefined Process inner side dividing bars */}
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
      <div style={{ marginLeft: 6 }}>
        <NodeInner data={data} maxWidth="130px" />
      </div>
      <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6, marginRight: 6 }}>
        <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
      </div>
    </div>
  );
});
ApiNode.displayName = 'ApiNode';

/* =========================================================================
   8. Database Node (Cylinder shape - Flowchart Direct Access Storage)
   ========================================================================= */
export const DatabaseNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#93c5fd');
  const fillColor = selected ? '#eff6ff' : (data.bg || '#eff6ff');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 220,
        height: 54,
        padding: '0 16px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="220"
        height="54"
        viewBox="0 0 220 54"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 3,11 L 3,42 A 107 9 0 0 0 217,42 L 217,11 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="110"
          cy="11"
          rx="107"
          ry="9"
          fill={selected ? '#e0f2fe' : (data.bg || '#f0f9ff')}
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={-2} right={-2} />
      <div className="relative z-1 flex items-center justify-between w-full" style={{ marginTop: 6 }}>
        <NodeInner data={data} maxWidth="138px" />
        <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
          <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
        </div>
      </div>
    </div>
  );
});
DatabaseNode.displayName = 'DatabaseNode';

/* =========================================================================
   9. Note Node (Sticky Note with Folded Dog-Ear Corner - Flowchart Annotation)
   ========================================================================= */
export const NoteNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#fde047');
  const fillColor = selected ? '#fefce8' : (data.bg || '#fefce8');

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer"
      style={{
        width: 216,
        height: 52,
        padding: '0 14px',
        filter: selected
          ? 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.35))'
          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))',
        transition: 'all 0.15s ease',
      }}
    >
      <svg
        width="216"
        height="52"
        viewBox="0 0 216 52"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <path
          d="M 2,4 Q 2,2 4,2 L 194,2 L 214,22 L 214,48 Q 214,50 212,50 L 4,50 Q 2,50 2,48 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points="194,2 194,22 214,22"
          fill={data.border || '#fde047'}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NodeHandles data={data} top={-2} bottom={-2} left={-2} right={-2} />
      <div className="relative z-1 flex items-center justify-between w-full">
        <NodeInner data={data} maxWidth="135px" />
      </div>
    </div>
  );
});
NoteNode.displayName = 'NoteNode';

/* =========================================================================
   10. Delay Node (ANSI Flowchart Delay Symbol - D-shape flat left, rounded right)
   ========================================================================= */
export const DelayNode = memo(({ data, selected }) => {
  const strokeColor = selected ? '#2563eb' : (data.border || '#cbd5e1');
  const fillColor = selected ? '#f8fafc' : (data.bg || '#f8fafc');

  return (
    <div
      className="flex items-center justify-between px-14 relative cursor-pointer"
      style={{
        width: 210,
        height: 50,
        borderRadius: '6px 26px 26px 6px',
        background: fillColor,
        border: `1.5px solid ${strokeColor}`,
        boxShadow: selected
          ? '0 0 0 3px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.15s ease',
      }}
    >
      <NodeHandles data={data} top={-4} bottom={-4} left={-4} right={-4} />
      <NodeInner data={data} maxWidth="130px" />
      <div className="flex items-center justify-center text-gray" style={{ width: 16, opacity: 0.6 }}>
        <Icon name="MoreVertical" width="13" height="13" stroke="#64748b" />
      </div>
    </div>
  );
});
DelayNode.displayName = 'DelayNode';

/* =========================================================================
   WorkflowNode: Master Dynamic Dispatcher
   Inspects data.nodeType / data.shape and renders the appropriate flowchart shape
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

export default memo(WorkflowNode);
