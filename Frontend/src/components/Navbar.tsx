import React, { useState, useEffect } from 'react';
import logo from '../assets/ihub.png';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full flex flex-wrap items-center justify-between px-4 md:px-20 lg:px-40 py-4 mx-auto transition-all duration-300 z-50 ${
          isScrolled ? 'bg-white bg-opacity-80 backdrop-filter backdrop-blur-md' : ''
        }`}
      >
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-10 md:h-15 md:w-15" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <a href="/products-list" className="font-semibold text-lg lg:text-xl text-gray-900 hover:text-gray-600">Products</a>
          <a href="/solutions" className="font-semibold text-lg lg:text-xl text-gray-900 hover:text-gray-600">Solutions</a>
          <a href="/about" className="font-semibold text-lg lg:text-xl text-gray-900 hover:text-gray-600">About</a>
          <a href="/login" className="font-semibold text-lg lg:text-xl text-gray-900 hover:text-gray-600">Log in</a>
          <button className="font-semibold px-4 lg:px-6 py-2 lg:py-3 text-lg lg:text-xl bg-black text-white rounded-xl flex items-center hover:bg-white border border-black hover:text-black transition-colors duration-300">
            Get Started
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden w-full ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-center space-y-4 pt-4 pb-6 bg-white">
            <a href="/products-list" className="font-semibold text-lg text-gray-900 hover:text-gray-600">Products</a>
            <a href="/solutions" className="font-semibold text-lg text-gray-900 hover:text-gray-600">Solutions</a>
            <a href="/about" className="font-semibold text-lg text-gray-900 hover:text-gray-600">About</a>
            <a href="/login" className="font-semibold text-lg text-gray-900 hover:text-gray-600">Log in</a>
            <button className="font-semibold px-4 py-2 text-lg bg-black text-white rounded-xl flex items-center hover:bg-white border border-black hover:text-black transition-colors duration-300">
              Get Started
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="pt-20 mb-20">
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Navbar;