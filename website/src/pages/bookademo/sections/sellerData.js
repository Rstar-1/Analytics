export const HERO_DESCRIPTION =
  'We are a results-driven IT consulting team helping businesses unlock efficiency, scale operations, and improve customer experience.';

export const sellerTypes = [
  {
    id: 'manufacture',
    name: 'Manufacture',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fdba74 25%, #ea580c 60%, #9a3412 100%)',
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    category: 'PRODUCTION & SUPPLY CHAIN',
    features: [
      { icon: 'Product', label: 'Batch production tracking' },
      { icon: 'Inventory', label: 'Raw material inventory sync' },
      { icon: 'Check', label: 'Automated dispatch verification' }
    ],
    collaboratesWith: ['Trader', 'Stockist']
  },
  {
    id: 'trader',
    name: 'Trader',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #94a3b8 25%, #334155 60%, #0f172a 100%)',
    accentColor: '#334155',
    glowColor: 'rgba(51, 65, 85, 0.35)',
    category: 'COMMODITY & LIQUIDITY',
    features: [
      { icon: 'TrendingUp', label: 'Real-time bid-ask matching' },
      { icon: 'CreditCard', label: 'Margin & credit clearance' },
      { icon: 'Receipt', label: 'Multi-currency settlement' }
    ],
    collaboratesWith: ['Manufacture', 'Wholeseller']
  },
  {
    id: 'vendor',
    name: 'Vendor',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #93c5fd 25%, #2563eb 60%, #1e3a8a 100%)',
    accentColor: '#2563eb',
    glowColor: 'rgba(37, 99, 235, 0.35)',
    category: 'SUPPLIER PROCUREMENT',
    features: [
      { icon: 'Users', label: 'Catalog management' },
      { icon: 'ShoppingBag', label: 'Automated purchase orders' },
      { icon: 'Check', label: 'Quality compliance audits' }
    ],
    collaboratesWith: ['Wholeseller', 'Stockist']
  },
  {
    id: 'stockist',
    name: 'Stockist',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fde047 25%, #d97706 60%, #78350f 100%)',
    accentColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.35)',
    category: 'BUFFER & INVENTORY DEPOT',
    features: [
      { icon: 'Inventory', label: 'Dynamic reorder triggers' },
      { icon: 'Rotate', label: 'FIFO stock rotation alerts' },
      { icon: 'ShieldCheck', label: 'Multi-depot balancing' }
    ],
    collaboratesWith: ['Manufacture', 'Retailer']
  },
  {
    id: 'wholeseller',
    name: 'Wholeseller',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #d8b4fe 25%, #9333ea 60%, #581c87 100%)',
    accentColor: '#9333ea',
    glowColor: 'rgba(147, 51, 234, 0.35)',
    category: 'BULK FULFILLMENT',
    features: [
      { icon: 'Box', label: 'Volume pricing automation' },
      { icon: 'Truck', label: 'Consignment routing' },
      { icon: 'Orders', label: 'Cross-docking dispatch' }
    ],
    collaboratesWith: ['Vendor', 'Retailer']
  },
  {
    id: 'retailer',
    name: 'Retailer',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #86efac 25%, #16a34a 60%, #14532d 100%)',
    accentColor: '#16a34a',
    glowColor: 'rgba(22, 163, 74, 0.35)',
    category: 'OMNICHANNEL POINT OF SALE',
    features: [
      { icon: 'Cart', label: 'Store POS & barcode sync' },
      { icon: 'Reviews', label: 'Instant consumer checkout' },
      { icon: 'Heart', label: 'Customer loyalty engine' }
    ],
    collaboratesWith: ['Wholeseller', 'Vendor']
  },
  {
    id: 'sector',
    name: 'Sector',
    sphereGradient: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #fca5a5 25%, #dc2626 60%, #7f1d1d 100%)',
    accentColor: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.35)',
    category: 'ECOSYSTEM GOVERNANCE',
    features: [
      { icon: 'Network', label: 'Trade corridor coordination' },
      { icon: 'Building', label: 'Regulatory compliance' },
      { icon: 'Globe', label: 'Market index benchmarking' }
    ],
    collaboratesWith: ['Manufacture', 'Trader']
  }
];

