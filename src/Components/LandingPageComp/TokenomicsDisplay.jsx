

const TokenomicsDisplay = () => {
    const features = [
        {
            title: "Distribution Model",
            description: "30% allocated to  rewards, 25% for liquidity stability, and a 0.1% burn fee on transactions to enhance scarcity and long-term value.",
            icon: "🔄"
        },
        {
            title: " Compatible",
            description: "Tiered  model offering APYs from 20% to 70% based on lock periods and  amounts, rewarding long-term commitment.",
            icon: "💎"
        },
        {
            title: "Sustainable Growth",
            description: "Backed by strategic allocations for marketing, team incentives, and pre-sale, ensuring a well-supported and scalable token economy.",
            icon: "📈"
        }
    ];

    const stats = [
        { label: "Total Supply", value: "15,000,000,000 Tokens" },
        { label: "Owner and Family", value: "2,250,000,000 Tokens (15%)" },
        { label: "Private Sale", value: "2,250,000,000 Tokens (15%)" },
        { label: "Public Sale (IDO/IEO)", value: "2,250,000,000 Tokens (15%)" },
        { label: "Ecosystem & Partnerships", value: "3,000,000,000 Tokens (20%)" },
        { label: "Liquidity & Market Making", value: "2,250,000,000 Tokens (15%)" },
        { label: "Airdrops & Community Incentives", value: "3,000,000,000 Tokens (20%)" },
    ];
    
    return (
        <div className="min-h-screen bg-[#3B1C09] p-6 relative overflow-hidden py-[8%] ">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-600/30 to-yellow-500/30 blur-3xl" />

            <div className="max-w-6xl mx-auto relative">
                <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 text-white">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
                            Tokenomics Plan for Democracy Coin
                        </h1>
                        <p className="text-lg text-gray-300">
                            A comprehensive tokenomics structure, with strategic  rewards and sustainable economic growth, designed for long-term stability.
                        </p>
                        <button className="bg-gradient-to-tr from-yellow-400 to-yellow-800 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            Join Democracy
                        </button>
                    </div>

                    {/* Right Column - Features Cards */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                {/* Glassmorphic Card */}
                                <div className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/15">
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-white">
                                            {feature.title}
                                        </h3>
                                        <span className="text-2xl">
                                            {feature.icon}
                                        </span>
                                    </div>

                                    {/* Card Description */}
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-4 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20">
                            <div className="text-sm text-gray-400">{stat.label}</div>
                            <div className="text-[14px] font-semibold">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TokenomicsDisplay;
