import React, { useMemo, useCallback, memo } from "react";
import Chart from "react-apexcharts";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Icon from "../../components/common/Icon";
import Accordion from "../../components/common/Accordion";
import { showToast } from "../../components/common/Toast";


const BalanceCard = memo(({ onAction }) => (
    <div className="bg-white rounded-10 p-20 relative">
        <div className="flex items-center gap-10 bordb pb-15">
            <div className="icon-lg bg-tertiary rounded-5">
                <Icon name="Rocket" width="20" height="20" stroke='var(--dark)' />
            </div>
            <div>
                <h4 className="mid-text font-600 text-dark">Kaiom Digital Marketing Suite</h4>
                <p className="mini-text font-400 text-gray">Website Performance & Inbound Lead Engine</p>
            </div>
        </div>
        <p className="small-text font-400 text-gray py-16">
            Empower your website with Kaiom’s digital marketing intelligence. We seamlessly combine advanced technical SEO, high-intent Meta ad campaigns, and Microsoft Clarity behavioral heatmaps to maximize inbound leads while ensuring 100% GDPR and CCPA privacy compliance.
        </p>
        <div className="flex items-center gap-10">
            <Button
                version="v2"
                bg="#18181b"
                color="white"
                icon="Search"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction("SEO Audit")}
                text="SEO Audit"
                className="rounded-30 flex-1 font-500 shadow-sm"
            />
            <Button
                version="v2"
                bg="forth"
                color="dark"
                icon="Meta"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction("Meta Ads")}
                text="Meta Ads"
                className="rounded-30 flex-1 font-500"
            />
            <Button
                version="v2"
                bg="forth"
                color="dark"
                icon="ShieldCheck"
                iconWidth="14"
                iconHeight="14"
                onClick={() => onAction("Clarity & Privacy")}
                text="Clarity & Privacy"
                className="rounded-30 flex-1 font-500"
            />
        </div>
    </div>
));
BalanceCard.displayName = "BalanceCard";

const EarningCard = memo(() => {
    const series = useMemo(
        () => [
            {
                name: "Qualified Leads",
                data: [26, 80, 41, 65, 54, 46, 70, 46, 65, 20, 46, 62],
            },
        ],
        []
    );

    const options = useMemo(() => {
        const addTopBorders = (chart) => {
            try {
                const el = chart?.el;
                if (!el) return;
                const bars = el.querySelectorAll(".apexcharts-bar-area");
                const existingCaps = el.querySelectorAll(".custom-bar-top-cap");
                existingCaps.forEach((c) => c.remove());

                bars.forEach((bar, index) => {
                    const bbox = bar.getBBox();
                    if (!bbox || bbox.width === 0) return;
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("class", "custom-bar-top-cap");
                    line.setAttribute("x1", bbox.x);
                    line.setAttribute("y1", bbox.y);
                    line.setAttribute("x2", bbox.x + bbox.width);
                    line.setAttribute("y2", bbox.y);
                    line.setAttribute("stroke", index === 6 ? "#ff5200" : "#cbd5e1");
                    line.setAttribute("stroke-width", "2.5");
                    line.setAttribute("stroke-linecap", "butt");
                    line.style.pointerEvents = "none";
                    bar.parentNode.appendChild(line);
                });
            } catch (e) {
                // Safe fallback
            }
        };

        return {
            chart: {
                type: "bar",
                height: 220,
                toolbar: { show: false },
                fontFamily: "inherit",
                events: {
                    mounted: (chart) => setTimeout(() => addTopBorders(chart), 20),
                    updated: (chart) => setTimeout(() => addTopBorders(chart), 20),
                    animationEnd: (chart) => setTimeout(() => addTopBorders(chart), 10),
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: "82%",
                    borderRadius: 0,
                    distributed: true,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 0,
                    opacityFrom: 0.28,
                    opacityTo: 0.02,
                    stops: [0, 100],
                },
            },
            colors: [
                "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8",
                "#ff5200",
                "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8", "#94a3b8",
            ],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            grid: {
                borderColor: "#f1f5f9",
                strokeDashArray: 3,
                yaxis: { lines: { show: true } },
                xaxis: { lines: { show: false } },
                padding: { top: 10, right: 8, bottom: 0, left: 8 },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                    style: {
                        colors: [
                            "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af",
                            "#4b5563",
                            "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af", "#9ca3af",
                        ],
                        fontSize: "11px",
                        fontWeight: [400, 400, 400, 400, 400, 400, 600, 400, 400, 400, 400, 400],
                    },
                },
            },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,
                labels: {
                    formatter: (val) => `${Math.round(val)}k`,
                    style: {
                        colors: "#9ca3af",
                        fontSize: "11px",
                    },
                },
            },
            tooltip: {
                theme: "light",
                y: {
                    formatter: (val) => `${val}k Leads`,
                },
            },
            annotations: {
                points: [
                    {
                        x: "Jul",
                        y: 70,
                        marker: { size: 0 },
                        label: {
                            borderColor: "transparent",
                            borderWidth: 0,
                            style: {
                                color: "#ff5200",
                                background: "transparent",
                                fontSize: "11px",
                                fontWeight: 600,
                                padding: { left: 0, right: 0, top: 0, bottom: 0 },
                            },
                            offsetY: -6,
                            text: "76.3k",
                        },
                    },
                ],
            },
        };
    }, []);

    return (
        <div className="bg-white rounded-10 p-20">
            <div className="flex items-center gap-10 bordb pb-15">
                <div className="icon-lg bg-tertiary rounded-5">
                    <Icon name="Trending" width="20" height="20" stroke='var(--dark)' />
                </div>
                <div>
                    <h4 className="mid-text font-600 text-dark">Inbound Lead Generation</h4>
                    <p className="mini-text font-400 text-gray">SEO + Meta Ads Multi-Touch Pipeline</p>
                </div>
            </div>
            <Chart options={options} series={series} type="bar" height={250} />
        </div>
    );
});
EarningCard.displayName = "EarningCard";

const NetProfitCard = memo(() => (
    <div
        className="bg-white rounded-10 p-20"
    >
        <div>
            <div className="flex items-center gap-8 mb-12">
                <div
                    className="flex items-center justify-center icon bg-tertiary"
                >
                    <Icon name="Customers" width="16" height="16" stroke='var(--dark)' />
                </div>
                <p className="font-600 text-dark para-text">
                    Total Inbound Leads
                </p>
            </div>
            <h4 className="font-600 text-dark title-text">
                28,450
            </h4>
            <Badge
                text="+34.8% via Kaiom Suite"
                icon="ArrowUpRight"
                size="md"
                shape="pill"
                bg="#fff4ed"
                textColor="#ff5200"
                borderColor="transparent"
                className="font-600 mt-8"
            />
        </div>
    </div>
));
NetProfitCard.displayName = "NetProfitCard";

const FinancialReportCard = memo(() => (
    <div
        className="rounded-10 p-14 bg-warning"
    >
        <h4 className="text-white font-600 title-text">Lead Channels</h4>
        <p className="mini-text mt-2 text-muted text-white">
            Attribution & Conversion ROI
        </p>
        <div className="grid-cols-3 mt-16">
            <div>
                <p className="text-white font-400 mini-text text-muted">Organic SEO</p>
                <p className="text-white font-500 para-text">46.5%</p>
            </div>
            <div>
                <p className="text-white font-400 mini-text text-muted">Meta Ads</p>
                <p className="text-white font-500 para-text">38.2%</p>
            </div>
            <div>
                <p className="text-white font-400 mini-text text-muted">Clarity UX</p>
                <p className="text-white font-500 para-text">+32% CVR</p>
            </div>
        </div>
    </div>
));
FinancialReportCard.displayName = "FinancialReportCard";

