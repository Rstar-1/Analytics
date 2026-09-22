import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Modal from '../../../components/common/Modal';
import FormBuilder from '../../../components/forms/FormBuilder';
import { showToast } from '../../../components/common/Toast';
import { sendEmail } from '../../../utils/emailsend';
import { HERO_DESCRIPTION, sellerTypes, SELLER_DETAILS, sellerNames } from './sellerData';

const GlossySphere = React.memo(({ gradient, size = 16 }) => (
    <div
        className="rounded-full relative overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            background: gradient,
            boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.35), inset 2px 3px 5px rgba(255,255,255,0.95), 0 4px 10px rgba(0,0,0,0.12)'
        }}
    >
        <div
            style={{
                position: 'absolute',
                top: '12%',
                left: '16%',
                width: '42%',
                height: '32%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 75%)',
                transform: 'rotate(-25deg)',
                pointerEvents: 'none'
            }}
        />
    </div>
));

GlossySphere.displayName = 'GlossySphere';

const SellerNode = React.memo(({ item, isActive, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white sm-hidden b-shadow absolute cursor-pointer flex items-center gap-8 rounded-20 px-16 py-6"
        style={{
            top: `${item.y}%`,
            left: `${item.x}%`,
            transform: 'translate(-50%, -50%)',
            border: isActive ? `1.5px solid ${item.accentColor}` : '1px solid var(--tertiary)',
            backgroundColor: 'var(--white)',
            zIndex: isActive ? 30 : 25,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
    >
        <GlossySphere gradient={item.sphereGradient} size={16} />
        <p className="small-text font-400 whitespace-nowrap text-dark">{item.name}</p>
    </div>
));

SellerNode.displayName = 'SellerNode';

const ActiveSellerCard = React.memo(({ seller, onSelectCollaborator, onExplore }) => (
    <div className="relative bg-white b-shadow rounded-10 p-13 z-20" style={{ minWidth: '239px' }}>
        <div className="flex items-center gap-6 bordb pb-6">
            <GlossySphere gradient={seller.sphereGradient} size={16} />
            <h4 className="mid-text text-dark font-600">{seller.name}</h4>
        </div>

        <p className="mini-text font-500 text-dark mt-6">{seller.category}</p>

        <div className="grid-cols-1 gap-6 mt-5">
            {seller.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-6">
                    <Icon name={feat.icon} width="14" height="14" stroke="var(--gray)" />
                    <p className="mini-text font-400 text-gray">{feat.label}</p>
                </div>
            ))}
        </div>

        <p className="mini-text font-500 text-dark mt-12">COLLABORATES WITH</p>
        <div className="flex items-center gap-8 flex-wrap mt-8">
            {seller.collaboratesWith.map((collab, idx) => (
                <p
                    key={idx}
                    onClick={() => onSelectCollaborator(collab)}
                    className="cursor-pointer px-14 py-4 rounded-20 text-dark bg-tertiary mini-text font-500"
                >
                    {collab}
                </p>
            ))}
        </div>

        <Button
            text={`Explore ${seller.name}`}
            version="v3"
            color="white"
            bg="primary"
            className="mt-14 font-500 cursor-pointer w-full"
            onClick={onExplore}
        />
    </div>
));

ActiveSellerCard.displayName = 'ActiveSellerCard';

const SellerDetailContent = React.memo(({ seller }) => {
    const details = SELLER_DETAILS[seller.id] || SELLER_DETAILS.manufacture;

    return (
        <div className="grid-cols-1 gap-12 pb-20">
            <div className="rounded-10 p-12 border-ec">
                <div className="flex items-center gap-8">
                    <GlossySphere gradient={seller.sphereGradient} size={35} />
                    <div>
                        <h4 className="mid-text font-600 text-dark">{seller.name}</h4>
                        <p className="mini-text font-400" style={{ color: seller.accentColor }}>
                            {seller.category}
                        </p>
                    </div>
                </div>
                <h5 className="headmini-text font-600 text-dark mt-10">{details.tagline}</h5>
                <p className="mini-text text-gray mt-2">{details.description}</p>
            </div>

            <div>
                <h5 className="headmini-text font-600 text-dark">Key Performance Indicators</h5>
                <div className="grid-cols-2 gap-12 mt-8">
                    {details.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-forth rounded-5 p-12 flex items-center gap-8">
                            <div
                                className="icon-lg"
                                style={{
                                    backgroundColor: `${seller.accentColor}15`,
                                    color: seller.accentColor
                                }}
                            >
                                <Icon name={metric.icon} width="20" height="20" stroke={seller.accentColor} />
                            </div>
                            <div>
                                <h6 className="headmini-text font-600 text-dark">{metric.value}</h6>
                                <p className="mini-text text-gray font-400">{metric.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-5 p-12 bg-forth">
                <h5 className="headmini-text font-600 text-dark">Trade Corridor Channels</h5>
                <div className="grid-cols-1 gap-5 mt-8">
                    <div className="flex items-start gap-6">
                        <p className="font-600 text-dark mini-text w-15">Inflow:</p>
                        <p className="text-gray mini-text w-95">{details.channels.sourcing}</p>
                    </div>
                    <div className="flex items-start gap-6">
                        <p className="font-600 text-dark mini-text w-15">Outflow:</p>
                        <p className="text-gray mini-text w-95">{details.channels.dispatch}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

SellerDetailContent.displayName = 'SellerDetailContent';

const Step1 = React.memo(() => {
    const navigate = useNavigate();
    const [activeSellerId, setActiveSellerId] = useState('manufacture');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [formKey, setFormKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tradeRole: 'Manufacture',
        location: '',
        dateRange: ''
    });

    const computedSellers = useMemo(() => {
        const total = sellerTypes.length;
        const rx = 39;
        const ry = 40.9;
        return sellerTypes.map((item, index) => {
            const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
            const x = Math.round((50 + rx * Math.cos(angle)) * 10) / 10;
            const y = Math.round((50 + ry * Math.sin(angle)) * 10) / 10;
            return { ...item, x, y };
        });
    }, []);

    const activeSeller = useMemo(() => {
        return computedSellers.find((s) => s.id === activeSellerId) || computedSellers[0];
    }, [computedSellers, activeSellerId]);

    const connectorPath = useMemo(() => {
        const startX = 50;
        const startY = 50;
        const dx = activeSeller.x - startX;
        const dy = activeSeller.y - startY;
        const dist = Math.hypot(dx, dy) || 1;
        const offset = 3.5;
        const targetX = activeSeller.x - (dx / dist) * offset;
        const targetY = activeSeller.y - (dy / dist) * offset;
        const cp1X = startX + (targetX - startX) * 0.35;
        const cp1Y = startY + (targetY - startY) * 0.15;
        const cp2X = startX + (targetX - startX) * 0.75;
        const cp2Y = targetY;
        return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
    }, [activeSeller]);

    const selectSellerByName = useCallback((name) => {
        const found = computedSellers.find((s) => s.name.toLowerCase() === name?.toLowerCase());
        if (found) {
            setActiveSellerId(found.id);
            setFormData((prev) => ({ ...prev, tradeRole: found.name }));
        }
    }, [computedSellers]);

    const handleSellerNodeClick = useCallback((id) => {
        setActiveSellerId(id);
        const found = computedSellers.find((s) => s.id === id);
        if (found) {
            setFormData((prev) => ({ ...prev, tradeRole: found.name }));
        }
    }, [computedSellers]);

    const handleFieldChange = useCallback((name, value, updatedForm) => {
        setFormData((prev) => ({ ...prev, [name]: value, ...updatedForm }));
        if (name === 'tradeRole' && value) {
            selectSellerByName(value);
        }
    }, [selectSellerByName]);

    const step1Fields = useMemo(() => [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Your name',
            validation: { required: true }
        },
        {
            name: 'email',
            label: 'Email *',
            type: 'email',
            placeholder: 'Your email address',
            validation: { required: true, email: true }
        },
        {
            name: 'phone',
            label: 'Phone Number *',
            type: 'tel',
            placeholder: 'Your phone number',
            validation: { required: true }
        },
        {
            name: 'tradeRole',
            label: 'Seller Type',
            type: 'select',
            value: formData.tradeRole || activeSeller.name,
            options: sellerNames,
            validation: { required: true }
        }
    ], [formData.tradeRole, activeSeller.name]);

    const step2Fields = useMemo(() => [
        {
            name: 'location',
            label: 'Targeted Location *',
            type: 'text',
            placeholder: 'e.g. Mumbai, New York, London',
            validation: { required: true }
        },
        {
            name: 'dateRange',
            label: 'Appointment Date *',
            type: 'datepicker',
            placeholder: 'Select appointment date',
            validation: { required: true }
        }
    ], []);

    const handleStep1Submit = useCallback((data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setFormStep(2);
    }, []);

    const handleResetForm = useCallback(() => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            tradeRole: activeSeller.name,
            location: '',
            dateRange: ''
        });
        setFormKey((prev) => prev + 1);
        setFormStep(1);
    }, [activeSeller.name]);

    const handleStep2Submit = useCallback(async (data) => {
        const updatedForm = { ...formData, ...data };
        setFormData(updatedForm);
        setIsSubmitting(true);

        const currentRole = updatedForm.tradeRole || activeSeller.name;
        const dateVal = updatedForm.dateRange;
        const dateFormatted = typeof dateVal === 'string'
            ? dateVal
            : (dateVal?.fromDate && dateVal?.toDate
                ? `${dateVal.fromDate} to ${dateVal.toDate}`
                : (dateVal?.fromDate || ''));

        const subject = `New Demo Booking Request - ${updatedForm.name || 'Visitor'} (${currentRole})`;
        const message = `
Demo Booking Details:
---------------------
Name: ${updatedForm.name}
Email: ${updatedForm.email}
Phone: ${updatedForm.phone}
Seller Type: ${currentRole}
Targeted Location: ${updatedForm.location}
Appointment Date: ${dateFormatted}
        `.trim();

        try {
            await sendEmail(
                {
                    name: updatedForm.name,
                    email: updatedForm.email,
                    phone: updatedForm.phone,
                    seller_type: currentRole,
                    location: updatedForm.location,
                    appointment_date: dateFormatted
                },
                subject,
                message
            );

            // Persist booking in localStorage lead store as a resilient client backup
            try {
                const stored = JSON.parse(localStorage.getItem('demo_bookings') || '[]');
                stored.push({
                    ...updatedForm,
                    appointment_date: dateFormatted,
                    created_at: new Date().toISOString()
                });
                localStorage.setItem('demo_bookings', JSON.stringify(stored));
            } catch (storageErr) {
                console.warn('Local lead storage error:', storageErr);
            }

            handleResetForm();
            showToast('Thank you! Your demo appointment has been confirmed.', 'success');

            setTimeout(() => {
                navigate('/home');
            }, 1200);
        } catch (err) {
            console.error('Demo booking error:', err);
            const errMsg = err?.text || err?.message || 'Failed to submit demo request. Please try again.';
            showToast(errMsg, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, activeSeller.name, handleResetForm, navigate]);

    return (
        <Container version="v0">
            <div className="grid-cols-2 sm-grid-cols-1 gap-12 w-full h-100">
                <div className="px-30 flex items-center bg-forth">
                    <div className="relative w-full overflow-hidden flex items-center justify-center h-600 sm-h-full">
                        <svg
                            className="absolute top-0 left-0 w-full h-full sm-hidden"
                            style={{ zIndex: 5 }}
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <ellipse cx="50" cy="50" rx="41" ry="41.5" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />
                            <ellipse cx="50" cy="50" rx="31" ry="31" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />
                            <ellipse cx="50" cy="50" rx="21" ry="21" fill="none" stroke="rgba(226, 232, 240, 0.85)" strokeWidth="0.35" />

                            <path
                                d={connectorPath}
                                fill="none"
                                stroke={activeSeller.accentColor}
                                strokeWidth="0.6"
                                strokeLinecap="round"
                                style={{
                                    transition: 'all 0.4s ease',
                                    filter: `drop-shadow(0 0 2px ${activeSeller.glowColor})`
                                }}
                            />
                        </svg>

                        {computedSellers.map((item) => (
                            <SellerNode
                                key={item.id}
                                item={item}
                                isActive={item.id === activeSellerId}
                                onClick={() => handleSellerNodeClick(item.id)}
                            />
                        ))}

                        <ActiveSellerCard
                            seller={activeSeller}
                            onSelectCollaborator={selectSellerByName}
                            onExplore={() => setIsSidebarOpen(true)}
                        />
                    </div>
                </div>

                <div className="px-30 flex items-center">
                    <div className="w-full">
                        <p className="mini-text text-primary border-primary w-max px-16 py-8 rounded-20 flex items-center gap-8 font-600 uppercase">
                            <Icon name="Settings" width="14" height="14" className="text-primary" />
                            Feature Collections
                        </p>
                        <h3 className="text-dark head-text uppercase font-700 mt-16 sm-mt-6">
                            Delivering Innovative Businesses.
                        </h3>
                        <p className="text-gray small-text font-400 mt-8 sm-mt-6">
                            {HERO_DESCRIPTION}
                        </p>

                        <div className="mt-20">
                            <div className="flex items-center justify-between mb-16">
                                <span className="mini-text px-10 py-2 rounded-20 bg-primary text-white font-600">
                                    Step {formStep} of 2
                                </span>
                                <p className="mini-text text-primary font-600">
                                    {formStep === 1 ? 'Contact Details' : 'Schedule & Location'}
                                </p>
                            </div>

                            {formStep === 1 && (
                                <FormBuilder
                                    key={`step1-${formKey}`}
                                    version={3}
                                    col="2"
                                    smcol="2"
                                    fields={step1Fields}
                                    values={formData}
                                    onChange={handleFieldChange}
                                    onSubmit={handleStep1Submit}
                                    submitType="json"
                                    submitText="Next Step"
                                    buttonVersion="v2"
                                    buttonBg="primary"
                                    buttonClassName="flex items-center justify-start mt-20"
                                />
                            )}

                            {formStep === 2 && (
                                <FormBuilder
                                    key={`step2-${formKey}`}
                                    version={3}
                                    col="2"
                                    fields={step2Fields}
                                    values={formData}
                                    onChange={handleFieldChange}
                                    onSubmit={handleStep2Submit}
                                    submitType="json"
                                    submitText={isSubmitting ? 'Submitting...' : 'Submit Now'}
                                    buttonVersion="v2"
                                    buttonBg="primary"
                                    buttonClassName="flex items-center gap-12 mt-20"
                                    onBack={() => {
                                        setFormStep(1);
                                    }}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                type="sidebar"
                placement="right"
                size="sm"
                title={`${activeSeller.name} Role Details`}
                footer={null}
            >
                <SellerDetailContent seller={activeSeller} />
            </Modal>
        </Container>
    );
});

Step1.displayName = 'Step1';

export default Step1;