import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useReactFlow, useViewport } from '@xyflow/react';
import Button from '../../common/Button';
import Dropdown from '../../common/Dropdown';
import Icon from '../../common/Icon';

/* --- Base Toolbar (Presentational with Dropdown & Buttons) --- */
export const BaseToolbar = memo(({
  zoomPercent = 100,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitView,
  fitViewTitle = 'Fit View',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsMenuOpen(false), []);

  const handleZoomIn = useCallback(() => {
    onZoomIn?.();
    setIsMenuOpen(false);
  }, [onZoomIn]);

  const handleZoomOut = useCallback(() => {
    onZoomOut?.();
    setIsMenuOpen(false);
  }, [onZoomOut]);

  const handleResetZoom = useCallback(() => {
    onResetZoom?.();
    setIsMenuOpen(false);
  }, [onResetZoom]);

  const handleFitView = useCallback(() => {
    onFitView?.();
    setIsMenuOpen(false);
  }, [onFitView]);

  const zoomItems = useMemo(
    () => [
      { label: 'Zoom In (+)', onClick: handleZoomIn },
      { label: 'Zoom Out (-)', onClick: handleZoomOut },
      ...(onResetZoom ? [{ label: 'Reset (100%)', onClick: handleResetZoom }] : []),
      { label: fitViewTitle, onClick: handleFitView },
    ],
    [handleZoomIn, handleZoomOut, handleResetZoom, handleFitView, fitViewTitle]
  );

  return (
    <div
      className="flex items-center bg-white rounded-8 px-6 py-4 absolute top-0 left-0 m-12 z-888 border-ec b-shadow"
    >
      <div className="relative">
        <Button
          version="none"
          bg="transparent"
          color="dark"
          onClick={toggleMenu}
          className="flex items-center gap-4 px-6 py-4 rounded-6 border-0 font-600 mini-text text-dark cursor-pointer"
        >
          <span>{zoomPercent}%</span>
          <Icon
            name="ChevronDown"
            width="11"
            height="11"
            stroke="#64748b"
            style={{
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '0.2s',
            }}
          />
        </Button>

        <Dropdown
          isOpen={isMenuOpen}
          onClose={handleClose}
          items={zoomItems}
          minWidth="120px"
        />
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />

      {/* Fit View Screen Button */}
      <Button
        version="icon"
        icon="Screen"
        iconWidth="14"
        iconHeight="14"
        bg="transparent"
        color="dark"
        onClick={handleFitView}
        className="p-6 rounded-6 border-0"
        title={fitViewTitle}
      />
    </div>
  );
});
BaseToolbar.displayName = 'BaseToolbar';

/* --- Inner ReactFlow Toolbar (Used by Home.jsx inside ReactFlow) --- */
const ReactFlowToolbar = memo((props) => {
  const { zoomIn, zoomOut, fitView, zoomTo, setViewport } = useReactFlow();
  const { zoom } = useViewport();
  const [zoomPercent, setZoomPercent] = useState(100);

  useEffect(() => {
    setZoomPercent(Math.round(zoom * 100));
  }, [zoom]);

  const handleZoomIn = useCallback(() => zoomIn({ duration: 250 }), [zoomIn]);
  const handleZoomOut = useCallback(() => zoomOut({ duration: 250 }), [zoomOut]);
  const handleResetZoom = useCallback(() => {
    if (typeof zoomTo === 'function') zoomTo(1, { duration: 250 });
    else if (typeof setViewport === 'function') setViewport({ x: 0, y: 0, zoom: 1 });
  }, [zoomTo, setViewport]);
  const handleFitView = useCallback(() => fitView({ padding: 0.15, duration: 350 }), [fitView]);

  return (
    <BaseToolbar
      zoomPercent={zoomPercent}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onResetZoom={handleResetZoom}
      onFitView={handleFitView}
      fitViewTitle="Fit View"
      {...props}
    />
  );
});
ReactFlowToolbar.displayName = 'ReactFlowToolbar';

/* --- Master Dynamic CanvasToolbar (Supports both ReactFlow and Leaflet Map) --- */
const CanvasToolbar = (props) => {
  if (props.onZoomIn || props.onFitView || props.zoomPercent !== undefined) {
    return <BaseToolbar {...props} />;
  }
  return <ReactFlowToolbar {...props} />;
};

export default memo(CanvasToolbar);
