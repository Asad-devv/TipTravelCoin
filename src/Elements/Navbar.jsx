import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { ConnectKitButton } from 'connectkit';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Whitepaper', href: '/' },
        { label: 'Disclaimer', href: '/disclaimer' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full px-[3%] z-50 text-white backdrop-blur-md transition-colors duration-700 
                ${isScrolled ? 'bg-black/40' : 'bg-transparent'}
            `}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[90px]">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 text-2xl text-blue-900 shadow-gray-400 rounded-full font-extrabold flex items-center">
                       <img src="./logo.jpg" className='h-14 w-22 rounded-'  /> 
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                <Link
                                    to={item.href}
                                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Presale Button */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="/buy"
                            className="border-white border hover:text-black hover:bg-white px-6 py-2 rounded-lg font-semibold text-white transition-colors"
                        >
                            Presale
                        </a>
                    </div>

                    {/* Connect Wallet Button (Always visible, in the main nav) */}
                    <div className=" md:flex items-center">
                     <appkit-button />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
