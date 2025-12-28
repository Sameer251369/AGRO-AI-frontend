import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Menu, X, LogOut, User as UserIcon } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Handle scroll effect for premium transparency blending
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/our-work', label: 'Our Work' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/chat', label: 'Chat' },
  ];

  // Logic to determine if nav should be forced to "Scrolled" state (white bg)
  // Useful if you are on a page that doesn't have a dark hero image at the top
  const isSolidPage = location.pathname !== '/';
  const shouldShowBg = isScrolled || isSolidPage;

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldShowBg 
          ? 'bg-white/90 backdrop-blur-md py-4 shadow-lg border-b border-gray-100' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="bg-[#2E8B57] p-2 rounded-sm shadow-xl group-hover:bg-[#4ADE80] transition-all duration-500">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tighter transition-colors ${
              shouldShowBg ? 'text-[#2C3E50]' : 'text-white'
            }`}>
              AGRO <span className="text-[#4ADE80]">AI</span>
            </span>
          </Link>

          {/* CENTER NAV LINKS */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${
                  isActive(link.path)
                    ? 'text-[#4ADE80]'
                    : shouldShowBg 
                      ? 'text-[#2C3E50] hover:text-[#2E8B57]' 
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#4ADE80] transition-transform duration-300 origin-left ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                }`} />
              </Link>
            ))}
          </div>

          {/* RIGHT AUTH BUTTONS */}
          <div className="hidden md:block">
            <AuthButtons isScrolled={shouldShowBg} />
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-sm transition-colors ${
              shouldShowBg ? 'text-[#2C3E50]' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAV OVERLAY */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#1A252F] border-t border-white/10 p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                  isActive(link.path) ? 'text-[#4ADE80]' : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-white/10 my-2" />
            <AuthButtons mobile />
          </div>
        )}
      </div>
    </nav>
  );
}

function AuthButtons({ mobile, isScrolled }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Safe parsing for the username
  const firstName = user?.username ? user.username.split(" ")[0] : "User";

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (user) {
    return (
      <div className={`flex items-center gap-6 ${mobile ? 'flex-row-reverse justify-between w-full' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#4ADE80]/20 flex items-center justify-center border border-[#4ADE80]/30">
            <UserIcon size={16} className="text-[#4ADE80]" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            isScrolled ? 'text-[#2C3E50]' : 'text-white'
          }`}>
            {firstName}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 hover:text-red-500 transition-all active:scale-95"
        >
          <LogOut size={14} />
          <span>Exit</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-6 ${mobile ? 'w-full flex-col mt-4' : ''}`}>
      <Link
        to="/login"
        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
          isScrolled ? 'text-[#2C3E50] hover:text-[#2E8B57]' : mobile ? 'text-white hover:text-[#4ADE80]' : 'text-white/80 hover:text-white'
        }`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`px-6 py-2.5 bg-[#2E8B57] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all hover:bg-[#4ADE80] hover:shadow-lg hover:shadow-[#4ADE80]/20 active:scale-95 ${
          mobile ? 'w-full text-center' : ''
        }`}
      >
        join us
      </Link>
    </div>
  );
}

export default Navigation;