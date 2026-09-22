import React, { useEffect, useState, useRef } from 'react';

const Cursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const isHoveredRef = useRef(false);

    useEffect(() => {
        const checkMobile = () => typeof window !== 'undefined' && (
            window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth <= 1024
        );

        if (checkMobile()) return;

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            const isInteractive = !!target.closest(
                'a, button, input, select, textarea, label, summary, [role="button"], [role="tab"], .interactive, [class*="cursor-pointer"]'
            );
            if (isHoveredRef.current !== isInteractive) {
                isHoveredRef.current = isInteractive;
                setIsHovered(isInteractive);
            }
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => !checkMobile() && setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        let rafId;
        const animate = () => {
            ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.18;
            ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.18;

            const scaleRing = isHoveredRef.current ? 1.5 : 1;
            const scaleDot = isHoveredRef.current ? 0.6 : 1;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRing})`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleDot})`;
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="sm-hidden md-hidden"
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                overflow: 'hidden'
            }}
        >
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '44px',
                    height: '44px',
                    backgroundColor: isHovered ? 'rgba(73, 186, 166, 0.25)' : 'rgba(73, 186, 166, 0.12)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    willChange: 'transform',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease'
                }}
            />

            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1000000,
                    willChange: 'transform',
                    transition: 'background-color 0.3s ease'
                }}
            />
        </div>
    );
};

export default Cursor;