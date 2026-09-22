import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Fields from '../../components/forms/Fields';
import Icon from '../../components/common/Icon';
import { DeleteModal } from '../../components/common/Modal';

const INITIAL_STOPS = [
  { id: 1, title: 'Ahmedabad Plant', calloutTitle: 'Ahmedabad Plant', location: 'Vatva GIDC, Ahmedabad, GJ', role: 'Manufacturer', badge: 'Manufacturer', badgeColor: 'success', color: '#10b981', lat: 22.9623, lng: 72.6393 },
  { id: 2, title: 'Indore Warehouse', calloutTitle: 'Indore Warehouse', location: 'Pithampur Industrial Area, MP', role: 'Distributor', badge: 'Distributor', badgeColor: 'purple', color: '#8b5cf6', lat: 22.6174, lng: 75.6022 },
  { id: 3, title: 'Nagpur Sales Office', calloutTitle: 'Nagpur Sales Office', location: 'Wardha Road, Nagpur, MH', role: 'Sales rep', badge: 'Sales rep', badgeColor: 'primary', color: '#3b82f6', lat: 21.1458, lng: 79.0882 },
  { id: 4, title: 'Hyderabad Hub', calloutTitle: 'Hyderabad Hub', location: 'Patancheru, Hyderabad, TS', role: 'Distributor', badge: 'Distributor', badgeColor: 'warning', color: '#f97316', lat: 17.5256, lng: 78.2687 },
  { id: 5, title: 'Bengaluru Enterprise', calloutTitle: 'Bengaluru Customer', location: 'Electronic City, Bengaluru, KA', role: 'Enterprise account', badge: 'Customer', badgeColor: 'danger', color: '#f43f5e', lat: 12.8452, lng: 77.6602 },
  { id: 6, title: 'Chennai Support', calloutTitle: 'Chennai Support', location: 'Guindy Industrial Estate, Chennai, TN', role: 'Post-sale support', badge: 'Support', badgeColor: 'info', color: '#06b6d4', lat: 13.0067, lng: 80.2206 },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const JourneyStats = memo(({ stopsCount, totalKm, isPinMode, onTogglePin }) => (
  <div className="mt-10">
    <Button
      text={isPinMode ? 'Click on map to drop pin' : 'Pin New Location'}
      version="v3"
      bg={isPinMode ? 'info' : 'primary'}
      color="white"
      onClick={onTogglePin}
    />
  </div>
));
JourneyStats.displayName = 'JourneyStats';

const StopCard = memo(({ stop, isSelected, onSelect, onDelete }) => (
  <div
    onClick={() => onSelect(stop)}
    className={`p-12 rounded-5 ${isSelected ? 'bg-primary' : 'bg-white'
      }`}
    style={{
      border: `0.5px solid ${isSelected ? 'var(--forth)' : 'var(--white)'}`
    }}
  >
    <div className="flex items-center gap-10 overflow-hidden">
      <div className='w-15'>
        <div className='icon-lg bg-forth rounded-5'>
          <p className='text-primary font-500 para-text'> {stop.id}</p></div>
      </div>
      <div className="w-85">
        <h6 className={`font-500 headmini-text line-clamp1 text-${isSelected ? 'white' : 'dark'}`}>
          {stop.title}
        </h6>
        <p className={`font-300 text-muted mini-text text-${isSelected ? 'white' : 'dark'}`}>
          {stop.location}
        </p>
      </div>
    </div>
  </div>
));
StopCard.displayName = 'StopCard';

/* --- Memoized Map Toolbar --- */
const MapToolbar = memo(({ zoomPercent, isZoomOpen, onToggleZoom, onZoomIn, onZoomOut, onFitBounds }) => (
  <div
    className="flex items-center bg-white rounded-8 px-6 py-4 border-ec absolute"
    style={{
      top: 16,
      left: 16,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      gap: '6px',
    }}
  >
    <Button
      version="icon"
      icon="ArrowLeft"
      bg="transparent"
      color="gray"
      className="p-6 rounded-6 border-0"
      title="Undo"
    />
    <Button
      version="icon"
      icon="ArrowRight"
      bg="transparent"
      color="gray"
      className="p-6 rounded-6 border-0"
      title="Redo"
    />
    <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
    <div className="relative">
      <button
        type="button"
        onClick={onToggleZoom}
        className="flex items-center gap-4 px-6 py-4 rounded-6 cursor-pointer bg-transparent border-0 font-600 mini-text text-dark"
      >
        <span>{zoomPercent}%</span>
        <Icon name="ChevronDown" width={11} height={11} stroke="#64748b" />
      </button>
      {isZoomOpen && (
        <div
          className="flex flex-column bg-white rounded-8 py-4 border-ec absolute"
          style={{
            top: 'calc(100% + 6px)',
            left: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1100,
            minWidth: 100,
          }}
        >
          <button
            type="button"
            onClick={onZoomIn}
            className="px-12 py-6 text-left cursor-pointer bg-transparent border-0 mini-text text-dark hover-bg-forth"
          >
            Zoom In (+)
          </button>
          <button
            type="button"
            onClick={onZoomOut}
            className="px-12 py-6 text-left cursor-pointer bg-transparent border-0 mini-text text-dark hover-bg-forth"
          >
            Zoom Out (-)
          </button>
          <button
            type="button"
            onClick={onFitBounds}
            className="px-12 py-6 text-left cursor-pointer bg-transparent border-0 mini-text text-dark hover-bg-forth"
          >
            Fit Route
          </button>
        </div>
      )}
    </div>
    <div style={{ width: 1, height: 16, background: '#e2e8f0' }} />
    <Button
      version="icon"
      icon="Screen"
      bg="transparent"
      color="dark"
      className="p-6 rounded-6 border-0"
      onClick={onFitBounds}
      title="Fit Route to View"
    />
  </div>
));
MapToolbar.displayName = 'MapToolbar';

/* --- Memoized Route Legend --- */
const RouteLegend = memo(() => (
  <div
    className="flex flex-column bg-white rounded-8 p-12 border-ec absolute"
    style={{
      bottom: 24,
      left: 24,
      zIndex: 1000,
      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
      minWidth: 150,
    }}
  >
    <span className="font-600 text-dark mini-text mb-8">Route legend</span>
    <div className="flex items-center gap-8 mb-6">
      <span style={{ width: 16, height: 3, background: '#2563eb', borderRadius: 2 }} />
      <span className="mini-text text-gray">Active journey path</span>
    </div>
    <div className="flex items-center gap-8 mb-6">
      <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%' }} />
      <span className="mini-text text-gray">Manufacturer</span>
    </div>
    <div className="flex items-center gap-8">
      <span style={{ width: 8, height: 8, background: '#f43f5e', borderRadius: '50%' }} />
      <span className="mini-text text-gray">Customer</span>
    </div>
  </div>
));
RouteLegend.displayName = 'RouteLegend';

const Track = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

  const [stops, setStops] = useState(INITIAL_STOPS);
  const [selectedStopId, setSelectedStopId] = useState(1);
  const [search, setSearch] = useState('');
  const [isPinMode, setIsPinMode] = useState(false);
  const [stopToDelete, setStopToDelete] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [isZoomMenuOpen, setIsZoomMenuOpen] = useState(false);

  const totalJourneyKm = useMemo(() => {
    if (stops.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      total += calculateDistance(stops[i].lat, stops[i].lng, stops[i + 1].lat, stops[i + 1].lng);
    }
    return Math.round(total);
  }, [stops]);

  const filteredStops = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return stops;
    return stops.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
    );
  }, [stops, search]);

  const handleSelectStop = useCallback((stop) => {
    setSelectedStopId(stop.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([stop.lat, stop.lng], Math.max(7, mapInstanceRef.current.getZoom()), {
        duration: 1.2,
      });
    }
  }, []);

  const handleFitBounds = useCallback(() => {
    if (!mapInstanceRef.current || stops.length === 0) return;
    const latLngs = stops.map((s) => [s.lat, s.lng]);
    const bounds = L.latLngBounds(latLngs);
    mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
  }, [stops]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [18.5, 76.5],
      zoom: 5,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      subdomains: ['a', 'b', 'c'],
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    const initialBounds = L.latLngBounds(INITIAL_STOPS.map((s) => [s.lat, s.lng]));
    map.fitBounds(initialBounds, { padding: [50, 50], maxZoom: 6 });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const onMapClick = (e) => {
      if (!isPinMode) return;
      const newId = stops.length + 1;
      const newStop = {
        id: newId,
        title: `Waypoint ${newId}`,
        calloutTitle: `Stop ${newId}`,
        location: `Lat: ${e.latlng.lat.toFixed(3)}, Lng: ${e.latlng.lng.toFixed(3)}`,
        role: 'Transit Stop',
        badge: 'Stop',
        badgeColor: 'primary',
        color: '#3b82f6',
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setStops((prev) => [...prev, newStop]);
      setSelectedStopId(newId);
      setIsPinMode(false);
    };

    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [isPinMode, stops.length]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    polylinesRef.current.forEach((p) => map.removeLayer(p));
    polylinesRef.current = [];

    if (stops.length >= 2) {
      const latLngs = stops.map((s) => [s.lat, s.lng]);

      const outerLine = L.polyline(latLngs, {
        color: '#bfdbfe',
        weight: 6,
        opacity: 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      const coreLine = L.polyline(latLngs, {
        color: '#2563eb',
        weight: 2.5,
        dashArray: '6, 8',
        opacity: 0.95,
      }).addTo(map);

      polylinesRef.current = [outerLine, coreLine];
    }

    stops.forEach((stop) => {
      const isSelected = stop.id === selectedStopId;

      const customIcon = L.divIcon({
        className: 'custom-journey-marker-container',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto;">
            <div style="
              background: #ffffff;
              padding: 4px 12px;
              border-radius: 6px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.12);
              border: 1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'};
              text-align: center;
              white-space: nowrap;
              margin-bottom: 6px;
              transition: all 0.2s ease;
              transform: ${isSelected ? 'scale(1.05)' : 'scale(1)'};
            ">
              <div style="font-weight: 600; font-size: 11px; color: #0f172a; line-height: 14px;">${stop.calloutTitle || stop.title}</div>
              <div style="font-size: 8.5px; color: #64748b; line-height: 11px;">${stop.role}</div>
            </div>
            <div style="
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: ${stop.color};
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-size: 10.5px;
              border: 2px solid #ffffff;
              box-shadow: 0 0 0 ${isSelected ? '3px #2563eb' : '2px rgba(0,0,0,0.15)'};
              transition: all 0.2s ease;
            ">
              ${stop.id}
            </div>
          </div>
        `,
        iconSize: [140, 64],
        iconAnchor: [70, 64],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: customIcon }).addTo(map);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelectedStopId(stop.id);
      });

      markersRef.current.push(marker);
    });
  }, [stops, selectedStopId]);

  const confirmDeleteStop = useCallback(() => {
    if (!stopToDelete) return;
    setStops((prev) => {
      const next = prev.filter((s) => s.id !== stopToDelete.id);
      return next.map((s, idx) => ({ ...s, id: idx + 1 }));
    });
    setSelectedStopId((prev) => (prev === stopToDelete.id ? 1 : prev));
    setStopToDelete(null);
  }, [stopToDelete]);

  return (
    <Container>
      <div className="flex w-full gap-12 overflow-hidden relative" style={{ height: '87vh' }}>
        <div
          className="w-25 h-full bg-white"
        >
          <div className="p-10">
            <Fields
              type="input"
              icon="Search"
              iconPosition="left"
              placeholder="Search locations..."
              value={search}
              onChange={setSearch}
              className="w-full"
            />

            <JourneyStats
              stopsCount={stops.length}
              totalKm={totalJourneyKm}
              isPinMode={isPinMode}
              onTogglePin={() => setIsPinMode((prev) => !prev)}
            />

            <div className="flex items-center justify-between mt-12">
              <h4 className="font-500 text-dark headmini-text">Journey</h4>
              <p className="font-400 text-gray mini-text">{filteredStops.length} stops</p>
            </div>

            <div className='mt-10 h-400 bg-forth p-12 rounded-5 overflow-auto grid-cols-1 gap-6'>
              {filteredStops.map((stop) => (
                <StopCard
                  key={stop.id}
                  stop={stop}
                  isSelected={stop.id === selectedStopId}
                  onSelect={handleSelectStop}
                  onDelete={setStopToDelete}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-75 h-full relative bg-forth">
          <div ref={mapContainerRef} className="w-full h-full" />
          <MapToolbar
            zoomPercent={Math.round((zoomLevel / 6) * 100)}
            isZoomOpen={isZoomMenuOpen}
            onToggleZoom={() => setIsZoomMenuOpen((prev) => !prev)}
            onZoomIn={() => {
              mapInstanceRef.current?.zoomIn();
              setIsZoomMenuOpen(false);
            }}
            onZoomOut={() => {
              mapInstanceRef.current?.zoomOut();
              setIsZoomMenuOpen(false);
            }}
            onFitBounds={() => {
              handleFitBounds();
              setIsZoomMenuOpen(false);
            }}
          />

          <RouteLegend />
        </div>
      </div>

      <DeleteModal
        isOpen={Boolean(stopToDelete)}
        onClose={() => setStopToDelete(null)}
        onDelete={confirmDeleteStop}
        title="Remove Location Stop"
        message={`Are you sure you want to remove "${stopToDelete?.title}" from the journey? The route will be recalculated.`}
      />
    </Container>
  );
};

export default memo(Track);
