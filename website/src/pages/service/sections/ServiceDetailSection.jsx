import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';

const benefitImages = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
        alt: 'Explore Benefits Strategy'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
        alt: 'Explore Benefits Innovation'
    }
];

const socialLinks = [
    { iconName: 'Facebook', url: 'https://www.facebook.com/Inraclick/' },
    { iconName: 'YouTube', url: 'https://www.youtube.com/@INRACLICK' },
    { iconName: 'LinkedIn', url: 'https://www.linkedin.com/company/-inraclick/' }
];

const contactInfos = [
    { id: 1, icon: 'Phone', text: '+91 7015163045', href: 'tel:+917015163045' },
    { id: 2, icon: 'Mail', text: 'inra@inraclick.com', href: 'mailto:inra@inraclick.com' }
];

const featureCards = [
    {
        id: 1,
        icon: 'Settings',
        title: 'Digital Solutions',
        desc: 'We provide info-reliable solutions designed to help our modern business thrive.'
    },
    {
        id: 2,
        icon: 'ArrowUpRight',
        title: 'Digital Solutions',
        desc: 'We provide info-reliable solutions designed to help our modern business thrive.'
    }
];

const ServiceDetailSection = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="flex sm-grid-cols-1 gap-12 items-start py-60">
                <div className="w-70 sm-w-full">
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                        alt="End-to-End Tech Solutions for Modern Businesses"
                        className="w-full h-400 object-cover rounded-10 flex"
                    />

                    <h2 className="head-text font-600 text-dark mt-20">
                        End-to-End Tech Solutions for modern businesses
                    </h2>

                    <p className="para-text text-gray text-muted mt-10">
                        We deliver end-to-end tech solutions designed to simplify complexity, improve performance, and support long-term business growth. From strategy and system architecture to development, integration, and ongoing support, our solutions are built to be secure, scalable, and aligned with your business goals.
                    </p>

                    <p className="para-text text-gray text-muted mt-12">
                        Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate seamlessly with your existing infrastructure. With a focus on performance, security, and scalability, we ensure your technology evolves as your business grows.
                    </p>

                    <div className="mt-20">
                        <h3 className="title-text font-600 text-dark">Explore Benefits</h3>
                        <p className="para-text text-gray text-muted mt-8">
                            We deliver end-to-end tech solutions designed to simplify complexity, improve performance, and support long-term business growth. From strategy and system architecture to development.
                        </p>

                        <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-20">
                            {benefitImages.map((img) => (
                                <Image
                                    key={img.id}
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-250 object-cover rounded-5"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-28">
                        <h3 className="title-text font-600 text-dark">Final Conclusion</h3>
                        <p className="para-text text-gray text-muted mt-14">
                            Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate seamlessly with your existing infrastructure. With a focus on performance, security, and scalability, we ensure your technology evolves as your business grows.
                        </p>
                        <p className="para-text text-gray text-muted mt-8">
                            Our tech solutions help businesses operate smarter, faster, and more securely. We analyze your challenges, design tailored systems, and implement reliable technologies that integrate.
                        </p>
                    </div>
                </div>

                <div className="w-30 sm-w-full grid-cols-1 gap-12">
                    <div
                        className="rounded-10 p-30 relative overflow-hidden"
                        style={{
                            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.65) 100%), url('https://concept-theme-tech.myshopify.com/cdn/shop/files/collection-headphones-accessories.webp?v=1708441039&width=1080')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >

                        <h3 className="title-text font-600 text-white">
                            Need Any Software Company Services?
                        </h3>
                        <p className="small-text text-white mt-8 text-muted">
                            Our tech solutions help businesses operate smarter, faster, and more.
                        </p>

                        <div className="grid-cols-1 gap-12 mt-26">
                            {contactInfos.map((info) => (
                                <a
                                    key={info.id}
                                    href={info.href}
                                    className="flex items-center gap-12 mb-4"
                                >
                                    <div className="icon-lg bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <Icon name={info.icon} width="18" height="18" stroke="var(--white)" />
                                    </div>
                                    <p className="small-text font-500 text-white m-0">{info.text}</p>
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-10 mt-20 pt-16" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
                            {socialLinks.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.iconName}
                                    className="center-div rounded-circle text-white decoration-none transition-all"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#FFFFFF'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF5100';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Icon name={item.iconName} width="16" height="16" fill="#FFFFFF" />
                                </a>
                            ))}
                        </div>

                        <Button
                            onClick={() => navigate('/connect')}
                            text="Know More Us"
                            icon="ArrowUpRight"
                            iconPosition="right"
                            bg="primary"
                            color="white"
                            version='v3'
                            className='mt-20 rounded-20'
                        />
                    </div>

                    {featureCards.map((card) => (
                        <div key={card.id} className="bg-forth rounded-10 p-18">
                            <div className="flex">
                                <div className="w-15">
                                    <div className="icon-lg bg-tertiary rounded-full flex items-center justify-center">
                                        <Icon name={card.icon} width="22" height="22" stroke="var(--primary)" />
                                    </div>
                                </div>
                                <div className="w-85">
                                    <h4 className="mid-text font-600 text-dark">{card.title}</h4>
                                    <p className="small-text text-gray mt-2">{card.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ServiceDetailSection;
