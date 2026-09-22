import React, { useState, useEffect } from 'react';
import { useReactFlow, useViewport } from '@xyflow/react';
import Icon from '../../components/common/Icon';

const CanvasToolbar = ({ onUndo, onRedo, canUndo = false, canRedo = false }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();
  const [zoomPercent, setZoomPercent] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setZoomPercent(Math.round(zoom * 100));
  }, [zoom]);

  return (
    <div
      className="flex items-center bg-white rounded-8 px-6 py-4 relative"
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        width: 'fit-content',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        border: '1px solid #e2e8f0',
        gap: '6px',
      }}
    >
      {/* Undo */}
      <button
        type="button"
        onClick={onUndo}
        className="flex items-center justify-center p-6 rounded-6 cursor-pointer bg-transparent"
        style={{
          border: 'none',
          color: canUndo ? '#334155' : '#94a3b8',
          opacity: canUndo ? 1 : 0.6,
        }}
        title="Undo"
      >
        <Icon name="ArrowLeft" width="14" height="14" stroke="currentColor" />
      </button>

      {/* Redo */}
      <button
        type="button"
        onClick={onRedo}
        className="flex items-center justify-center p-6 rounded-6 cursor-pointer bg-transparent"
        style={{
          border: 'none',
          color: canRedo ? '#334155' : '#94a3b8',
          opacity: canRedo ? 1 : 0.6,
        }}
        title="Redo"
      >
        <Icon name="ArrowRight" width="14" height="14" stroke="currentColor" />
      </button>

      {/* Separator */}
      <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />

      {/* Zoom indicator / dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center gap-4 px-6 py-4 rounded-6 cursor-pointer bg-transparent"
          style={{
            border: 'none',
            fontSize: '11.5px',
            fontWeight: 600,
            color: '#334155',
          }}
        >
          <span>{zoomPercent}%</span>
          <Icon name="ChevronDown" width="11" height="11" stroke="#64748b" />
        </button>

        {isMenuOpen && (
          <div
            className="flex flex-column bg-white rounded-8 py-4"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              zIndex: 50,
              minWidth: 100,
            }}
          >
            <button
              type="button"
              onClick={() => {
                zoomIn();
                setIsMenuOpen(false);
              }}
              className="px-12 py-6 text-left cursor-pointer bg-transparent"
              style={{ border: 'none', fontSize: '11.5px', color: '#1e293b' }}
            >
              Zoom In (+)
            </button>
            <button
              type="button"
              onClick={() => {
                zoomOut();
                setIsMenuOpen(false);
              }}
              className="px-12 py-6 text-left cursor-pointer bg-transparent"
              style={{ border: 'none', fontSize: '11.5px', color: '#1e293b' }}
            >
              Zoom Out (-)
            </button>
            <button
              type="button"
              onClick={() => {
                fitView();
                setIsMenuOpen(false);
              }}
              className="px-12 py-6 text-left cursor-pointer bg-transparent"
              style={{ border: 'none', fontSize: '11.5px', color: '#1e293b' }}
            >
              Reset (100%)
            </button>
          </div>
        )}
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />

      {/* Fit View / Fullscreen icon */}
      <button
        type="button"
        onClick={() => fitView({ padding: 0.2, duration: 400 })}
        className="flex items-center justify-center p-6 rounded-6 cursor-pointer bg-transparent"
        style={{ border: 'none', color: '#334155' }}
        title="Fit View"
      >
        <Icon name="Screen" width="14" height="14" stroke="currentColor" />
      </button>
    </div>
  );
};

export default React.memo(CanvasToolbar);
