import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Fields from '../forms/Fields';

const QUICK_ACTIONS = [
    {
        id: 'services',
        title: 'Our Services',
        subtitle: 'Web, UI/UX, Cloud & AI',
        icon: 'Layers',
        iconBg: '#2563eb',
        reply: 'We specialize in end-to-end digital product design and modern engineering:\n\n• **UI/UX & Product Design**: Research, Figma design systems, wireframing, and interactive prototyping.\n• **Full-Stack Engineering**: High-performance web apps built with Next.js, React, Node.js, and TypeScript.\n• **Cloud & DevOps**: Edge deployment, scalable microservices, and CI/CD pipelines.\n• **AI & Growth Engine**: Custom LLM integration, workflow automation, and CRO optimization.\n\nWould you like to explore our service capabilities or discuss a project?',
        cta: { text: 'Explore Services', path: '/service' }
    },
    {
        id: 'portfolio',
        title: 'Case Studies',
        subtitle: 'Featured digital work',
        icon: 'Sparkles',
        iconBg: '#06b6d4',
        reply: 'We partner with high-growth startups and global enterprises to deliver category-defining digital products:\n\n• **B2B SaaS Platforms**: High-conversion user onboarding and complex analytics dashboards.\n• **Headless E-Commerce**: Sub-second page transitions with 3D product previews.\n• **Enterprise Web Apps**: SOC-2 compliant, accessible (WCAG AA), and Lighthouse 100 performance rated.\n\nCheck out our recent client products and digital showcases!',
        cta: { text: 'View Products & Work', path: '/product' }
    },
    {
        id: 'bookdemo',
        title: 'Book a Demo',
        subtitle: 'Free strategy session',
        icon: 'Calendar',
        iconBg: '#7c3aed',
        reply: 'Ready to build or scale your digital product? Schedule a free 30-minute discovery session with our technical leads and product architects:\n\n• Architecture review & modern tech stack assessment\n• UX heuristic audit & conversion funnel evaluation\n• MVP roadmap & sprint timeline estimation',
        cta: { text: 'Book A Consultation', path: '/bookdemo' }
    },
    {
        id: 'contact',
        title: 'Get in Touch',
        subtitle: 'Speak with our team',
        icon: 'Headset',
        iconBg: '#059669',
        reply: `You can reach our digital solutions desk directly:\n\n• **Email**: ${import.meta.env.VITE_EMAIL || 'connect@generictrade.com'}\n• **Phone**: ${import.meta.env.VITE_CONTACT_PHONE || import.meta.env.VITE_PHONE || '+1 888-234-1234 (Toll-Free)'}\n\nOur average turnaround time is under 15 minutes during business hours!`,
        cta: { text: 'Get in Touch', path: '/connect' }
    }
];

const QUERY_RULES = [
    {
        keywords: ['price', 'pricing', 'cost', 'rate', 'quote', 'tier', 'budget', 'estimate', 'plan', 'plans', 'sprint', 'engagement', 'model'],
        reply: 'Our engagement models include rapid MVP sprints, monthly dedicated engineering pods, and custom enterprise scopes. You can review our transparent pricing tiers or connect with our team for a tailored proposal.',
        cta: { text: 'View Pricing', path: '/pricing' }
    },
    {
        keywords: ['service', 'services', 'capabilities', 'stack', 'tech', 'technology', 'technologies', 'develop', 'development', 'design', 'frontend', 'backend', 'ui', 'ux', 'cloud', 'ai'],
        reply: QUICK_ACTIONS[0].reply,
        cta: QUICK_ACTIONS[0].cta
    },
    {
        keywords: ['portfolio', 'work', 'project', 'projects', 'product', 'products', 'case', 'study', 'showcase', 'client'],
        reply: QUICK_ACTIONS[1].reply,
        cta: QUICK_ACTIONS[1].cta
    },
    {
        keywords: ['demo', 'book', 'meeting', 'schedule', 'session', 'consult', 'consultation', 'call', 'discovery'],
        reply: QUICK_ACTIONS[2].reply,
        cta: QUICK_ACTIONS[2].cta
    },
    {
        keywords: ['contact', 'phone', 'call', 'email', 'touch', 'support', 'reach', 'message'],
        reply: QUICK_ACTIONS[3].reply,
        cta: QUICK_ACTIONS[3].cta
    },
    {
        keywords: ['about', 'team', 'agency', 'company', 'who', 'story', 'mission'],
        reply: 'We are a bespoke digital product agency and engineering collective. We partner with ambitious leaders to build high-performance web applications, resilient architectures, and iconic brand identities.',
        cta: { text: 'About Our Agency', path: '/about' }
    },
    {
        keywords: ['blog', 'article', 'articles', 'insight', 'insights', 'news'],
        reply: 'Check out our engineering articles, UI/UX design systems, and digital product strategies on our blog.',
        cta: { text: 'Read Blog', path: '/blog' }
    }
];

