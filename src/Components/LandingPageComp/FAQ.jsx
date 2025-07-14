import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
    const faqs = [
        {
            question: "When is the Official Launch?",
            answer: "The launch will commence once all presale stages are completed or when the presale price reaches $0.18. We'll announce the exact date through our official channels."
        },
        {
            question: "Is Democracy Token Audited?",
            answer: "Yes, Democracy Token has undergone comprehensive security audits by leading blockchain security firms. Full audit reports are available on our documentation page."
        },
        {
            question: "How Can I Purchase Tokens?",
            answer: "You can purchase Democracy tokens through our presale platform using ETH or USDT. Connect your wallet, select the amount, and confirm the transaction."
        },
        {
            question: "Where Can I Contact The Team?",
            answer: "Our team is available 24/7 through our official Discord channel and Telegram group. You can also reach us via email at support@Democracytoken.com"
        },
        {
            question: "How Can I Claim My Tokens?",
            answer: "Tokens can be claimed through our dApp once the presale ends. Connect your wallet, click 'Claim', and confirm the transaction to receive your tokens."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="bg-[#3B1C09] px-6 py-[1%] ">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-6 text-left rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/15"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-medium text-white pr-8">
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;