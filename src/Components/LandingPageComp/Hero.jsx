import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const stats = [
    { label: 'Total Supply', value: '15B' },
    { label: 'Charity', value: '20%' },
    { label: 'Voting Power', value: '20%' }
  ];

  const cards = [
    {
      title: 'Community-Driven Ecosystem',
      description: 'Real-World Social Impact Funding literature, documentaries, and events that strengthen democratic values and awareness.',
    },
    {
      title: 'Real-World Utility and Events',
      description: 'Voting Rights Token holders decide which democracy-advancing projects receive funding via a transparent governance process.',
    },
    {
      title: 'Governance Rights',
      description: 'Holders can vote on key decisions affecting the future of Democracy Coin.',
    },
  ];


  return (
    <section className="relative bg-[#3B1C08] text-white min-h-screen pt-[60px] overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/20 blur-[120px] rounded-full" />

   <div className="flex pt-10 px-20 h-[90vh] flex-col lg:flex-row items-center justify-between gap-12 min-h-[60vh] text-center lg:text-left">
  {/* Left side - Text content */}
  <div className="flex flex-col gap-10 items-start flex-1">
    <h1 className="text-4xl leading-relaxed md:text-6xl font-bold">
      Democracy 
      <span className="bg-gradient-to-r from-orange-600 to-yellow-400 text-transparent bg-clip-text"> Coin</span>
    </h1>
    <p className="text-gray-300 text-[16px] max-w-2xl leading-relaxed">
DemocracyCoin ($DEM) is the digital asset of the Democracy Project, a civic-tech initiative committed to advancing democracy through transparency, education, and community-powered innovation. $DEM is not just a currency; it’s a catalyst for real-world impact through active civic participation.    </p>

    {/* Buttons */}
    <div className="flex gap-4 mt-4">
      <Link to='/buy' className="hover:bg-transparent hover:border-white hover:border hover:text-white px-6 py-2 rounded-lg font-semibold bg-yellow-300 text-black transition-colors">
        Buy $DEM
      </Link>
      <a href='' className="border-white border hover:text-black hover:bg-white px-6 py-2 rounded-lg font-semibold text-white transition-colors">
        Whitepaper
      </a>
    </div>
  </div>

  {/* Right side - Image or illustration */}
  <div className="flex-1  flex justify-center items-center">
    <img src="https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/sites/default/files/20140301_ESP010.jpg" alt="Democracy Coin Illustration" className="w-[90vh] hidden md:block h-[65vh] rounded-xl shadow-xl max-ws-md" />
  </div>
</div>

    </section>
  );
};

export default Hero;
