import React, { useEffect, useRef } from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';

const columnsData = [
    [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
    ],
    [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    ],
    [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'
    ]
];

const FeatureSections = () => {
    const colsRef = useRef([]);

    useEffect(() => {
        let frame;
        const initialPositions = [-720, -20, -520];

        const onScroll = () => {
            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                const y = window.scrollY;

                colsRef.current.forEach((col, i) => {
                    if (!col) return;

                    const initialY = initialPositions[i];

                    const movement =
                        y * (i === 1 ? -0.12 : 0.08);

                    col.style.transform =
                        `translate3d(0, ${initialY + movement}px, 0)`;
                });
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <Container className='relative h-550 sm-h-400 overflow-hidden' style={{ background: 'var(--dark)' }}>
            <div className="flex items-center h-full">
                <div className="w-50 sm-w-full relative z-20">
                    <p className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-600 uppercase mb-18">
                        <Icon name="Settings" width="14" height="14" className="text-primary" />
                        NO.1 SOFTWARE COMPANY
                    </p>
                    <h3 className='text-white large-text font-600'>
                        Delivering Innovative IT solutions Empower In Businesses.
                    </h3>
                    <p className='text-white para-text text-muted font-500 mt-18'>
                        Empowering enterprises with tailored financial insights and measurable growth strategies.
                    </p>
                </div>

                <div className="absolute top-0 right-0 h-full w-60 sm-w-full z-10">
                    <div
                        className="flex gap-12"
                        style={{
                            transform: 'rotate(-20deg) scale(1.15)',
                            transformOrigin: 'top right'
                        }}
                    >
                        {columnsData.map((column, colIdx) => (
                            <div
                                key={colIdx}
                                ref={(el) => { colsRef.current[colIdx] = el; }}
                                className="grid-cols-1 gap-12 w-full"
                                style={{ willChange: 'transform' }}
                            >
                                {column.map((img, imgIdx) => (
                                    <div key={imgIdx} className="relative overflow-hidden h-250 sm-h-200">
                                        <Image
                                            src={img}
                                            alt="Feature Showcase"
                                            className="w-full h-full object-cover flex filter-b4"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default FeatureSections;