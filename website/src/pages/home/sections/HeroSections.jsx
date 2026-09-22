import React from 'react';
import agencyVideo from '../../../assets/agency.mp4';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import { heroCMS } from '../../../utils/apiData';

const HeroSections = () => {
    return (
        <Container version='v0'>
            <div className='relative py-100 w-full'>
                <div
                    className='absolute top-0 left-0 w-full h-full overflow-hidden z-10'
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                >
                    <Image
                        src={agencyVideo}
                        alt="Agency Hero Background Video"
                        className='w-full h-full'
                        preload="auto"
                        style={{
                            objectFit: 'cover',
                            opacity: 0.55,
                            filter: 'brightness(0.75) contrast(1.1)'
                        }}
                    />
                    <div className='absolute w-full h-full top-0 left-0'
                        style={{
                            background: 'radial-gradient(ellipse 85% 75% at 70% 0%, rgba(255, 175, 40, 0.28) 0%, rgba(0, 0, 0, 0.5) 90%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.6) 90%, rgba(10, 10, 10, 0.9) 100%)',
                        }}
                    />
                </div>
                <div className='relative z-10 text-center sm-text-left w-full py-30'>
                    <div className='sm-px-20'>
                        <h1 className='largehead-text text-white'>
                            {heroCMS.titleLine1}
                            <br />
                            {heroCMS.titleLine2}
                            <br />
                            <span className='text-primary'>{heroCMS.titleHighlight}</span>
                        </h1>
                        <div className='flex sm-grid-cols-1 items-center justify-center gap-12 w-full mt-10'>
                            <p style={{ maxWidth: '250px' }} className='mini-text text-right sm-text-left text-white'>
                                {heroCMS.leftText}
                            </p>
                            <h2 className='largehead-text text-white'>{heroCMS.agencyTitle}</h2>
                            <p style={{ maxWidth: '250px' }} className='mini-text text-left text-white'>
                                {heroCMS.rightText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(HeroSections);