const SavingsGoalsCard = memo(({ accordionItems }) => (
    <div className="rounded-10 p-20 bg-dark">
        <div className="flex items-center gap-10 bordb pb-15">
            <div className="icon-lg bg-white rounded-5">
                <Icon name="ShieldCheck" width="20" height="20" stroke='var(--dark)' />
            </div>
            <div>
                <h4 className="mid-text font-600 text-white">Growth & Compliance Pillars</h4>
                <p className="mini-text font-400 text-white text-muted">Kaiom Marketing Tool Integration</p>
            </div>
        </div>
        <Accordion
            items={accordionItems}
            version="v2"
            allowMultiple={false}
            itemClassName=""
        />
    </div>
));
SavingsGoalsCard.displayName = "SavingsGoalsCard";

const Node = () => {
    const handleAction = useCallback((type) => {
        showToast(`${type} initiated successfully!`, "info");
    }, []);

    const savingsGoalsAccordionItems = useMemo(
        () => [
            {
                id: "seo",
                title: (
                    <div className="flex items-center gap-12">
                        <Icon name="Search" width="16" height="16" stroke="#d1d5db" />
                        <p className="font-500 text-white small-text">
                            SEO & Organic Search <span className="text-gray ml-4">94% Health</span>
                        </p>
                    </div>
                ),
                children: (
                    <div className="grid-cols-3 gap-12 w-full">
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Top 3 Rankings
                            </p>
                            <p className="font-500 text-gray mini-text">
                                142 Keywords (+38%)
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Organic Traffic
                            </p>
                            <p className="font-500 text-gray mini-text">
                                184.2k Monthly Visits
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Core Web Vitals
                            </p>
                            <p className="font-500 text-gray mini-text">
                                98/100 Mobile Speed
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                id: "meta",
                title: (
                    <div className="flex items-center gap-12">
                        <Icon name="Meta" width="16" height="16" stroke="#d1d5db" />
                        <p className="font-500 text-white small-text">
                            Meta Ads & Lead Funnels <span className="text-gray ml-4">4.8x ROAS</span>
                        </p>
                    </div>
                ),
                children: (
                    <div className="grid-cols-3 gap-12 w-full">
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Cost Per Lead
                            </p>
                            <p className="font-500 text-gray mini-text">
                                $6.40 (-42% CPL)
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Click-Through Rate
                            </p>
                            <p className="font-500 text-gray mini-text">
                                3.85% High Intent
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Retargeting Pipeline
                            </p>
                            <p className="font-500 text-gray mini-text">
                                1,420 Active Leads
                            </p>
                        </div>
                    </div>
                ),
            },
            {
                id: "clarity_privacy",
                title: (
                    <div className="flex items-center gap-12">
                        <Icon name="ShieldCheck" width="16" height="16" stroke="#d1d5db" />
                        <p className="font-500 text-white small-text">
                            Microsoft Clarity & Privacy <span className="text-gray ml-4">100% Compliant</span>
                        </p>
                    </div>
                ),
                children: (
                    <div className="grid-cols-3 gap-12 w-full">
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Clarity Heatmaps
                            </p>
                            <p className="font-500 text-gray mini-text">
                                -58% Dead Clicks
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Form Drop-off Fix
                            </p>
                            <p className="font-500 text-gray mini-text">
                                +34.2% Completion
                            </p>
                        </div>
                        <div className="bg-white p-12 rounded-5">
                            <p className="font-500 text-dark para-text">
                                Privacy & Consent
                            </p>
                            <p className="font-500 text-gray mini-text">
                                GDPR & CCPA Shield
                            </p>
                        </div>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <Container>
            <div className="flex gap-12 items-start w-full">
                <div className="grid-cols-1 gap-12 w-55">
                    <BalanceCard onAction={handleAction} />
                    <EarningCard />
                </div>

                <div className="grid-cols-1 gap-12 w-45">
                    <div className="grid-cols-2 gap-12">
                        <NetProfitCard />
                        <FinancialReportCard />
                    </div>

                    <SavingsGoalsCard
                        accordionItems={savingsGoalsAccordionItems}
                    />
                </div>
            </div>
        </Container>
    );
};

export default memo(Node);