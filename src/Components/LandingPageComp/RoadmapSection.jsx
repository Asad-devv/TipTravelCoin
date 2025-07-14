import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Rocket, Globe, ChevronRight, ChevronDown } from 'lucide-react';

const RoadmapSection = () => {
    const [expandedPhase, setExpandedPhase] = useState(null);

    const phases = [
        {
          title: "Phase 1: Foundation and Community Building",
          icon: <Calendar className="w-6 h-6" />,
          color: "from-blue-400 to-blue-600",
          summary: [
            "Research and Development",
            "Community Building",
            "Website and Marketing",
            "Smart Contract Development"
          ],
          details: {
            "Research and Development": [
              "Finalize the project's mission and vision",
              "Develop technical elements and smart contracts",
              "Conduct internal tests and security checks"
            ],
            "Community Building": [
              "Launch Democracy Society on Discord",
              "Establish community guidelines",
              "Build excitement through engaging content"
            ],
            "Website and Marketing": [
              "Launch official website with pre-sale registration",
              "Begin digital marketing campaigns",
              "Introduce referral program"
            ]
          }
        },
        {
          title: "Phase 2: Pre-Sale and Initial Launch",
          icon: <Rocket className="w-6 h-6" />,
          color: "from-purple-400 to-purple-600",
          summary: [
            "Pre-sale Launch",
            "Liquidity Pool Creation",
            " Platform Launch",
            "Partnership Development"
          ],
          details: {
            "Pre-Sale Launch": [
              "Conduct pre-sale with tiered discounts",
              "Establish liquidity pools on DEXs",
              "Distribute tokens with lock-up periods"
            ],
            " Launch": [
              "Launch  model and dashboard",
              "Onboard influencers",
              "Focus on transparency and trust"
            ]
          }
        },
        {
          title: "Phase 3: Growth and Real-World Events",
          icon: <Globe className="w-6 h-6" />,
          color: "from-green-400 to-green-600",
          summary: [
            "Real-world Events",
            "Luxury Partnerships",
            "Community Governance",
            "Exchange Listings"
          ],
          details: {
            "Events and Partnerships": [
              "Plan exclusive real-world events",
              "Secure luxury brand partnerships",
              "Launch community perks program"
            ],
            "Governance and Growth": [
              "Roll out governance system",
              "Enable community voting",
              "Expand to additional blockchains",
              "List on centralized exchanges"
            ]
          }
        }
      ];
      

    return (
        <div className="bg-[#3B1C08] min-h-screen py-[8%]  relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-500/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Our
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text"> Roadmap</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A detailed journey from conception to realization of Democracy Coin
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />

                    {/* Phases */}
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative mb-12"
                        >
                            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-8`}>
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 z-10" />

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <motion.div
                                        className="bg-gray-800/40 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setExpandedPhase(expandedPhase === index ? null : index)}
                                    >
                                        {/* Card Header */}
                                        <div className="p-6">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${phase.color} mb-4`}>
                                                {phase.icon}
                                                <span className="ml-2">{phase.date}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                                                {phase.title}
                                                <ChevronDown
                                                    className={`w-5 h-5 transition-transform ${expandedPhase === index ? 'rotate-180' : ''}`}
                                                />
                                            </h3>
                                            <ul className="space-y-3">
                                                {phase.summary.map((item, itemIndex) => (
                                                    <motion.li
                                                        key={itemIndex}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: itemIndex * 0.1 }}
                                                        className="flex items-center text-gray-300"
                                                    >
                                                        <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                                                        {item}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {expandedPhase === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="border-t border-gray-700/50"
                                                >
                                                    <div className="p-6 bg-gray-900/50">
                                                        {Object.entries(phase.details).map(([period, items], periodIndex) => (
                                                            <div key={periodIndex} className="mb-6 last:mb-0">
                                                                <h4 className="text-lg font-semibold text-white mb-3">{period}</h4>
                                                                <ul className="space-y-2 pl-4">
                                                                    {items.map((item, itemIndex) => (
                                                                        <motion.li
                                                                            key={itemIndex}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: itemIndex * 0.1 }}
                                                                            className="text-gray-400 flex items-center"
                                                                        >
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3" />
                                                                            {item}
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadmapSection;