import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Heading from '../../../components/layout/generic/Heading';

const pricingPlans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$49',
        period: '/Month',
        isPopular: false,
        desc: 'Essential digital presence for startups and small businesses.',
        buttonText: 'Get Started Today',
        features: [
            'Basic Website Audit',
            'Responsive UI Design',
            'SEO Metadata Setup',
            'Standard Support (Mon-Fri)',
            '1 Revision Cycle'
        ]
    },
    {
        id: 'essential',
        name: 'Essential',
        price: '$199',
        period: '/Month',
        isPopular: true,
        desc: 'Comprehensive package for growing brands needing active performance.',
        buttonText: 'Get Started Today',
        features: [
            'Custom Web & UI Design',
            'Advanced SEO Optimization',
            '24/7 Uptime Monitoring',
            'Monthly Analytics Report',
            'Priority Email Support'
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        price: '$499',
        period: '/Month',
        isPopular: false,
        desc: 'For scaling businesses requiring custom web apps & growth strategy.',
        buttonText: 'Get Started Today',
        features: [
            'Full-Stack App Development',
            'Custom API Integration',
            'Conversion Rate Optimization',
            'Dedicated Account Manager',
            'Unlimited Minor Tweaks'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$999',
        period: '/Month',
        isPopular: false,
        desc: 'Tailored digital ecosystem with round-the-clock priority SLA.',
        buttonText: 'Get Started Today',
        features: [
            'Bespoke Enterprise Systems',
            'Multi-Platform Integration',
            '24/7 SLA & Incident Team',
            'Security & Audit Reports',
            'Strategic Advisory Calls'
        ]
    }
];

const PriceSection = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className='py-80 sm-py-50'>
                <Heading
                    tag="OUR SERVICE FOR YOU"
                    tagIcon="Settings"
                    title="Solutions That Work For You"
                    align="center"
                />

                <div className="grid-cols-4 sm-grid-cols-1 mt-40 sm-mt-20" style={{ gap: '24px' }}>
                    {pricingPlans?.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white rounded-10 p-25 sm-p-30 b-shadow relative flex flex-column justify-between"
                            style={plan.isPopular ? { border: '2px solid var(--primary)' } : {}}
                        >
                            {plan.isPopular && (
                                <p
                                    className="absolute bg-primary text-white mini-text font-400 uppercase px-12 py-3 rounded-20"
                                    style={{ top: '-14px', right: '20px' }}
                                >
                                    Popular
                                </p>
                            )}
                            <div>
                                <p className="mid-text font-600 text-dark mb-5 uppercase">
                                    {plan.name}
                                </p>

                                <div className="flex items-center gap-4 mb-14">
                                    <h2
                                        className="font-600 text-dark large-text"
                                    >
                                        {plan.price}
                                    </h2>
                                    <p className="mini-text text-gray font-400">
                                        {plan.period}
                                    </p>
                                </div>

                                <p className="small-text text-gray text-muted mb-24" style={{ minHeight: '44px' }}>
                                    {plan.desc}
                                </p>

                                <Button
                                    text={plan.buttonText}
                                    icon="ArrowUpRight"
                                    iconPosition="right"
                                    onClick={() => navigate('/connect')}
                                    version="v3"
                                    bg={plan.isPopular ? 'primary' : 'dark'}
                                    color="white"
                                />

                                <p className="mini-text font-500 text-gray uppercase mt-28 mb-16 m-0" style={{ color: '#888888', letterSpacing: '0.02em' }}>
                                    Includes:
                                </p>

                                <div className="grid-cols-1 gap-12">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-10">
                                            <Icon name="ArrowUpRight" width="16" height="16" stroke="var(--primary)" />
                                            <p className="small-text font-500 text-dark text-muted m-0">
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PriceSection;
