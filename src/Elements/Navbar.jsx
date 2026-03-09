import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-500 ${
            isScrolled
                ? 'bg-black/50 backdrop-blur-md border-b border-white/5'
                : 'bg-transparent'
        }`}>
            <div className="max-w-6xl mx-auto flex items-center justify-center h-[72px]">
                {/* Connect Wallet */}
                <appkit-button />
            </div>
        </nav>
    );
};

export default Navbar;