export const SELLER_DETAILS = {
  manufacture: {
    tagline: 'Primary Producer & Automated Factory Engine',
    description: 'Drives large-scale raw material processing, multi-stage assembly runs, quality batch serialization, and dock-ready dispatch fulfillment for downstream trade partners.',
    metrics: [
      { label: 'Monthly Output', value: '250K Units', icon: 'Box' },
      { label: 'Defect Rate', value: '< 0.08%', icon: 'ShieldCheck' },
      { label: 'On-Time Dispatch', value: '99.4%', icon: 'Truck' },
      { label: 'QA Compliance', value: '100% ISO', icon: 'Check' }
    ],
    channels: {
      sourcing: 'Raw Material Refiners & Mining Syndicates',
      dispatch: 'Trading Desks, Regional Depots & Bulk Wholesalers'
    }
  },
  trader: {
    tagline: 'Commodity Arbitrage & Liquidity Settlement Desk',
    description: 'Facilitates high-speed spot and forward contract clearance, bilateral counterparty risk management, multi-currency escrow, and volume liquidity balancing across global markets.',
    metrics: [
      { label: 'Daily Liquidity', value: '$4.2M+', icon: 'TrendingUp' },
      { label: 'Order Matching', value: '< 24 ms', icon: 'Zap' },
      { label: 'FX Optimization', value: '0.12% Spread', icon: 'Receipt' },
      { label: 'Escrow Settlement', value: 'T+0 Instant', icon: 'CreditCard' }
    ],
    channels: {
      sourcing: 'Primary Fabricators & International Refineries',
      dispatch: 'Tier-1 Wholesalers, Commodity Hubs & Import Consortia'
    }
  },
  vendor: {
    tagline: 'Component Supplier & Specialized Catalog Provider',
    description: 'Supplies vetted industrial sub-assemblies, spare components, specialized catalog items, and contract replenishment feeds directly into enterprise corporate procurement workflows.',
    metrics: [
      { label: 'Active Catalog', value: '18,500+ SKUs', icon: 'Product' },
      { label: 'PO Turnaround', value: '< 15 Mins', icon: 'Clock' },
      { label: 'Order Fill Rate', value: '98.9%', icon: 'ShoppingCart' },
      { label: 'Vendor Rating', value: '4.9 / 5.0', icon: 'Star' }
    ],
    channels: {
      sourcing: 'OEM Component Fabricators & Specialty Foundries',
      dispatch: 'Regional Wholesalers & Buffer Stockists'
    }
  },
  stockist: {
    tagline: 'Regional Buffer Depot & Cross-Dock Distribution Hub',
    description: 'Maintains strategic safety stocks, minimizes storage carrying costs via algorithmic demand forecasting, prevents stockouts, and balances stock levels across nationwide hub networks.',
    metrics: [
      { label: 'Depot Footprint', value: '1.2M sq. ft.', icon: 'Building' },
      { label: 'Inventory Turn', value: '14.2x / Year', icon: 'Rotate' },
      { label: 'FIFO Precision', value: '99.9%', icon: 'ShieldCheck' },
      { label: 'Local Dispatch', value: '< 4 Hours', icon: 'Truck' }
    ],
    channels: {
      sourcing: 'Domestic Producers & Import Traders',
      dispatch: 'High-Velocity Retailers & Local Merchants'
    }
  },
  wholeseller: {
    tagline: 'Volume B2B Distributor & Consignment Router',
    description: 'Aggregates massive volumes across hundreds of manufacturers and suppliers, breaks bulk into commercial carton quantities, and provides regional credit terms to store networks.',
    metrics: [
      { label: 'Daily Shipments', value: '3,800+ Packs', icon: 'Box' },
      { label: 'Volume Tiering', value: 'Up to 34%', icon: 'Percent' },
      { label: 'Fleet Route Eff.', value: '95.2%', icon: 'Truck' },
      { label: 'Credit Line Auth', value: 'NET 30 / 60', icon: 'Receipt' }
    ],
    channels: {
      sourcing: 'Direct Manufacturers, Traders & Vendors',
      dispatch: 'Retail Store Chains, Supermarkets & Co-ops'
    }
  },
  retailer: {
    tagline: 'Omnichannel POS & Last-Mile Consumer Storefront',
    description: 'Unifies brick-and-mortar checkout registers, digital storefronts, mobile point-of-sale systems, customer loyalty programs, and click-and-collect fulfillment channels.',
    metrics: [
      { label: 'Daily Shoppers', value: '48,000+', icon: 'Users' },
      { label: 'Scan-To-Pay', value: '< 10 Sec', icon: 'Cart' },
      { label: 'Repeat Loyalty', value: '68.5%', icon: 'Heart' },
      { label: 'Stock Sync Latency', value: '< 1.5 Sec', icon: 'Rotate' }
    ],
    channels: {
      sourcing: 'Wholesale Distributors & Regional Stockists',
      dispatch: 'Walk-in Shoppers, Delivery Couriers & Online Customers'
    }
  },
  sector: {
    tagline: 'Cross-Industry Registry & Trade Governance Hub',
    description: 'Monitors cross-border trade corridors, enforces tax transparency, ensures ESG and labor standard adherence, and provides market index benchmarks to protect all participants.',
    metrics: [
      { label: 'Monitored Hubs', value: '14,000+ Nodes', icon: 'Network' },
      { label: 'Regulatory Rating', value: '100% Tax Compliant', icon: 'ShieldCheck' },
      { label: 'Audit Speed', value: '< 24 Hours', icon: 'Clock' },
      { label: 'ESG Benchmark', value: 'Grade AAA', icon: 'Globe' }
    ],
    channels: {
      sourcing: 'Government Registries, Customs Portals & Trade Councils',
      dispatch: 'Registered Producers, Trading Desks & Financial Institutions'
    }
  }
};

export const sellerNames = sellerTypes.map((s) => s.name);
