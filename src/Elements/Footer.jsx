
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom'
const Footer = () => {
  const navigation = {
    developers: [
      { name: 'Home', href: '#' },
      { name: 'Tokenomics', href: '#' },

    ],
    community: [
      { name: 'Twitter', href: '#' },
      { name: 'Discord', href: '#' },

    ],
    other: [

      { name: 'FAQ', href: '#' },

    ],
  };

  return (
    <footer className="bg-[#3B1C08] relative pt-[8%] ">
      {/* Gradient effect */}
      {/* <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full" /> */}

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <h2 className="text-cyan-400 text-2xl font-bold">Democracy</h2>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Democracy Coin ($DEM) is the native token of Democracy Society, an
              exclusive community designed to bring together forward-thinking
              individuals, investors, and innovators. $DEM is not just another
              cryptocurrency; it’s the key to accessing an ecosystem focused on
              long-term growth, sustainability, and real-world impact
            </p>
            <a href='mailto:Democracycoin99@gmail.com' className='text-gray-400 pt-3'>Email: Democracycoin@gmail.com</a>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Developers</h3>
            <ul className="space-y-3">
              {navigation.developers.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center group"
                  >
                    {item.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {navigation.community.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center group"
                  >
                    {item.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Other</h3>
            <ul className="space-y-3">
              {navigation.other.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm flex items-center group"
                  >
                    {item.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 | All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link to='/disclaimer' className="text-gray-400 hover:text-white text-sm">Disclaimer</Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;