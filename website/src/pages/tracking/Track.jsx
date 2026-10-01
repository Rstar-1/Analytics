import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Fields from '../../components/forms/Fields';
import Icon from '../../components/common/Icon';
import { DeleteModal } from '../../components/common/Modal';
import CanvasToolbar from '../../components/layout/generic/CanvasToolbar';
import {
  INITIAL_TRACKING_DATA,
  getEffectiveCoordinates,
} from './trackingData';

/* --- Single unified Location Card matching design --- */
const LocationCard = memo(({ item, isSelected, onSelect, onDelete, isDrillable }) => (
  <div
    onClick={() => onSelect(item)}
    className={`p-10 rounded-5 mb-5 cursor-pointer transition-all ${isSelected ? 'bg-primary' : 'bg-white hover:bg-slate-50'
      }`}
    style={{
      border: `0.5px solid ${isSelected ? 'var(--forth)' : 'var(--white)'}`,
    }}
  >
    <div className="flex items-center gap-10 overflow-hidden">
      <div className="w-15 flex-shrink-0">
        <div
          className={`icon-lg rounded-5 flex items-center justify-center ${isSelected ? 'bg-white' : 'bg-forth'
            }`}
        >
          <p className="font-600 para-text text-primary">
            {item.displayIndex}
          </p>
        </div>
      </div>

      <div className="w-85 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4">
          <h6
            className={`font-600 headmini-text line-clamp1 ${isSelected ? 'text-white' : 'text-dark'
              }`}
          >
            {item.name || item.title}
          </h6>
        </div>
        <p
          className={`font-400 mini-text line-clamp1 mt-2 ${isSelected ? 'text-white opacity-90' : 'text-gray'
            }`}
        >
          {item.subtitle}
        </p>
      </div>

      {isDrillable ? (
        <div className="flex items-center pr-4">
          <Icon
            name="ChevronRight"
            width="14"
            height="14"
            stroke={isSelected ? '#ffffff' : '#94a3b8'}
          />
        </div>
      ) : onDelete ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item);
          }}
          className={`border-0 bg-transparent p-4 cursor-pointer rounded-4 opacity-60 hover:opacity-100 ${isSelected ? 'text-white' : 'text-gray hover:text-danger'
            }`}
          title="Remove Stop"
        >
          <Icon name="Trash" width="13" height="13" stroke="currentColor" />
        </button>
      ) : null}
    </div>
  </div>
));
LocationCard.displayName = 'LocationCard';

/* --- Route Legend --- */
const RouteLegend = memo(({ level, isCountryMode }) => (
  <div
    className="grid-cols-1 bg-white rounded-8 p-12 z-999 bottom-0 left-0 m-12 b-shadow rounded-5 absolute"
    style={{ minWidth: 150 }}
  >
    <h6 className="font-600 text-dark headmini-text">Route legend</h6>
    <div className="flex items-center gap-8 mt-4">
      <div className="w-10 flex justify-center">
        <span style={{ width: 16, height: 3, background: '#2563eb', borderRadius: 2 }} />
      </div>
      <p className="mini-text text-gray">Journey Path</p>
    </div>

    {level === 'detail' ? (
      <>
        <div className="flex items-center gap-8 mt-4">
          <div className="w-10 flex justify-center">
            <span style={{ width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />
          </div>
          <p className="mini-text text-gray">Suppliers</p>
        </div>
        <div className="flex items-center gap-8 mt-4">
          <div className="w-10 flex justify-center">
            <span style={{ width: 8, height: 8, background: '#db5e1f', borderRadius: '50%' }} />
          </div>
          <p className="mini-text text-gray">Vendors</p>
        </div>
      </>
    ) : level === 'city' ? (
      <div className="flex items-center gap-8 mt-4">
        <div className="w-10 flex justify-center">
          <span style={{ width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />
        </div>
        <p className="mini-text text-gray">{isCountryMode ? 'City Hubs' : 'Top Cities'}</p>
      </div>
    ) : (
      <div className="flex items-center gap-8 mt-4">
        <div className="w-10 flex justify-center">
          <span style={{ width: 8, height: 8, background: '#db5e1f', borderRadius: '50%' }} />
        </div>
        <p className="mini-text text-gray">{isCountryMode ? 'Countries' : 'States'}</p>
      </div>
    )}
  </div>
));
RouteLegend.displayName = 'RouteLegend';

/* --- Main Track Page Component --- */
const Track = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

  const [trackingData, setTrackingData] = useState(INITIAL_TRACKING_DATA);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [isPinMode, setIsPinMode] = useState(false);
  const [stopToDelete, setStopToDelete] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(6);

  // Active navigation level
  const level = useMemo(() => {
    if (selectedCity) return 'detail';
    if (selectedState) return 'city';
    return 'state';
  }, [selectedState, selectedCity]);

  // Detect if data has countries
  const isCountryMode = useMemo(
    () => trackingData.some((s) => Boolean(s.country)),
    [trackingData]
  );

  // Keep state & city synced with trackingData updates
  useEffect(() => {
    if (selectedState) {
      const freshState = trackingData.find(
        (s) => (s.country || s.state) === (selectedState.country || selectedState.state)
      );
      if (freshState) {
        setSelectedState(freshState);
        if (selectedCity) {
          const freshCity = freshState.cities.find((c) => c.city === selectedCity.city);
          if (freshCity) setSelectedCity(freshCity);
        }
      }
    }
  }, [trackingData]);

  // Transform countries / states into cards
  const stateItems = useMemo(() => {
    return trackingData.map((s, idx) => ({
      id: s.country || s.state,
      name: s.country || s.state,
      title: s.country || s.state,
      subtitle: s.hub?.city
        ? `Hub: ${s.hub.city} • ${s.cities?.length || 1} Hub`
        : `${s.cities?.length || 0} Top Cities`,
      role: s.country ? 'Country' : 'State',
      badge: s.hub?.city || `${s.cities?.length || 0} Cities`,
      displayIndex: idx + 1,
      lat: s.latitude,
      lng: s.longitude,
      color: '#db5e1f',
      raw: s,
    }));
  }, [trackingData]);

  // Transform cities into cards
  const cityItems = useMemo(() => {
    if (!selectedState?.cities) return [];
    return selectedState.cities.map((c, idx) => ({
      id: c.city,
      name: c.city,
      title: c.city,
      subtitle: `${c.suppliers?.length || 0} Suppliers • ${c.vendors?.length || 0} Vendors`,
      role: selectedState.hub?.city === c.city ? 'Primary Hub' : 'City Hub',
      badge: `${(c.suppliers?.length || 0) + (c.vendors?.length || 0)} Entities`,
      displayIndex: idx + 1,
      lat: c.latitude,
      lng: c.longitude,
      color: '#2563eb',
      raw: c,
    }));
  }, [selectedState]);

  // Transform vendors and suppliers of selected city into cards
  const detailItems = useMemo(() => {
    if (!selectedCity) return [];
    const sups = (selectedCity.suppliers || []).map((s, idx) => {
      const coords = getEffectiveCoordinates(
        s,
        idx,
        selectedCity.suppliers.length,
        selectedCity.latitude,
        selectedCity.longitude
      );
      return {
        ...s,
        type: 'supplier',
        role: 'Supplier',
        badge: 'Supplier',
        color: '#2563eb',
        lat: coords.lat,
        lng: coords.lng,
        subtitle: s.location || `${selectedCity.city} • Supplier (${s.id})`,
      };
    });

    const vens = (selectedCity.vendors || []).map((v, idx) => {
      const coords = getEffectiveCoordinates(
        v,
        idx + sups.length,
        sups.length + selectedCity.vendors.length,
        selectedCity.latitude,
        selectedCity.longitude
      );
      return {
        ...v,
        type: 'vendor',
        role: 'Vendor',
        badge: 'Vendor',
        color: '#db5e1f',
        lat: coords.lat,
        lng: coords.lng,
        subtitle: v.location || `${selectedCity.city} • Vendor (${v.id})`,
      };
    });

    let list = [];
    if (activeTab === 'suppliers') list = sups;
    else if (activeTab === 'vendors') list = vens;
    else list = [...sups, ...vens];

    return list.map((item, idx) => ({
      ...item,
      displayIndex: idx + 1,
    }));
  }, [selectedCity, activeTab]);

  // Active items based on level
  const currentItems = useMemo(() => {
    if (level === 'state') return stateItems;
    if (level === 'city') return cityItems;
    return detailItems;
  }, [level, stateItems, cityItems, detailItems]);

  // Filter items by search input
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return currentItems;
    return currentItems.filter((i) =>
      (i.name || i.title || '').toLowerCase().includes(q) ||
      (i.subtitle || '').toLowerCase().includes(q) ||
      (i.id || '').toString().toLowerCase().includes(q) ||
      (i.role || '').toLowerCase().includes(q)
    );
  }, [currentItems, search]);

  // Navigation handlers
  const handleSelectState = useCallback((stateObj) => {
    setSelectedState(stateObj);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleSelectCity = useCallback((cityObj) => {
    setSelectedCity(cityObj);
    const firstStop = cityObj.suppliers?.[0] || cityObj.vendors?.[0];
    setSelectedStopId(firstStop ? firstStop.id : null);
    setSearch('');
    setActiveTab('all');
  }, []);

  const handleBackToStates = useCallback(() => {
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleBackToCities = useCallback(() => {
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleSelectCard = useCallback(
    (item) => {
      if (level === 'state') {
        handleSelectState(item.raw);
      } else if (level === 'city') {
        handleSelectCity(item.raw);
      } else {
        setSelectedStopId(item.id);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([item.lat, item.lng], 15, {
            duration: 1,
          });
        }
      }
    },
    [level, handleSelectState, handleSelectCity]
  );

  const handleFitBounds = useCallback(() => {
    if (!mapInstanceRef.current || currentItems.length === 0) return;
    const bounds = L.latLngBounds(currentItems.map((s) => [s.lat, s.lng]));
    mapInstanceRef.current.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: level === 'detail' ? 14 : 11,
    });
  }, [currentItems, level]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25, 20],
      zoom: 2,
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

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Map markers and polyline renderer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    polylinesRef.current.forEach((p) => map.removeLayer(p));
    polylinesRef.current = [];

    // Render route lines
    if (currentItems.length >= 2) {
      const latLngs = currentItems.map((s) => [s.lat, s.lng]);

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

    // Render custom markers
    currentItems.forEach((item) => {
      const isSelected = item.id === selectedStopId;

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
              <div style="font-weight: 600; font-size: 11px; color: #0f172a; line-height: 14px;">${item.name || item.title}</div>
              <div style="font-size: 8.5px; color: #64748b; line-height: 11px;">${item.role || item.badge || ''}</div>
            </div>
            <div style="
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: ${item.color || '#2563eb'};
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
              ${item.displayIndex}
            </div>
          </div>
        `,
        iconSize: [140, 64],
        iconAnchor: [70, 64],
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (level === 'state') {
          handleSelectState(item.raw);
        } else if (level === 'city') {
          handleSelectCity(item.raw);
        } else {
          setSelectedStopId(item.id);
        }
      });

      markersRef.current.push(marker);
    });

    // Auto fit bounds
    if (currentItems.length > 0) {
      const bounds = L.latLngBounds(currentItems.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: level === 'detail' ? 14 : level === 'city' ? 10 : 5,
      });
    }
  }, [currentItems, selectedStopId, level, handleSelectState, handleSelectCity]);

  // Drop pin handler
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const onMapClick = (e) => {
      if (!isPinMode) return;
      const newId = `PIN-${Date.now().toString().slice(-4)}`;
      const newStop = {
        id: newId,
        name: `Pinned Location`,
        location: `Lat: ${e.latlng.lat.toFixed(3)}, Lng: ${e.latlng.lng.toFixed(3)}`,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        role: 'Custom Stop',
        type: 'supplier',
        color: '#2563eb',
        badge: 'Pinned',
      };

      if (selectedCity) {
        setTrackingData((prev) =>
          prev.map((st) => ({
            ...st,
            cities: st.cities.map((ct) => {
              if (ct.city === selectedCity.city) {
                return {
                  ...ct,
                  suppliers: [newStop, ...(ct.suppliers || [])],
                };
              }
              return ct;
            }),
          }))
        );
        setSelectedStopId(newId);
      }
      setIsPinMode(false);
    };

    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [isPinMode, selectedCity]);

  // Delete stop handler
  const confirmDeleteStop = useCallback(() => {
    if (!stopToDelete || !selectedCity) return;
    setTrackingData((prev) =>
      prev.map((st) => ({
        ...st,
        cities: st.cities.map((ct) => {
          if (ct.city === selectedCity.city) {
            return {
              ...ct,
              suppliers: (ct.suppliers || []).filter((s) => s.id !== stopToDelete.id),
              vendors: (ct.vendors || []).filter((v) => v.id !== stopToDelete.id),
            };
          }
          return ct;
        }),
      }))
    );
    setSelectedStopId((prev) => (prev === stopToDelete.id ? null : prev));
    setStopToDelete(null);
  }, [stopToDelete, selectedCity]);

  return (
    <Container>
      <div className="flex w-full gap-12 overflow-hidden relative" style={{ height: '87vh' }}>
        {/* Left Sidebar */}
        <div className="w-25 h-full bg-white">
          <div className="p-10 overflow-hidden">
            <Fields
              type="input"
              icon="Search"
              iconPosition="left"
              placeholder={
                level === 'state'
                  ? isCountryMode ? 'Search countries...' : 'Search states...'
                  : level === 'city'
                    ? `Search cities in ${selectedState?.country || selectedState?.state}...`
                    : `Search vendors & suppliers...`
              }
              value={search}
              onChange={setSearch}
              className="w-full"
            />

            <div className="mt-10">
              <Button
                text={isPinMode ? 'Click on map to drop pin' : 'Pin New Location'}
                version="v3"
                bg={isPinMode ? 'info' : 'primary'}
                color="white"
                onClick={() => setIsPinMode((prev) => !prev)}
              />
            </div>

            <div className="mt-12 mb-6">
              {level === 'state' ? (
                <div className="flex items-center justify-between">
                  <h4 className="font-500 text-dark headmini-text">
                    {isCountryMode ? 'Select Country' : 'Select State'}
                  </h4>
                  <p className="font-400 text-gray mini-text">
                    {filteredItems.length} {isCountryMode ? 'countries' : 'states'}
                  </p>
                </div>
              ) : level === 'city' ? (
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToStates}
                      className="flex items-center gap-4 text-primary font-500 mini-text bg-transparent border-0 cursor-pointer p-0"
                    >
                      <Icon name="ChevronLeft" width="13" height="13" stroke="currentColor" />
                      <span>{isCountryMode ? 'All Countries' : 'All States'}</span>
                    </button>
                    <p className="font-400 text-gray mini-text">
                      {filteredItems.length} {filteredItems.length === 1 ? 'hub' : 'cities'}
                    </p>
                  </div>
                  <h4 className="font-600 text-dark headmini-text mt-4">
                    {selectedState?.country || selectedState?.state}
                  </h4>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToCities}
                      className="flex items-center gap-4 text-primary font-500 mini-text bg-transparent border-0 cursor-pointer p-0"
                    >
                      <Icon name="ChevronLeft" width="13" height="13" stroke="currentColor" />
                      <span>{selectedState?.country || selectedState?.state}</span>
                    </button>
                    <p className="font-400 text-gray mini-text">{filteredItems.length} stops</p>
                  </div>
                  <h4 className="font-600 text-dark headmini-text mt-4">
                    {selectedCity?.city}
                  </h4>

                  <div className="flex items-center gap-6 mt-8">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'suppliers', label: `Suppliers (${selectedCity?.suppliers?.length || 0})` },
                      { key: 'vendors', label: `Vendors (${selectedCity?.vendors?.length || 0})` },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-8 py-4 rounded-4 mini-text font-500 border-0 cursor-pointer transition-all ${activeTab === tab.key
                          ? 'bg-primary text-white'
                          : 'bg-forth text-dark hover:bg-tertiary'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable list */}
            <div className="mt-8 bg-forth p-10 rounded-5">
              <div className='h-400 overflow-y-auto'>
                {filteredItems.map((item) => (
                  <LocationCard
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedStopId}
                    onSelect={handleSelectCard}
                    onDelete={level === 'detail' ? setStopToDelete : undefined}
                    isDrillable={level !== 'detail'}
                  />
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-20 text-gray mini-text">
                    No locations found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div className="w-75 h-full relative bg-forth">
          <div ref={mapContainerRef} className="w-full h-full" />

          <CanvasToolbar
            zoomPercent={Math.round((zoomLevel / 13) * 100)}
            onZoomIn={() => mapInstanceRef.current?.zoomIn()}
            onZoomOut={() => mapInstanceRef.current?.zoomOut()}
            onResetZoom={handleFitBounds}
            onFitView={handleFitBounds}
            fitViewTitle="Fit Route"
          />

          <RouteLegend level={level} isCountryMode={isCountryMode} />
        </div>
      </div>

      <DeleteModal
        isOpen={Boolean(stopToDelete)}
        onClose={() => setStopToDelete(null)}
        onDelete={confirmDeleteStop}
        title="Remove Location Stop"
        message={`Are you sure you want to remove "${stopToDelete?.name || stopToDelete?.title}" from the journey?`}
      />
    </Container>
  );
};

export default memo(Track);
