import React from 'react';
import counterBg from '../../../assets/counter-bg.jpg';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import { patchCMS } from '../../../utils/apiData';

const PatchSection = () => {
    return (
        <Container
            className="relative z-10"
            style={{
                background: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${counterBg}) center/cover no-repeat`,
                backgroundPosition: 'center',
                willChange: 'transform'
            }}
        >
            <div className='w-full py-100 sm-py-50'>
                <div className="w-70 sm-w-full">
                    <p className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-600 uppercase mb-18">
                        <Icon name="Settings" width="14" height="14" className="text-primary" />
                        {patchCMS.badge}
                    </p>
                    <h3 className='text-white large-text font-600'>
                        {patchCMS.title}
                    </h3>

                    <p className='text-white para-text text-muted font-400 mt-18 sm-mt-6'>
                        {patchCMS.description}
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(PatchSection);
