import React, { useState, useEffect, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import "../styles/structure.scss";
import Icon from "../components/common/Icon";
import dumpData from "./dump.json";

// ==========================================
// 1. SOUND WAVE VISUALIZER
// ==========================================
const SoundWave = React.memo(({ isPlaying = true, onClick }) => {
    const bars = useMemo(() => {
        const list = [];
        for (let i = 0; i < 70; i++) {
            const envelope = Math.exp(-Math.pow((i - 35) / 20, 2));
            const wave = Math.abs(Math.sin(i * 0.38) * Math.cos(i * 0.12));
            const height = Math.max(4, Math.round(4 + wave * 38 * envelope + envelope * 6));
            const duration = (0.55 + ((i * 7) % 9) * 0.08).toFixed(2);
            const delay = (-((i * 13) % 21) * 0.05).toFixed(2);
            const animIndex = (i % 3) + 1;

            list.push({
                height,
                duration: `${duration}s`,
                delay: `${delay}s`,
                animName: `voiceWave${animIndex}`,
            });
        }
        return list;
    }, []);

    return (
        <div
            className="wave flex items-center justify-center gap-2 cursor-pointer"
            onClick={onClick}
            title={isPlaying ? "Voice Active (Click to mute)" : "Voice Muted (Click to activate)"}
        >
            {bars.map((bar, idx) => (
                <b
                    key={idx}
                    style={{
                        height: `${bar.height}px`,
                        animationName: isPlaying ? bar.animName : "none",
                        animationDuration: bar.duration,
                        animationDelay: bar.delay,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "ease-in-out",
                        transform: isPlaying ? undefined : "scaleY(0.18)",
                        opacity: isPlaying ? undefined : 0.4,
                        transition: isPlaying ? undefined : "transform 0.3s ease, opacity 0.3s ease",
                    }}
                />
            ))}
        </div>
    );
});
SoundWave.displayName = "SoundWave";

// ==========================================
// 2. TOP NAVIGATION & CLOCK HEADER
// ==========================================
const ClockHeader = React.memo(({ activeNav, onNavChange, currentTime, isPlaying, onTogglePlay }) => {
    const pad = useCallback((n) => String(n).padStart(2, "0"), []);

    const timeString = useMemo(
        () => `${pad(currentTime.getHours())}:${pad(currentTime.getMinutes())}:${pad(currentTime.getSeconds())}`,
        [currentTime, pad]
    );

    const dateString = useMemo(
        () =>
            currentTime
                .toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .replace(/^(\w+)/, "$1,"),
        [currentTime]
    );

    return (
        <div className="head-box flex items-center">
            <div className="text-left w-10">
                <h4 className="font-600 title-text text-white">BARA</h4>
                <p className="font-400 mini-text text-white">BARASINGHA BOT V1</p>
            </div>
            <div className="w-25">
                <SoundWave isPlaying={isPlaying} onClick={onTogglePlay} />
            </div>
            <nav className="flex items-center w-30 justify-center bg-dark rounded-30 overflow-hidden py-5" style={{ gap: '21px' }}>
                {dumpData.navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`#${item.id}`}
                        className={`${activeNav === item.id ? "bg-info rounded-30" : ""} flex items-center justify-center`}
                        style={{ height: '38px', width: '38px' }}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavChange(item.id);
                        }}
                    >
                        <Icon name={item.icon} width="18" height="18" stroke="var(--white)" strokeWidth="1.5" className="mx-auto" />
                    </NavLink>
                ))}
            </nav>
            <div className="w-25">
                <SoundWave isPlaying={isPlaying} onClick={onTogglePlay} />
            </div>
            <div className="text-right w-10">
                <h4 className="font-600 title-text text-white">{timeString}</h4>
                <p className="font-400 mini-text text-white">{dateString}</p>
            </div>
        </div>
    );
});
ClockHeader.displayName = "ClockHeader";

// ==========================================
// 3. CALENDAR & DATE WIDGET
// ==========================================
const DateCalendarWidget = React.memo(({ currentTime }) => {
    const dayName = useMemo(
        () => currentTime.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
        [currentTime]
    );

    const dayNumber = useMemo(
        () => String(currentTime.getDate()).padStart(2, "0"),
        [currentTime]
    );

    const calendarDays = useMemo(() => {
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const blanks = Array.from({ length: firstDayIndex }, (_, i) => i);
        const dayNumbers = Array.from({ length: totalDays }, (_, i) => i + 1);

        return { blanks, dayNumbers, today: currentTime.getDate() };
    }, [currentTime]);

    return (
        <div className="box flex items-start">
            <div className="w-40">
                <p className="mini-text font-500 text-white mt-5">{dayName}</p>
                <h4 className="largemid-text font-600 text-white text-muted">{dayNumber}</h4>
            </div>
            <div className="grid-cols-7 w-60">
                {dumpData.dayHeaders.map((dh) => (
                    <p key={dh} className="mini-text icon flex items-center justify-center">
                        {dh}
                    </p>
                ))}
                {calendarDays.blanks.map((_, i) => (
                    <p className="mini-text icon flex items-center font-600 justify-center" key={`blank-${i}`} />
                ))}
                {calendarDays.dayNumbers.map((d) => (
                    <p
                        key={`day-${d}`}
                        className={`mini-text icon flex items-center justify-center ${d === calendarDays.today ? "text-white bg-info rounded-5" : ""}`}
                    >
                        {d}
                    </p>
                ))}
            </div>
        </div>
    );
});
DateCalendarWidget.displayName = "DateCalendarWidget";

// ==========================================
// 4. NETWORK CARD
// ==========================================
const NetworkCard = React.memo(() => (
    <div className="box">
        <h3 className="text-white font-600 headmini-text pb-5 flex items-center gap-8">
            <Icon name="Filter" width="12" height="12" stroke="var(--white)" /> NETWORK
        </h3>
        {dumpData.networkStats.map((item) => (
            <div key={item.id} className="flex items-center gap-12 py-10 bordb">
                <h6 className="headmini-text font-400 text-white w-25">{item.label}</h6>
                <div className="bar">
                    <i style={{ width: item.barWidth }} />
                </div>
                <p className="mini-text text-white font-300 text-muted w-10 text-right">{item.barWidth}</p>
            </div>
        ))}
    </div>
));
NetworkCard.displayName = "NetworkCard";

// ==========================================
// 5. CENTRAL REACTOR / ORB
// ==========================================
const CentralOrb = React.memo(() => {
    const circumference = useMemo(() => 2 * Math.PI * 44, []);

    return (
        <div className="relative w-full">
            <svg viewBox="0 0 520 520">
                <defs>
                    <radialGradient id="gl" cx="50%" cy="40%">
                        <stop offset="0" stopColor="#2a8cf0" />
                        <stop offset=".55" stopColor="#0a3f8f" />
                        <stop offset="1" stopColor="#021a48" />
                    </radialGradient>
                    <filter id="f">
                        <feGaussianBlur stdDeviation="4" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer Rotating Disc 1 */}
                <g className="spin" fill="none" stroke="#1b8cff" filter="url(#f)">
                    <circle cx="260" cy="260" r="255" strokeWidth="10" strokeDasharray="1.5 8.4" opacity=".7" />
                    <circle cx="260" cy="260" r="235" strokeWidth="1" opacity=".5" />
                    <circle cx="260" cy="260" r="218" strokeWidth="8" stroke="#39c6ff" strokeDasharray="90 320" strokeLinecap="round" />
                    <circle cx="260" cy="260" r="218" strokeWidth="3" strokeDasharray="4 10" opacity=".5" />
                </g>

                {/* Outer Rotating Disc 2 */}
                <g className="spin2" fill="none" filter="url(#f)">
                    <circle cx="260" cy="260" r="200" stroke="#2aa8ff" strokeWidth="6" strokeDasharray="130 200 40 240" strokeLinecap="round" />
                    <circle cx="260" cy="260" r="200" stroke="#ff3a3a" strokeWidth="5" strokeDasharray="14 1242" transform="rotate(-140 260 260)" />
                </g>

                {/* Glowing Rings */}
                <circle cx="260" cy="260" r="172" fill="none" stroke="#5fd6ff" strokeWidth="5" filter="url(#f)" />
                <circle cx="260" cy="260" r="165" fill="none" stroke="#0a5fd0" strokeWidth="2" />
                <circle cx="260" cy="260" r="152" fill="url(#gl)" filter="url(#f)" />

                <path d="M260 0V40M260 480V520" stroke="#39c6ff" strokeWidth="2" />
            </svg>

            {/* 3 Circular HUD Meters */}
            {dumpData.gauges.map((g) => (
                <div key={g.id} className={`g ${g.cls}`}>
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="47" fill="#031a3d" stroke="#0e4a94" strokeWidth="1" />
                        <circle cx="50" cy="50" r="44" fill="none" stroke="#0a3a75" strokeWidth="5" />
                        <circle
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            stroke="#3cc8ff"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${(circumference * g.val) / 100} ${circumference}`}
                            transform="rotate(-90 50 50)"
                            style={{ filter: "drop-shadow(0 0 4px #19b6ff)" }}
                        />
                    </svg>
                    <div>
                        <span>{g.label}</span>
                        <b>{g.val}%</b>
                    </div>
                </div>
            ))}
        </div>
    );
});
CentralOrb.displayName = "CentralOrb";

// ==========================================
// 6. QUICK LAUNCH
// ==========================================
const QuickLaunch = React.memo(() => (
    <div className="box mt-15">
        <div className="flex items-center justify-between gap-12">
            {dumpData.quickLaunchApps.map((app) => (
                <div key={app.id}>
                    <i
                        className="ap"
                        style={{
                            background: "linear-gradient(#ffd34d,#f0a500)",
                            borderRadius: "4px",
                            width: "40px",
                            height: "32px",
                        }}
                    />
                    <p className="mini-text text-white text-center font-300 mt-6">{app.name}</p>
                </div>
            ))}
        </div>
    </div>
));
QuickLaunch.displayName = "QuickLaunch";

// ==========================================
// 7. WEATHER WIDGET
// ==========================================
const WeatherWidget = React.memo(() => (
    <div className="box">
        <div className="flex items-center bordb pb-8">
            <div className="w-70">
                <h5 className="text-white font-600 large-text">16<sup>°c</sup></h5>
                <p className="text-white font-400 mini-text flex items-center gap-5">
                    <Icon name="Globe" width="11" height="11" stroke="var(--white)" /> Mumbai, IN
                </p>
            </div>
            <h5 className="w-30 largemid-text">🌙</h5>
        </div>
        <div className="grid-cols-6 gap-8 pt-12">
            {dumpData.weatherDays.map((d) => (
                <div key={d.day} className="text-center">
                    <p className="mini-text font-400 text-white uppercase text-muted">{d.day}</p>
                    <i className="para-text font-400 text-white">{d.icon}</i>
                </div>
            ))}
        </div>
    </div>
));
WeatherWidget.displayName = "WeatherWidget";

// ==========================================
// 8. QUICK SHORTCUTS
// ==========================================
const QuickShortcuts = React.memo(() => (
    <div className="box">
        <h4 className="text-white headmini-text font-600 pb-5">QUICK SHORTCUTS</h4>
        {dumpData.shortcuts.map((sc) => (
            <div key={sc.id} className="flex items-center justify-between bordb py-12 px-5">
                <div className="flex items-center gap-8">
                    <Icon name={sc.icon} width="14" height="14" stroke="var(--info)" />
                    <p className="text-white font-400 mini-text">{sc.label}</p>
                </div>
                <p className="text-white font-400 mini-text">{sc.kbd}</p>
            </div>
        ))}
    </div>
));
QuickShortcuts.displayName = "QuickShortcuts";

// ==========================================
// 9. NOTIFICATIONS
// ==========================================
const NotificationsWidget = React.memo(() => (
    <div className="box">
        <h3 className="text-white font-600 headmini-text pb-12 flex items-center gap-8">
            <Icon name="Globe" width="12" height="12" stroke="var(--white)" /> NOTIFICATIONS
        </h3>
        <div className="grid-cols-1 gap-12">
            {dumpData.notifications.map((item) => (
                <div key={item.id} className="flex items-center gap-5 bordb pb-10">
                    <div className="w-15">
                        <div className="icon-lg rounded-5 bg-info">
                            <Icon name={item.icon} width="18" height="18" stroke="var(--white)" />
                        </div>
                    </div>
                    <div className="w-85">
                        <h5 className="text-white font-500 headmini-text">{item.title}</h5>
                        <p className="text-white text-muted font-300 mini-text">{item.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
));
NotificationsWidget.displayName = "NotificationsWidget";

// ==========================================
// 10. AGENTS
// ==========================================
const Agents = React.memo(() => (
    <div className="box">
        <h4 className="text-white headmini-text font-600 pb-5">AGENTS</h4>
        {dumpData.agents.map((sc) => (
            <div key={sc.id} className="flex items-center justify-between bordb py-12 px-5">
                <div className="flex items-center gap-8">
                    <Icon name={sc.icon} width="14" height="14" stroke="var(--info)" />
                    <p className="text-white font-400 mini-text">{sc.label}</p>
                </div>
                <p className="text-white font-400 mini-text">{sc.kbd}</p>
            </div>
        ))}
    </div>
));
Agents.displayName = "Agents";

// ==========================================
// 11. CHAT UI WIDGET (BARASINGHA AI PROTOCOL)
// ==========================================
const ChatWidget = React.memo(() => {
    const messages = useMemo(
        () => [
            {
                id: 1,
                text: "Greetings, Commander. Barasingha AI Core v1.0 is initialized and operational. Quantum neural link established with sub-agents (VERONIKA, JACK, CLUSTER). How may I assist your mission today?",
            }
        ],
        []
    );
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    return (
        <div className="box">
            {messages.map((msg) => (
                <div className="overflow-auto" style={{ height: '560px' }} key={msg.id}>
                    {msg.text.split("\n").map((line, i) => (
                        <p key={i} className="para-text font-200 text-white text-muted">
                            {line}
                        </p>
                    ))}
                </div>
            ))}

            <div ref={messagesEndRef} />
        </div>
    );
});
ChatWidget.displayName = "ChatWidget";

// ==========================================
// 12. MAIN CONVERTED JARVIS DASHBOARD PAGE
// ==========================================
const JarvisDashboard = () => {
    const [activeNav, setActiveNav] = useState("home");
    const [currentTime, setCurrentTime] = useState(() => new Date());
    const [isPlaying, setIsPlaying] = useState(true);
    const [isChat, setIsChat] = useState(false);

    // Real-time clock tick every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleNavChange = useCallback((id) => {
        setActiveNav(id);
    }, []);

    const handleTogglePlay = useCallback(() => {
        setIsPlaying((prev) => !prev);
    }, []);

    return (
        <div className="jarvis-dashboard-wrapper">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

        .jarvis-dashboard-wrapper {
          --bg: #010817; --line: #1b8cff; --g: #19b6ff; --t: #e8f5ff; --m: #8db3d8; --ok: #2be36b;
          box-sizing: border-box;
          background: radial-gradient(ellipse at 50% 45%, #06336e 0%, #021230 45%, var(--bg) 80%);
          color: var(--t);
          height: 100vh;
          overflow: hidden;
        }

        .box, .head-box {
          position: relative;
          background: linear-gradient(160deg, rgba(7, 36, 78, 0.82), rgba(2, 14, 36, 0.92));
          border: 1px solid rgba(27, 140, 255, 0.75);
          box-shadow: 0 0 14px rgba(25, 182, 255, 0.2), inset 0 0 18px rgba(25, 182, 255, 0.17);
          border-radius: 5px;
          padding: 16px;
        }
        .head-box { padding: 10px 16px; border-radius: 0; }

        .box:before, .box:after, .head-box:before, .head-box:after {
          content: ""; position: absolute; width: 14px; height: 14px;
          border: 2px solid #4fd0ff; filter: drop-shadow(0 0 4px #19b6ff); pointer-events: none;
        }
        .box:before, .head-box:before { left: -1px; top: -1px; border-style: solid none none solid; border-radius: 5px 0 0; }
        .box:after, .head-box:after { right: -1px; bottom: -1px; border-style: none solid solid none; border-radius: 0 0 5px; }

        .wave { height: 48px; }
        .wave b {
          width: 2px; background: var(--g); box-shadow: 0 0 6px var(--g);
          border-radius: 2px; display: inline-block; transform-origin: center; will-change: transform;
        }
        @keyframes voiceWave1 { 0%, 100% { transform: scaleY(.18); opacity: .5; } 35% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } 70% { transform: scaleY(.38); opacity: .7; } }
        @keyframes voiceWave2 { 0%, 100% { transform: scaleY(.25); opacity: .55; } 50% { transform: scaleY(.95); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } 80% { transform: scaleY(.2); opacity: .5; } }
        @keyframes voiceWave3 { 0%, 100% { transform: scaleY(.15); opacity: .45; } 28% { transform: scaleY(.55); opacity: .8; } 70% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 4px #19b6ff); } }

       .bar { flex: 1; height: 5px; background: #0a2a52; border-radius: 3px; overflow: hidden; }
        .bar i { display: block; height: 100%; background: linear-gradient(90deg, #0a7cff, #3cd0ff); box-shadow: 0 0 8px var(--g); }
        .spin, .spin2 { transform-origin: 260px 260px; animation: sp 60s linear infinite; }
        .spin2 { animation: sp 18s linear infinite reverse; }
        @keyframes sp { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .spin, .spin2 { animation: none; } }

       .g { position: absolute; width: 21%; aspect-ratio: 1; }
        .g svg { width: 100%; height: 100%; }
        .g div { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; font-family: 'Orbitron', sans-serif; }
        .g b { font-size: clamp(15px, 2.6vw, 25px); }
        .g span { font-size: 13px; color: #cfeaff; }
        .g1 { left: -9%; top: 36%; }
        .g2 { left: 1%; bottom: -2%; }
        .g3 { right: 1%; bottom: -2%; }
        .ap { display: grid; place-items: center; width: 48px; height: 48px; margin: 0 auto 4px; font-family: 'Rajdhani', sans-serif; font-weight: 800; font-size: 20px; cursor: pointer; }
        @media (max-width: 1100px) { .g { width: 24%; } }
      `}</style>

            <div className="">
                <ClockHeader
                    activeNav={activeNav}
                    onNavChange={handleNavChange}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    onTogglePlay={handleTogglePlay}
                />

                <div className="w-full py-10">
                    <div className="flex items-start gap-12">
                        <div className="w-25 grid-cols-1 gap-12">
                            <DateCalendarWidget currentTime={currentTime} />
                            <NotificationsWidget />
                            <Agents />
                        </div>

                        <div className="w-50">
                            <div className="w-full">
                                {isChat ? (
                                    <div style={{ height: '590px' }}>
                                        <ChatWidget />
                                    </div>
                                ) : (
                                    <div className="w-80 m-auto flex items-center relative" style={{ height: '590px' }}>
                                        <CentralOrb />
                                    </div>
                                )}
                                <QuickLaunch />
                            </div>
                        </div>

                        <div className="w-25 grid-cols-1 gap-12">
                            <WeatherWidget />
                            <NetworkCard />
                            <QuickShortcuts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(JarvisDashboard);