const DEFAULT_REPLY = {
    text: 'Thanks for reaching out! Our digital product strategists and engineers are here to assist. Would you like to explore our services, review client work, or book a free discovery consultation?',
    cta: { text: 'Book A Consultation', path: '/bookdemo' }
};

const ChatTeaser = React.memo(({ onOpen, onDismiss }) => (
    <div
        onClick={onOpen}
        className="b-shadow p-10 rounded-5 cursor-pointer bg-white"
        style={{
            width: '230px',
            maxWidth: 'calc(100vw - 48px)',
            animation: 'fadeInUp 0.3s ease-out'
        }}
    >
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6 text-primary">
                <Icon name="Sparkles" width="18" height="18" stroke="currentColor" />
                <p className="small-text font-500 text-dark">
                    ASSISTANT
                </p>
            </div>
            <Button
                version="icon"
                icon="Close"
                iconWidth="15"
                iconHeight="15"
                iconStrokeWidth="2"
                iconStroke="var(--dark)"
                bg="forth"
                aria-label="Dismiss teaser"
                onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                }}
            />
        </div>
        <p className="mini-text text-dark font-500">
            Hi! 👋 Planning a digital project or have questions? Let's chat!
        </p>
    </div>
));

const ChatHeader = React.memo(({ onClose }) => (
    <div className="flex items-center justify-between p-16 bg-white">
        <div className="flex items-center gap-12">
            <div
                className='icon-lg bg-primary relative rounded-30'
            >
                <Icon name="Bot" width="22" height="22" stroke="var(--white)" strokeWidth="2" />
                <span
                    className="absolute bg-success dot rounded-full bottom-0 right-0"
                />
            </div>
            <div>
                <h4 className="headmini-text font-600 text-dark">Digital Agency Assistant</h4>
                <p className="mini-text font-400 text-gray">Online • Average reply &lt; 15m</p>
            </div>
        </div>

        <Button
            version="icon"
            icon="Close"
            iconWidth="15"
            iconHeight="15"
            iconStroke="var(--gray)"
            iconStrokeWidth="2"
            bg="forth"
            aria-label="Close Assistant"
            title="Close"
            onClick={onClose}
        />
    </div>
));

const ChatWelcome = React.memo(({ onActionClick }) => (
    <div>
        <h2 className="title-text text-dark font-700 capitalize">
            Hey there 👋<br />
            How can we <span className="text-primary">help</span>?
        </h2>

        <p className="mini-text text-gray mt-6">
            Ask about our services, tech stack, case studies, or get in touch with our team.
        </p>

        <div className="grid-cols-2 gap-6 mt-10">
            {QUICK_ACTIONS.map((card) => (
                <div
                    key={card.id}
                    onClick={() => onActionClick(card)}
                    className="bg-white rounded-5 p-12 cursor-pointer"
                >
                    <div
                        className="icon rounded-30 flex items-center justify-center"
                        style={{ backgroundColor: card.iconBg }}
                    >
                        <Icon name={card.icon} width="13" height="13" stroke="var(--white)" strokeWidth="2.2" />
                    </div>
                    <div className='mt-6'>
                        <h5 className="headmini-text font-600 text-dark">{card.title}</h5>
                        <p className="mini-text text-gray">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));

const ChatMessages = React.memo(({ messages, isTyping, onReset, onCtaClick, messagesEndRef }) => (
    <div className="grid-cols-1 gap-12">
        <p
            className='mini-text flex items-center gap-4 text-primary cursor-pointer'
            onClick={onReset}
        >
            <Icon name="ChevronLeft" width="16" height="16" stroke="currentColor" />
            Back to topics
        </p>

        {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
                <div
                    key={idx}
                    className="flex flex-column"
                    style={{ alignItems: isUser ? 'flex-end' : 'flex-start' }}
                >
                    <p
                        className={`mini-text p-10 ${isUser ? 'bg-primary text-white' : 'bg-white text-dark b-shadow'}`}
                        style={{
                            maxWidth: '85%',
                            borderRadius: isUser ? '15px 15px 4px 15px' : '15px 15px 15px 4px',
                            border: isUser ? 'none' : '1px solid #e2e8f0',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {msg.text}
                    </p>

                    {msg.cta && (
                        <Button
                            text={msg.cta.text}
                            icon="ArrowRight"
                            iconPosition="right"
                            iconWidth="12"
                            iconHeight="12"
                            version="v0"
                            bg="dark"
                            color="white"
                            className="mt-6"
                            onClick={() => onCtaClick(msg.cta.path)}
                        />
                    )}
                </div>
            );
        })}

        {isTyping && (
            <div
                className="bg-white rounded-16 p-10 flex items-center gap-4 b-shadow"
                style={{ width: 'fit-content', border: '1px solid #e2e8f0' }}
            >
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.2s' }} />
                <span className="rounded-full bg-primary" style={{ width: '6px', height: '6px', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
));

const ChatInput = React.memo(({ inputValue, setInputValue, onSend }) => {
    const hasText = Boolean(inputValue.trim());

    return (
        <div className="p-12 bg-white">
            <form onSubmit={onSend} className="relative flex items-center w-full">
                <Fields
                    type="input"
                    version={2}
                    placeholder="Ask anything..."
                    value={inputValue}
                    onChange={(val) => setInputValue(val)}
                />
                <div
                    className="absolute right-0 top-0 my-4 mx-2"
                >
                    <Button
                        type="submit"
                        version="icon"
                        icon="Send"
                        iconWidth="18"
                        iconHeight="18"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg={hasText ? 'primary' : 'gray'}
                        disabled={!hasText}
                        aria-label="Send message"
                        title="Send"
                        className="rounded-30 p-6"
                    />
                </div>
            </form>
        </div>
    );
});

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping, scrollToBottom]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setShowTeaser(false);
    }, []);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleDismissTeaser = useCallback(() => setShowTeaser(false), []);
    const handleReset = useCallback(() => setMessages([]), []);

    const handleCtaClick = useCallback((path) => {
        navigate(path);
        setIsOpen(false);
    }, [navigate]);

    const handleActionClick = useCallback((action) => {
        setMessages((prev) => [...prev, { sender: 'user', text: action.title }]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: action.reply, cta: action.cta }
            ]);
            setIsTyping(false);
        }, 500);
    }, []);

    const handleSend = useCallback((e) => {
        e?.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
        setInputValue('');
        setIsTyping(true);

        const lower = trimmed.toLowerCase();
        const matched = QUERY_RULES.find((rule) =>
            rule.keywords.some((kw) => lower.includes(kw))
        );

        const reply = matched
            ? { text: matched.reply, cta: matched.cta }
            : DEFAULT_REPLY;

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: reply.text, cta: reply.cta }
            ]);
            setIsTyping(false);
        }, 600);
    }, [inputValue]);

    return (
        <>
            {!isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '6px',
                    }}
                    className='flex items-end justify-end gap-10 z-999'
                >
                    {showTeaser && (
                        <ChatTeaser
                            onOpen={handleOpen}
                            onDismiss={handleDismissTeaser}
                        />
                    )}

                    <Button
                        version="icon"
                        icon="Bot"
                        iconWidth="32"
                        iconHeight="32"
                        iconStroke="var(--white)"
                        iconStrokeWidth="2"
                        bg="primary"
                        aria-label="Open AI Assistant"
                        title="Open AI Assistant"
                        onClick={handleOpen}
                        className='rounded-30'
                    />
                </div>
            )}

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        right: '5px',
                        width: '350px',
                        height: '450px',
                        animation: 'fadeInUp 0.25s ease-out'
                    }}
                    className='bg-white rounded-10 overflow-hidden z-999 grid-cols-1 b-shadow'
                >
                    <ChatHeader onClose={handleClose} />

                    <div
                        className='overflow-auto p-16 bg-forth'
                    >
                        {messages.length === 0 ? (
                            <ChatWelcome onActionClick={handleActionClick} />
                        ) : (
                            <ChatMessages
                                messages={messages}
                                isTyping={isTyping}
                                onReset={handleReset}
                                onCtaClick={handleCtaClick}
                                messagesEndRef={messagesEndRef}
                            />
                        )}
                    </div>

                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSend={handleSend}
                    />
                </div>
            )}
        </>
    );
};

export default Chatbot;
