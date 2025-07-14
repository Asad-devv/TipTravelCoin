

const Whitepaper = () => {
    const whitepaperContent = [
        {
            id: 1,
            title: "Introduction",
    
            content: "Democracy Coin (HZC) is a next-generation digital asset built on the Polygon (Matic) Layer 2 blockchain. The project is designed to provide a scalable and efficient  and reward mechanism, fostering a community-driven ecosystem through innovative  tiers, real-world events, and streamlined tokenomics. Democracy Coin's goal is to redefine community engagement and reward systems within the decentralized finance (DeFi) space."
        },
        {
            id: 2,
            title: "Vision",

            content: "Democracy Coin envisions an ecosystem where decentralized finance meets practical engagement. By leveraging Layer 2 scalability, Democracy Coin aims to offer low-cost and efficient transactions, a  model with tiered APY, and real-world benefits for the community."
        },
        {
            id: 3,
            title: "Tokenomics",
     
            content: "Democracy Coin's total supply is 50,000,000,000 tokens. The supply breakdown is meticulously planned to support the liquidity, rewards, marketing, and development needs of the project. Here is the detailed breakdown:\n\n-  Rewards: 30% of total supply (15,000,000,000 tokens)\n- Liquidity Pool: 25% of total supply (12,500,000,000 tokens)\n- Pre-Sale Allocation: 25% of total supply (12,500,000,000 tokens)\n- Team & Advisors: 11% of total supply (5,500,000,000 tokens)\n- Marketing & Promotions: 9% of total supply (4,500,000,000 tokens)"
        },
        {
            id: 4,
            title: "Burn Fee",
 
            content: "Democracy Coin incorporates a 0.1% burn fee per transaction, which will incrementally reduce the total supply and increase scarcity over time. This feature is designed to create long-term value for HZC holders."
        },
        {
            id: 5,
            title: " Mechanism",
  
            content: "Democracy Coin’s  mechanism is designed to reward community members for holding and  their tokens. The  APY is tiered based on lock periods to provide flexibility for stakers. The following APY ranges are offered:\n\n- Short-term : 20% APY for shorter lock periods\n- Long-term : Up to 70% APY for extended lock periods"
        },
        {
            id: 6,
            title: "Unique  Features",
    
            content: "Democracy Coin's  model incentivizes commitment through higher APY for longer lock periods.  rewards are distributed in HZC tokens, aligning the interest of stakers with the project's growth. Additionally, the  model is coupled with algorithmic adjustments to maintain sustainability over time."
        },
        {
            id: 7,
            title: "Community Engagement",
       
            content: "Democracy Coin is more than just a digital asset; it aims to build a vibrant community under the brand 'Democracy Society.' The Democracy Society is positioned to host discussions, events, and a variety of content to engage and educate its members on DeFi, finance, and personal development."
        },
        {
            id: 8,
            title: "Real-World Events",
           
            content: "In addition to the online community, Democracy Society will host exclusive real-world events for HZC holders. These events will range from investment opportunities to exclusive gatherings that reward long-term and active community members."
        },
        {
            id: 9,
            title: "The Inner Circle",
           
            content: "Democracy Society’s Inner Circle offers an exclusive group for high-net-worth individuals and experienced professionals. This section focuses on key topics such as:\n\n- Market Insights\n- Wealth Management\n- Networking\n- Investment Opportunities\n- Technology and Innovation\n- Personal Development\n- High-Value Lifestyle\n\nFor the most elite members, Democracy Society offers The Lab, an area dedicated to high-level business discussions and opportunities."
        },
        {
            id: 10,
            title: "Technology & Scalability",
        
            content: "Democracy Coin leverages Polygon (Matic) as its Layer 2 solution to provide fast, secure, and scalable transactions. By adopting Polygon, Democracy Coin benefits from low gas fees and increased transaction throughput, making it accessible for all users."
        },
        {
            id: 11,
            title: "Smart Contracts & Security",
           
            content: "Democracy Coin’s smart contracts are rigorously audited to ensure transparency, security, and reliability. The contracts include provisions for , liquidity rewards, and dynamic burn mechanics to promote a sustainable ecosystem."
        },
        {
            id: 12,
            title: "Token Sale & Allocation",
         
            content: "Democracy Coin allocates 25% of the total supply (12,500,000,000 tokens) to the pre-sale. The funds raised during the pre-sale will be used to develop the Democracy ecosystem, strengthen liquidity pools, and support marketing initiatives."
        },
        {
            id: 13,
            title: "Roadmap",
     
            content: "Democracy Coin's roadmap includes three phases:\n\n- Phase 1: Foundation & Development\n  - Project conceptualization and tokenomics design\n  - Smart contract audits and Layer 2 integration\n  - Pre-sale and initial liquidity provision\n\n- Phase 2: Community & \n  - Launch of  mechanism with tiered APY\n  - Development of the Democracy Society community platform\n  - Real-world events and exclusive gatherings for early adopters\n\n- Phase 3: Expansion & Innovation\n  - Introduction of new  features and algorithmic adjustments\n  - Launch of The Inner Circle and The Lab\n  - Strategic partnerships and collaborations with industry leaders"
        },
        {
            id: 14,
            title: "Conclusion",
    
            content: "Democracy Coin is designed to provide a sustainable and community-driven digital asset experience. Through its well-planned tokenomics, engaging community model, and focus on real-world benefits, Democracy Coin aims to create an ecosystem where holders are rewarded both financially and personally.\n\nJoin Democracy Coin today and be part of a financial revolution shaped by the community, for the community."
        },
        {
            id: 15,
            title: "Disclaimer",
       
            content: "This whitepaper is provided for informational purposes only and does not constitute financial advice. Investing in cryptocurrencies involves risk, and potential investors should conduct their own due diligence before making any investments."
        }
    ];



    return (
        <div className="min-h-screen bg-[#3B1C08] relative py-20 px-6 lg:pt-[9%] pt-[29%]">
            {/* Gradient effects */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/20 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-6">
                        Democracy Coin Whitepaper
                    </h1>
                    <p className="text-gray-400 leading-relaxed">
                    
                    </p>
                </div>

                {/* Disclaimer Sections */}
                <div className="space-y-6">
                    {whitepaperContent.map((section) => (
                        <div
                            key={section.id}
                            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex lg:flex-row flex-col items-start lg:gap-4 gap-6">
                                
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </div>
    );
};

export default Whitepaper;