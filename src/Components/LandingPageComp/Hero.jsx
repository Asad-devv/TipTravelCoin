import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import whitepaperEN from "../../assets/whitepaper-en.pdf";
import whitepaperPT from "../../assets/whitepaper-pt.pdf";
import { useState, useEffect } from 'react';

const Hero = () => {
  const [whitepaper, setWhitepaper] = useState(whitepaperEN);

  useEffect(() => {
    const getSelectedLanguage = () => {
      try {
        const raw = localStorage.getItem('WebsiteTranslator.language.e6d230da-a1e6-4ce8-8959-4b13cceb29ef');
        if (!raw) return 'en';
        const parsed = JSON.parse(raw);
        return parsed?.value?.startsWith('pt') ? 'pt' : 'en';
      } catch (error) {
        return 'en';
      }
    };

    const selectedLang = getSelectedLanguage();
    console.log(selectedLang)
    const selectedWhitepaper = selectedLang === 'pt' ? whitepaperPT : whitepaperEN;
    setWhitepaper(selectedWhitepaper);
  }, []);

  return (
    <section className="relative bg-[#3B1C08] text-white min-h-screen pt-[60px] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/20 blur-[120px] rounded-full" />

      <div className="flex pt-10 px-20 h-[90vh] flex-col lg:flex-row items-center justify-between gap-12 min-h-[60vh] text-center lg:text-left">
        <div className="flex flex-col gap-10 items-start flex-1">
          <h1 className="text-4xl leading-relaxed md:text-6xl font-bold">
            Democracy 
            <span className="bg-gradient-to-r from-orange-600 to-yellow-400 text-transparent bg-clip-text"> Coin</span>
          </h1>
          <p className="text-gray-300 text-[16px] max-w-2xl leading-relaxed">
            DemocracyCoin ($DEM) is the digital asset of the Democracy Project, a civic-tech initiative committed to advancing democracy through transparency, education, and community-powered innovation. $DEM is not just a currency; it’s a catalyst for real-world impact through active civic participation.
          </p>

          <div className="flex gap-4 mt-4">
            <Link to="/buy" className="hover:bg-transparent hover:border-white hover:border hover:text-white px-6 py-2 rounded-lg font-semibold bg-yellow-300 text-black transition-colors">
              Buy $DEM
            </Link>
            <a
              href={whitepaper}
              download
              className="border-white z-50 border hover:text-black hover:bg-white px-6 py-2 rounded-lg font-semibold text-white transition-colors"
            >
              Whitepaper
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img src={logo} alt="Democracy Coin Illustration" className="w-[75vh] hidden md:block h-[70vh] rounded-xl shadow-xl max-ws-md" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
