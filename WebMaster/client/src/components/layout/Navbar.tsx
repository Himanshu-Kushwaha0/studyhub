import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Innovation Lab", path: "/innovation-lab" },
    { name: "Virtual Labs", path: "/virtual-labs" },
    { name: "AI Tools", path: "/ai-tools" },
    { name: "Quantum Computing", path: "/quantum-computing" },
    { name: "Collaboration", path: "/collaboration" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between flex-wrap p-4">
          <div className="flex items-center flex-shrink-0 mr-6">
            <Link href="/">
              <a className="font-sans font-bold text-xl text-primary flex items-center">
                <i className="ri-bolt-fill mr-2"></i>
                Study Hub
              </a>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="flex items-center px-3 py-2 border rounded text-dark border-dark-light"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className={`w-full ${mobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm lg:flex-grow flex flex-col lg:flex-row">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <a className={`block mt-4 lg:inline-block lg:mt-0 mr-6 font-medium ${
                    location === link.path ? 'text-primary' : 'text-gray-500 hover:text-primary'
                  }`}>
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
            <div>
              <Link href="/dashboard">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white transition-all duration-200">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
