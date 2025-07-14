
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const TokenDistribution = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const [radius, setRadius] = useState({ inner: 110, outer: 210 });

    useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 640) { // Small screens
                setRadius({ inner: 70, outer: 140 });
            } else if (window.innerWidth < 1024) { // Medium screens
                setRadius({ inner: 90, outer: 180 });
            } else { // Large screens
                setRadius({ inner: 105, outer: 220 });
            }
        };

        updateRadius(); // Set initial radius based on the current screen size
        window.addEventListener('resize', updateRadius); // Update radius on resize

        return () => window.removeEventListener('resize', updateRadius);
    }, []);

const distribution = [
  { name: 'Owner and Family', value: 15, amount: '2,250,000,000', color: '#FFD700' },        // Gold
  { name: 'Private Sale', value: 15, amount: '2,250,000,000', color: '#FFDF80' },             // Light Gold
  { name: 'Public Sale (IDO/IEO)', value: 15, amount: '2,250,000,000', color: '#e7c96eff' },    // Pale Gold
  { name: 'Ecosystem & Partnerships', value: 20, amount: '3,000,000,000', color: '#F5DEB3' }, // Wheat (warm goldish)
  { name: 'Liquidity & Market Making', value: 15, amount: '2,250,000,000', color: '#FFE599' },// Soft Yellow-Gold
  { name: 'Airdrops & Community Incentives', value: 20, amount: '3,000,000,000', color: '#FFF8DC' } // Cornsilk (very light gold)
];

      
    return (
        <div className="w-full min-h-screen bg-[#3B1C08] px-8 py-[8%] ">

            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/20 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto">
   
                <div className="text-center mb-16">
                    <h3 className="text-white font-medium mb-4">COMMUNITY-OWNED AND OPERATED</h3>
                    <h1 className="text-5xl font-bold text-white mb-8">Token Distribution</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Strategic token distribution designed to ensure long-term sustainability and community growth
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Chart */}
                    <div className="h-[500px] w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={radius.inner}
                                    outerRadius={radius.outer}
                                    paddingAngle={2}
                                    // dataKey="value"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            opacity={activeIndex === index ? 1 : 0.8}
                                            stroke="transparent"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ payload }) => {
                                        if (payload && payload[0]) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                                                    <p className="text-white font-medium">{data.name}</p>
                                                    <p className="text-yellow-300">{data.amount} tokens</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

       
                    <div className="space-y-4">
                        {distribution.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-6 rounded-lg border border-white/10 backdrop-blur-md 
                  ${activeIndex === index ? 'bg-white/10' : 'bg-white/5'} 
                  hover:bg-white/10 transition-all duration-300`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white font-medium">{item.name}</h3>
                                        <p className="text-yellow-300">{item.amount} tokens</p>
                                    </div>
                                    {/* <div className="text-2xl font-bold text-white">{item.value}%</div> */}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenDistribution;