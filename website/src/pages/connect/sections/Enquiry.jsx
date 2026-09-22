import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Heading from '../../../components/layout/generic/Heading';
import FormBuilder from '../../../components/forms/FormBuilder';
import { showToast } from '../../../components/common/Toast';
import { configData } from '../../../utils/apiData';
import { sendEmail } from '../../../utils/emailsend';

const enquiryFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        validation: { required: true }
    },
    {
        name: 'email',
        label: 'Email *',
        type: 'email',
        placeholder: 'Enter your email',
        validation: { required: true }
    },
    {
        name: 'phone',
        label: 'Phone Number *',
        type: 'tel',
        placeholder: 'Enter your phone number',
        validation: { required: true }
    },
    {
        name: 'message',
        label: 'Your message',
        type: 'textarea',
        placeholder: 'Tell us about your project or inquiry...'
    }
];

// Contact details configured via environment variables
const rawEnvPhone = import.meta.env.VITE_CONTACT_PHONE || import.meta.env.VITE_PHONE || '+1 888-234-1234 (Toll-Free)';
const displayPhone = import.meta.env.VITE_CONTACT_PHONE || (
    import.meta.env.VITE_PHONE
        ? (import.meta.env.VITE_PHONE.startsWith('+') || import.meta.env.VITE_PHONE.includes(' ') || import.meta.env.VITE_PHONE.includes('-')
            ? import.meta.env.VITE_PHONE
            : (import.meta.env.VITE_PHONE.length === 10 ? `+91 ${import.meta.env.VITE_PHONE}` : import.meta.env.VITE_PHONE))
        : '+1 888-234-1234 (Toll-Free)'
);
const phoneDial = import.meta.env.VITE_PHONE || (import.meta.env.VITE_CONTACT_PHONE ? import.meta.env.VITE_CONTACT_PHONE.replace(/[^\d+]/g, '') : '8882341234');
const envEmail = import.meta.env.VITE_EMAIL || 'connect@generictrade.com';
const envAddress = import.meta.env.VITE_ADDRESS || import.meta.env.VITE_OFFICE_ADDRESS || '382 NE 191st St # 87394 Miami, FL 33179';
const envOfficeTitle = import.meta.env.VITE_OFFICE_TITLE || 'General Office';
const envOfficeSub = import.meta.env.VITE_OFFICE_SUB || import.meta.env.VITE_SITE_NAME || 'Global Trade Center';
const envHours = import.meta.env.VITE_WORKING_HOURS || 'Mon – Fri, 7:30 AM – 4:00 PM PT';
const envWeekendHours = import.meta.env.VITE_WEEKEND_HOURS || 'Sat: 8:00 AM – 1:00 PM | Sun: Closed';

const contactDetails = [
    {
        icon: 'MapPin',
        title: envOfficeTitle,
        desc: envAddress,
        sub: envOfficeSub
    },
    {
        icon: 'Phone',
        title: 'Call Us',
        desc: displayPhone,
        link: `tel:${phoneDial}`,
        sub: envHours
    },
    {
        icon: 'Mail',
        title: 'Email Us',
        desc: envEmail,
        link: `mailto:${envEmail}`,
        sub: 'Average Response Time: < 15 mins'
    },
    {
        icon: 'Clock',
        title: 'Working Hours',
        desc: envHours,
        sub: envWeekendHours
    }
];

const getCart = () => {
    try {
        const stored = localStorage.getItem('cart') || localStorage.getItem('order_products');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const EnquiryVersion1 = React.memo(({ fields, onSubmit, formKey }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="flex sm-grid-cols-1 items-start gap-12 py-60">
                <div className="w-65 sm-w-full pr-20 sm-pr-1 bordr">
                    <Heading
                        version="v2"
                        tag={import.meta.env.VITE_CONTACT_TAG || "GET IN TOUCH"}
                        tagIcon="Phone"
                        title={import.meta.env.VITE_CONTACT_TITLE || "Contact Us"}
                        subtitle={import.meta.env.VITE_CONTACT_SUBTITLE || "Have a project in mind, need technical consultation, or have an inquiry? Reach out to our team."}
                        className="mb-20"
                    />

                    <div className="w-90 sm-w-full">
                        <FormBuilder
                            key={formKey}
                            version="3"
                            fields={fields}
                            onSubmit={onSubmit}
                            submitType="json"
                            col="1"
                            submitText="Submit Now"
                            buttonVersion="v2"
                            buttonBg="dark"
                            buttonClassName="flex items-center justify-start mt-20"
                        />
                    </div>
                </div>

                <div className="w-35 sm-w-full pl-20 sm-pl-1 sm-mt-16">
                    <Heading
                        version="v2"
                        tag={import.meta.env.VITE_SUPPORT_TAG || "SUPPORT DESK"}
                        tagIcon="Clock"
                        title={import.meta.env.VITE_SUPPORT_TITLE || "Need Help?"}
                        subtitle={import.meta.env.VITE_SUPPORT_SUBTITLE || "To us, design has a broader purpose and as you can read about on this website, we are on a mission."}
                        className="mb-20"
                    />

                    <div className="grid-cols-1 gap-12 mt-20">
                        {contactDetails.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex gap-12 items-start mb-20">
                                <div className="icon-lg border-dark rounded-full center-div flex-shrink-0">
                                    <Icon name={item.icon} width="16" height="16" stroke="#141414" />
                                </div>
                                <div>
                                    <h4 className="text-dark mid-text font-600">{item.title}</h4>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className="text-gray mini-text font-400 mt-2 block"
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <span className="text-gray hover:text-dark">{item.desc}</span>
                                        </a>
                                    ) : (
                                        <p className="text-gray mini-text font-400 mt-2">{item.desc}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
});

EnquiryVersion1.displayName = 'EnquiryVersion1';

const EnquiryVersion2 = React.memo(({ fields, onSubmit, formKey }) => (
    <Container>
        <div className="py-60">
            <div className="grid grid-cols-2 sm-grid-cols-1 gap-24 items-stretch">
                {/* Left Card: Dark Gradient Accent */}
                <div
                    className="rounded-12 p-30 flex flex-column justify-between text-white"
                    style={{
                        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)'
                    }}
                >
                    <div>
                        <span className="mini-text font-600 px-12 py-4 rounded-20 bg-primary text-white uppercase inline-block w-max">
                            Fast Response SLA
                        </span>
                        <h3 className="head-text font-700 text-white mt-16 leading-snug">
                            Let's Connect & Scale Your Trade Network.
                        </h3>
                        <p className="mini-text text-gray mt-8 leading-relaxed">
                            Have questions regarding platform licensing, regional node deployment, or automated escrow clearing? Reach our solutions desk directly.
                        </p>

                        <div className="grid-cols-1 gap-14 mt-28">
                            {contactDetails.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-12">
                                    <div
                                        className="center-div rounded-8 flex-shrink-0"
                                        style={{
                                            width: '38px',
                                            height: '38px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: '#ffffff'
                                        }}
                                    >
                                        <Icon name={item.icon} width="16" height="16" stroke="currentColor" />
                                    </div>
                                    <div>
                                        <h5 className="mini-text font-600 text-white">{item.title}</h5>
                                        <p className="mini-text text-gray font-400 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-8 pt-20 mt-30"
                        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}
                    >
                        <span
                            className="rounded-full bg-success inline-block"
                            style={{ width: '8px', height: '8px', boxShadow: '0 0 8px #22c55e' }}
                        />
                        <span className="mini-text text-white font-500">
                            Live Trade Systems Online • Average Reply 15 Mins
                        </span>
                    </div>
                </div>

                {/* Right Card: Crisp Form Container */}
                <div
                    className="bg-white rounded-12 p-30 border-ec b-shadow"
                    style={{ backgroundColor: '#ffffff' }}
                >
                    <Heading
                        version="v2"
                        tag="DIRECT INQUIRY"
                        tagIcon="Mail"
                        title="Send an Enquiry"
                        subtitle="Fill out your parameters below and our solutions team will get in touch promptly."
                        className="mb-20"
                    />

                    <FormBuilder
                        key={formKey}
                        version="3"
                        fields={fields}
                        onSubmit={onSubmit}
                        submitType="json"
                        col="2"
                        submitText="Send Message"
                        buttonVersion="v3"
                        buttonBg="primary"
                        buttonClassName="w-full justify-center mt-16"
                    />
                </div>
            </div>
        </div>
    </Container>
));

EnquiryVersion2.displayName = 'EnquiryVersion2';

const EnquiryVersion3 = React.memo(({ fields, onSubmit, formKey }) => (
    <Container>
        <div className="py-60 w-full">
            <Heading
                version="v1"
                tag="DIRECT CHANNELS"
                tagIcon="Mail"
                title="Get in Touch With Our Specialists"
                subtitle="Select your communication channel or submit the executive consultation form below."
                align="left"
                className="mb-40"
            />

            <div className="grid-cols-4 sm-grid-cols-1 gap-12 mt-20">
                <div className="bg-white border-ec rounded-10 p-20 text-center">
                    <div className="icon-lg rounded-full bg-light-primary mx-auto">
                        <Icon name="Phone" width="16" height="16" stroke="var(--primary)" />
                    </div>
                    <h4 className="title-text font-600 text-dark mt-8">Sales & Inquiries</h4>
                    <p className="mini-text text-gray mt-7">{displayPhone}</p>
                    <p className="mini-text text-primary font-500 mt-2">Instant Connection</p>
                </div>

                <div className="bg-white border-ec rounded-10 p-20 text-center">
                    <div className="icon-lg rounded-full bg-light-primary mx-auto">
                        <Icon name="Mail" width="16" height="16" stroke="var(--primary)" />
                    </div>
                    <h4 className="title-text font-600 text-dark mt-8">Technical Advisory</h4>
                    <p className="mini-text text-gray mt-7">{envEmail}</p>
                    <p className="mini-text text-primary font-500 mt-2">&lt; 15 Min Turnaround</p>
                </div>

                <div className="bg-white border-ec rounded-10 p-20 text-center">
                    <div className="icon-lg rounded-full bg-light-primary mx-auto">
                        <Icon name="MapPin" width="16" height="16" stroke="var(--primary)" />
                    </div>
                    <h4 className="title-text font-600 text-dark mt-8">Get In Touch</h4>
                    <p className="mini-text text-gray mt-7">{envAddress}</p>
                    <p className="mini-text text-primary font-500 mt-2">Open {envHours.split(',')[0] || 'Mon – Fri'}</p>
                </div>
            </div>

            <div
                className="bg-white mt-26"
            >
                <div className='w-70'>
                    <FormBuilder
                        key={formKey}
                        version="3"
                        fields={fields}
                        onSubmit={onSubmit}
                        submitType="json"
                        col="2"
                        submitText="Submit Consultation Request"
                        buttonVersion="v2"
                        buttonBg="dark"
                        buttonClassName="w-full justify-center mt-20"
                    />
                </div>
            </div>
        </div>
    </Container>
));

EnquiryVersion3.displayName = 'EnquiryVersion3';

const VERSION_COMPONENTS = {
    1: EnquiryVersion1,
    2: EnquiryVersion2,
    3: EnquiryVersion3
};

const Enquiry = React.memo(({ version, isCart = false, onClearCart }) => {
    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(0);
    const enquiryVersion = version ?? configData?.Connect?.[0]?.ConnectVersion ?? 1;

    const handleFormSubmit = useCallback(async (data) => {
        const mobile = data.mobile || data.phone || '';
        const requirement = data.requirement || data.message || '';
        const city = data.city || '';
        const quantity = data.quantity || '';
        const email = data.email || '';
        const tradeRole = data.tradeRole || '';
        const primaryObjective = data.primaryObjective || '';

        const messageLines = [
            'New Product Enquiry:',
            `Name: ${data.name || ''}`,
            `Mobile: ${mobile}`,
            email ? `Email: ${email}` : '',
            tradeRole ? `Role: ${tradeRole}` : '',
            primaryObjective ? `Objective: ${primaryObjective}` : '',
            city ? `City: ${city}` : '',
            quantity ? `Quantity: ${quantity}` : '',
            requirement ? `Requirement: ${requirement}` : ''
        ].filter(Boolean).join('\n');

        const smsBody = encodeURIComponent(messageLines);

        // Send background email via Formspree / EmailJS
        try {
            await sendEmail(
                {
                    name: data.name,
                    mobile: mobile,
                    email: email,
                    city: city,
                    quantity: quantity,
                    requirement: requirement,
                    tradeRole: tradeRole,
                    primaryObjective: primaryObjective
                },
                "New Product Enquiry",
                messageLines
            );
        } catch (err) {
            console.error("Formspree error:", err);
        }

        if (isCart) {
            const currentCart = getCart();
            if (currentCart && currentCart.length > 0) {
                localStorage.setItem('order_products', JSON.stringify(currentCart));
            }
        }

        // Clear input values and show toast
        setFormKey(prev => prev + 1);
        showToast('Thank you! Your enquiry has been submitted.', 'success');

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const smsUrl = `sms:${import.meta.env.VITE_PHONE || '8779030638'}${isIOS ? '&' : '?'}body=${smsBody}`;

        window.location.href = smsUrl;

        if (isCart) {
            setTimeout(() => {
                if (onClearCart) onClearCart();
                const ecomEnv = import.meta.env.ECOM ?? import.meta.env.VITE_ECOM;
                const isEcom = String(ecomEnv).toLowerCase() === 'true';
                if (isEcom) {
                    navigate('/order');
                } else {
                    navigate('/wheretobuy');
                }
            }, 1500);
        }
    }, [isCart, onClearCart, navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[enquiryVersion] || EnquiryVersion1;

    return (
        <ActiveVersionComponent
            fields={enquiryFields}
            onSubmit={handleFormSubmit}
            formKey={formKey}
        />
    );
});

Enquiry.displayName = 'Enquiry';

export default Enquiry;