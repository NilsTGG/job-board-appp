import React, { useState, useEffect } from 'react';
import { Package, MapPin, MessageCircle, Clock, Users, HelpCircle, DollarSign } from '../icons';

interface NavigationProps {}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Package, href: '#hero' },
  { id: 'submit-job', label: 'Order', icon: MessageCircle, href: '#submit-job' },
  { id: 'services', label: 'Services', icon: MapPin, href: '#services' },
  { id: 'process', label: 'Process', icon: Clock, href: '#process' },
  { id: 'trust', label: 'Trust', icon: Users, href: '#trust' },
  { id: 'reviews', label: 'Reviews', icon: Users, href: '#reviews' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, href: '#faq' },
  { id: 'budget-options', label: 'Budget Options', icon: DollarSign, href: '#budget-options' }
];

const Navigation: React.FC<NavigationProps> = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Handle smooth scrolling to sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = 80; // Account for sticky nav height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for nav background
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map(item => item.id);
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navOffset = 100; // Offset for nav height + some buffer
          
          if (rect.top <= navOffset && rect.bottom >= navOffset) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Package className="h-8 w-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg">Because You Won't™</div>
              <div className="text-xs text-gray-400">Minecraft Services</div>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileNavigation 
              navItems={navItems}
              activeSection={activeSection}
              onNavClick={handleNavClick}
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>
    </nav>
  );
};

// Mobile Navigation Component
interface MobileNavigationProps {
  navItems: NavItem[];
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  navItems, 
  activeSection, 
  onNavClick 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onNavClick(e, href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center">
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'
          }`} />
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`} />
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-0.5' : 'mt-1'
          }`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full right-0 w-72 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl m-4">
            <div className="p-4">
              <div className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-400" />
                Navigation
              </div>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleMobileNavClick(e, item.href)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-auto"></div>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;