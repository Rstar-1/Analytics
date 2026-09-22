import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Heading from '../../../components/layout/generic/Heading';
import Button from '../../../components/common/Button';
import { aboutCMS } from '../../../utils/apiData';

const renderCodeTokens = (code) => {
    if (!code) return null;
    const parts = code.split(/(\b(?:val|let|const|await|new|auto|import|export|default|function|return|interface|type)\b|\b(?:ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency)\b|\([^)]*\))/g);
    return parts.map((part, i) => {
        if (/^(val|let|const|await|new|auto|import|export|default|function|return|interface|type)$/.test(part)) {
            return <span key={i} style={{ color: '#94a3b8' }}>{part} </span>;
        }
        if (/^(ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency)$/.test(part)) {
            return <span key={i} style={{ color: '#f43f5e' }}>{part}</span>;
        }
        if (part.startsWith('(') && part.endsWith(')')) {
            return (
                <span key={i} style={{ color: '#f1f5f9' }}>
                    (<span style={{ color: '#c084fc' }}>{part.slice(1, -1)}</span>)
                </span>
            );
        }
        return <span key={i} style={{ color: '#f1f5f9' }}>{part}</span>;
    });
};

const AboutSections = () => {
    const navigate = useNavigate();
    const [activePlatform, setActivePlatform] = useState(aboutCMS.platforms?.[0] || 'Next.js');

    return (
        <Container>
            <div className="py-40 w-full">
                <Heading
                    version="v1"
                    tag={aboutCMS.heading.tag}
                    title={aboutCMS.heading.title}
                    className="mb-48 sm-mb-30"
                />

                <div className="w-full flex sm-grid-cols-1 items-start gap-12">
                    <div className="sticky sm-relative overflow-hidden top-0 left-0 w-65 sm-w-full">
                        <div className="flex sm-grid-cols-1 items-end p-30 rounded-10 overflow-hidden bg-dark" style={{ gap: '20px' }}>
                            <div className='w-55 sm-w-full'>
                                <div className='icon-lg bg-white rounded-full'>
                                    <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--dark)" strokeWidth="2.5" />
                                </div>

                                <h3 className="text-white font-600 head-text uppercase mt-20">
                                    {aboutCMS.crafter.title}
                                </h3>

                                <p className="text-white small-text text-muted font-400 mt-2">
                                    {aboutCMS.crafter.subtitle}
                                </p>

                                <div className="mt-30 grid grid-cols-1" style={{ gap: '16px' }}>
                                    {aboutCMS.crafter.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-12 mb-10">
                                            <div className='w-10 mt-5 flex justify-center'>
                                                <div className='icon flex items-center justify-center bg-white rounded-full'>
                                                    <Icon name="Check" width="16" height="16" stroke="var(--dark)" strokeWidth="3" />
                                                </div>
                                            </div>

                                            <div className='w-90'>
                                                <h4 className="text-white capitalize font-600 title-text">
                                                    {feat.title}
                                                </h4>
                                                <p className="mt-8 text-muted mini-text text-white font-300">
                                                    {feat.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    text={aboutCMS.crafter.buttonText}
                                    version="v2"
                                    bg="white"
                                    color="dark"
                                    className="rounded-6 font-600 mt-36"
                                    onClick={() => navigate('/services')}
                                />
                            </div>

                            <div className='w-45 sm-w-full'>
                                <div className="relative w-full mx-auto overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                                        alt="Video Caller"
                                        className="w-full h-250 rounded-5 object-cover flex"
                                    />

                                    <div className="rounded-5 overflow-hidden absolute top-0 right-0 m-8">
                                        <Image
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                            alt="PIP Caller"
                                            width='50px'
                                            height='50px'
                                            className="flex object-cover"
                                        />
                                    </div>

                                    <div className="absolute bottom-0 mb-10 w-full flex items-center justify-center gap-12">
                                        <div className="rounded-full icon-lg bg-dark">
                                            <Icon name="Video" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                        </div>
                                        <div className="rounded-full icon-lg bg-danger">
                                            <Icon name="Hangup" width="20" height="20" fill="var(--white)" />
                                        </div>
                                        <div className="rounded-full icon-lg bg-dark">
                                            <Icon name="Volume" width="18" height="18" stroke="var(--white)" fill="var(--white)" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full relative overflow-hidden bg-dark border-gray rounded-5 mt-12">
                                    <div className="flex items-center gap-6 px-14 py-8 bordb">
                                        {aboutCMS.platforms.map((plat) => {
                                            const isActive = activePlatform === plat;
                                            return (
                                                <p
                                                    key={plat}
                                                    onClick={() => setActivePlatform(plat)}
                                                    className="cursor-pointer mini-text font-400 px-6"
                                                    style={{
                                                        color: isActive ? 'var(--white)' : 'var(--gray)',
                                                    }}
                                                >
                                                    {plat}
                                                </p>
                                            );
                                        })}
                                    </div>

                                    {/* Code Snippet Box */}
                                    <div
                                        className="p-14"
                                        style={{
                                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                            fontSize: '10.8px',
                                            lineHeight: '1.7',
                                            overflowX: 'hidden'
                                        }}
                                    >
                                        {(aboutCMS.codeSnippets[activePlatform] || aboutCMS.codeSnippets[aboutCMS.platforms?.[0]] || []).map((item) => (
                                            <div key={item.num} className="flex items-center gap-10 whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span style={{ color: '#475569', width: '12px', textAlign: 'right', flexShrink: 0, userSelect: 'none' }}>
                                                    {item.num}
                                                </span>
                                                <span className="overflow-hidden text-ellipsis">
                                                    {renderCodeTokens(item.code)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-10px',
                                width: '180px',
                                height: '180px',
                                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.7) 0%, rgba(236, 72, 153, 0.7) 50%, rgba(249, 115, 22, 0.7) 100%)',
                                filter: 'blur(32px)',
                                opacity: 0.65,
                                pointerEvents: 'none',
                                zIndex: 1
                            }}
                        />
                    </div>

                    <div className="w-35 sm-w-full grid-cols-1 gap-12">
                        {aboutCMS.racers.map((racer) => (
                            <div key={racer.id} className='p-25 bg-tertiary rounded-10 relative overflow-hidden'>
                                <div className='icon-lg bg-dark rounded-full'>
                                    <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--white)" strokeWidth="2.5" />
                                </div>

                                <h3 className="text-dark font-600 head-text uppercase mt-12">
                                    {racer.title}
                                </h3>
                                <p className="text-gray small-text text-muted font-400 mt-4">
                                    {racer.subtitle}
                                </p>
                                <p className="text-dark small-text text-muted font-400 mt-20">
                                    {racer.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutSections;
