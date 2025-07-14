import React from 'react';
import { Shield, Banknote, Clock, Lock } from 'lucide-react';

const PlatformFeatures = () => {
    const revenueFeatures = [
        {
            title: "Revenue Sources",
            description: "Transaction fees, platform subscriptions, exclusive events, and brand collaborations.",
            icon: <Banknote className="w-8 h-8 text-orange-400" />,
        },
        {
            title: "Burn and Buyback Program",
            description: "Strategic buybacks funded by revenue to maintain scarcity and increase value.",
            icon: <Clock className="w-8 h-8 text-orange-400" />,
        }
    ];

    const securityFeatures = [
        {
            title: "Smart Contract Audits",
            description: "Regular external audits to ensure security and transparency.",
            icon: <Shield className="w-8 h-8 text-orange-400" />,
        },
        {
            title: "Vesting and Lock-Up Mechanisms",
            description: "Structured vesting schedules for the team and pre-sale participants to build trust.",
            icon: <Lock className="w-8 h-8 text-orange-400" />,
        }
    ];

    return (
        <div className="min-h-screen bg-[#3B1C09] p-6 py-[8%]  ">
            <div className="max-w-6xl mx-auto py-12">
                {/* Revenue and Sustainability Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex flex-col gap-2">
                        Revenue and Sustainability
                    </h1>
                 
                </div>

                {/* Features Grid for Revenue and Sustainability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {revenueFeatures.map((feature, index) => (
                        <div key={index} className="relative group">
                            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-yellow-300/20 border border-purple-500/20 p-8 transition-all duration-300 hover:bg-yellow-900/30">
                                {/* Icon Container */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-50" />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="mb-4 inline-block p-3 bg-black rounded-xl">
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-[19px] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity" />
                        </div>
                    ))}
                </div>

            

                {/* Features Grid for Security and Transparency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="relative group">
                            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-yellow-300/20 border border-purple-500/20 p-8 transition-all duration-300 hover:bg-yellow-900/30">
                                {/* Icon Container */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-50" />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="mb-4 inline-block p-3 bg-black rounded-xl">
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-[19px] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity" />
                        </div>
                    ))}
                </div>

               
            </div>
        </div>
    );
};

export default PlatformFeatures;
