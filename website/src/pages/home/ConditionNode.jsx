import React from 'react';
import { Handle, Position } from '@xyflow/react';
import Icon from '../../components/common/Icon';

const ConditionNode = ({ id, data, selected }) => {
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
      {/* SVG Diamond Shape Background */}
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

      {/* Handles at the vertices */}
      {/* Top Handle (Target) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: data.color || '#f97316',
          width: 7,
          height: 7,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}
      />

      {/* Left Handle (Source: No) */}
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          background: data.color || '#f97316',
          width: 7,
          height: 7,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
        }}
      />

      {/* Right Handle (Source: Yes) */}
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{
          background: data.color || '#f97316',
          width: 7,
          height: 7,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          zIndex: 5,
        }}
      />

      {/* Content inside the Diamond (centered upright) */}
      <div
        className="flex flex-column items-center justify-center relative"
        style={{
          zIndex: 2,
          padding: '0 18px',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Top Icon in circle */}
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{
            width: 24,
            height: 24,
            background: data.color || '#f97316',
            color: '#ffffff',
          }}
        >
          <Icon name="Sparkles" width="13" height="13" stroke="#ffffff" />
        </div>

        {/* Title */}
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

        {/* Subtitle */}
        <span
          className="text-gray"
          style={{
            fontSize: '8.5px',
            lineHeight: '11px',
            maxWidth: '125px',
          }}
        >
          {data.subtitle}
        </span>
      </div>
    </div>
  );
};

export default React.memo(ConditionNode);
