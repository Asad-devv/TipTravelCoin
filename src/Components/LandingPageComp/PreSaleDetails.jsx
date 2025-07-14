
import { ArrowRight, Wallet, Lock, ChartPie, Coins } from 'lucide-react';

const PreSaleDetails = () => {
    const cards = [
        {
            title: 'Private Pre-Sale Allocation',
            description: '15% of total token supply reserved for pre-sale participants, enabling early access to tokens while raising capital for project development.',
            icon: <Wallet className="w-6 h-6 text-blue-300" />,
        },
        {
            title: 'Discounted Rates',
            description: 'Early supporters benefit from exclusive discounted rates compared to public sale pricing, maximizing potential returns.',
            icon: <Coins className="w-6 h-6 text-purple-300" />,
        },
        {
            title: 'Token Lock-Up',
            description: 'Strategic lock-up periods implemented to ensure market stability and prevent immediate selling pressure post-launch.',
            icon: <Lock className="w-6 h-6 text-pink-300" />,
        },
        {
            title: 'Fund Allocation',
            description: '15% allocated to founders, 15% directed towards liquidity,20% for marketing initiatives, and continued development.',
            icon: <ChartPie className="w-6 h-6 text-green-300" />,
        },
    ];

    return (
        <div className="relative bg-[#3B1C08] text-white min-h-screen overflow-hidden py-[8%] ">
            {/* Background effects */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Main content */}
                <div className="grid  gap-12 items-center mb-16">
                    {/* Left side - Text content */}
                    <div className="space-y-6 flex items-center flex-col text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl text-center font-bold flex flex-col gap-2">
                            Why Join Our
                            <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text"> Pre-Sale?</span>
                        </h1>

                        <p className="text-gray-300 text-center text-lg max-w-xl">
                            Combine early access benefits with discounted rates while supporting the project&apos;s development and future growth through our strategic pre-sale structure.
                        </p>

                        <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-blue-700 hover:to-pink-700 px-6 py-3 rounded-lg flex items-center space-x-2 text-white font-medium transition-all group">
                            <span>Join Pre-Sale</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right side - Floating orb illustration */}
                    {/* <div className="relative  hidden lg:block">
                        <img src="https://i.ibb.co/SndPk6n/bgLogo.png" alt="Democracy Logo" />
                    </div> */}
                </div>

                {/* Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
  {cards.map((feature, index) => (
    <div 
      key={index}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-gold-500/50 transition-all duration-300 transform hover:scale-105 group shadow-xl hover:shadow-2xl"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-full flex items-center justify-center group-hover:from-gold-500/30 group-hover:to-gold-600/30 transition-all duration-300">
                                    {feature.icon}
         </div>
      </div>
      <h3 className="text-xl font-semibold text-gold-300 mb-3 text-center">
        {feature.title}
      </h3>
      <p className="text-brown-200 text-center leading-relaxed">
        {feature.description}
      </p>
    </div>
  ))}
</div>

            </div>
        </div>
    );
};

export default PreSaleDetails;