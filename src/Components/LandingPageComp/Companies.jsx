
import { motion } from 'framer-motion';

const LogoSlider = () => {
    // Double the logos to create seamless infinite scroll effect
    const logos = [
        { name: "CryptoDaily", icon: "🛡️" },
        { name: "CoinMarketCap", icon: "📊" },
        { name: "Binance", icon: "💎" },
        { name: "LogoIpsum", icon: "⭐" },
        { name: "BitcoinTalk", icon: "₿" },
        { name: "Crypto.com", icon: "🌐" },
    ];

    const doubledLogos = [...logos, ...logos];

    return (
        <div className="bg-[#3B1C09] py-[8%]  overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        As Seen On
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>

                {/* Logo Slider */}
                <div className="relative">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#3B1C09] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#3B1C09] to-transparent z-10" />

                    {/* Sliding Container */}
                    <div className="relative overflow-hidden py-8">
                        <motion.div
                            animate={{
                                x: [0, -50],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40,
                                    ease: "linear",
                                },
                            }}
                            className="flex space-x-16 whitespace-nowrap"
                        >
                            {/* First Set of Logos */}
                            <div className="flex space-x-16">
                                {doubledLogos.map((logo, index) => (
                                    <div
                                        key={index}
                                        className="relative group"
                                    >
                                        <div className="flex items-center justify-center h-20 w-40 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-white/10">
                                            {/* Logo Content */}
                                            <div className="flex flex-col items-center space-y-2">
                                                <span className="text-2xl">{logo.icon}</span>
                                                <span className="text-sm text-gray-400 font-medium">
                                                    {logo.name}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-gray-400 text-sm">Trusted by leading platforms</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoSlider;