
import { AlertTriangle, Shield, Users, TrendingDown, Scale } from 'lucide-react';

const DisclaimerPage = () => {
    const disclaimerSections = [
        {
            id: 1,
            title: 'No Guarantees',
            icon: TrendingDown,
            content: 'Participation in Democracy Society, including but not limited to , voting, and other forms of engagement, does not guarantee any specific financial return or reward. The value of $DEM tokens and potential rewards are subject to market conditions and other factors beyond our control.'
        },
        {
            id: 2,
            title: 'Community-Driven Decisions',
            icon: Users,
            content: 'All decisions within Democracy Society are made collectively by the community. As a decentralized project, there is no central authority overseeing these decisions, which means that outcomes may vary, and some decisions may not align with individual expectations.'
        },
        {
            id: 3,
            title: 'Risk of Loss',
            icon: AlertTriangle,
            content: 'As with any cryptocurrency or decentralized finance (DeFi) project, there is a risk of loss. Participants should only invest what they can afford to lose and are encouraged to do their own research (DYOR) before engaging with the Democracy Coin ecosystem.'
        },
        {
            id: 4,
            title: 'Regulatory Considerations',
            icon: Scale,
            content: 'Cryptocurrencies and decentralized projects like Democracy Society operate within a rapidly evolving regulatory landscape. Participants should be aware of the legal and regulatory risks in their jurisdiction and understand that changes in laws or regulations could impact their involvement in Democracy Coin.'
        },
        {
            id: 5,
            title: 'No Liability',
            icon: Shield,
            content: 'Democracy Society, its developers, contributors, and associated parties are not liable for any losses, damages, or claims arising from participation in the project, including but not limited to financial losses, data breaches, or other unforeseen events.'
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
                        Democracy Coin Disclaimer
                    </h1>
                    <p className="text-gray-400 leading-relaxed">
                        Democracy Coin operates as part of a decentralized community-driven project.
                        While we strive to create a fair, transparent, and rewarding environment for all participants,
                        it is important to understand the inherent risks involved in participating in such a system.
                    </p>
                </div>

                {/* Disclaimer Sections */}
                <div className="space-y-6">
                    {disclaimerSections.map((section) => (
                        <div
                            key={section.id}
                            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-indigo-500/10">
                                    <section.icon className="h-6 w-6 text-indigo-400" />
                                </div>
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

                {/* Acknowledgment Section */}
                <div className="mt-12 p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-gray-300 text-center leading-relaxed">
                        By participating in Democracy Society and using Democracy Coin, you acknowledge
                        that you have read, understood, and accepted this disclaimer and the associated risks.
                        It is your responsibility to stay informed and make decisions that align with your
                        own risk tolerance and financial situation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerPage;