
import { ArrowUpRight, Send, Twitter } from 'lucide-react';

const CommunitySection = () => {
    return (
        <div className="min-h-screen bg-[#3B1C08] relative px-8 py-[8%]  ">
            {/* Gradient effects */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-500/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/70 blur-[120px] rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-white leading-tight">
                            Meet the <br />
                            worldwide <br />
                            community.
                        </h1>

                        <p className="text-gray-400 text-lg">
                            Join a vibrant community of Democracy Coin enthusiasts and investors connected across the globe.
                        </p>

                        {/* <a
                            href="#join-community"
                            className="inline-flex items-center px-6 py-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors group"
                        >
                            Join Community
                            <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a> */}
                    </div>

                    {/* Right Column - Social Cards */}
                    <div className="space-y-6">
                        {/* Telegram Card */}
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Send className="text-yellow-400" />
                                        <h3 className="text-xl font-semibold text-white">Community Chat</h3>
                                        <ArrowUpRight className="text-yellow-400" />
                                    </div>
                                    <p className="text-gray-400">
                                        Connect with fellow investors and stay updated on the latest Democracy developments through our Telegram community.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Twitter Card */}
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Twitter className="text-yellow-400" />
                                        <h3 className="text-xl font-semibold text-white">Twitter</h3>
                                        <ArrowUpRight className="text-yellow-400" />
                                    </div>
                                    <p className="text-gray-400">
                                        Follow @DemocracyCoin for real-time updates, announcements, and insights from our ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySection;