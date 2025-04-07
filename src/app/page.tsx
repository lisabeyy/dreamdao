'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowRight, FiUsers, FiBook, FiCalendar, FiAward, FiGithub, FiTwitter, FiMessageCircle, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { FaXTwitter, FaMedium, FaLinkedin, FaTelegram } from 'react-icons/fa6';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    // Add cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-200 overflow-hidden">
      {/* Custom cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-cyan-400/20 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 8,
          top: cursorPosition.y - 8,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-space-grotesk">
                Dream DAO
              </div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                <a href="#about" className="hover:text-cyan-400 transition-colors duration-300">About</a>
                <a href="#governance" className="hover:text-cyan-400 transition-colors duration-300">Governance</a>
                <a href="#contribute" className="hover:text-cyan-400 transition-colors duration-300">Contribute</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#waitlist" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full transition-all duration-300">
                  Join Waitlist
                </a>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'calc(100vh - 80px)' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className={`md:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-sm z-30 overflow-hidden ${isMobileMenuOpen ? 'block' : 'hidden'
              }`}
          >
            <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <nav className="flex flex-col items-center space-y-8">
                <a
                  href="#about"
                  className="text-2xl text-white hover:text-cyan-400 transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.getElementById('about');
                    if (target) {
                      window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  About
                </a>
                <a
                  href="#governance"
                  className="text-2xl text-white hover:text-cyan-400 transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.getElementById('governance');
                    if (target) {
                      window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Governance
                </a>
                <a
                  href="#contribute"
                  className="text-2xl text-white hover:text-cyan-400 transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.getElementById('contribute');
                    if (target) {
                      window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Contribute
                </a>
                <a
                  href="#waitlist"
                  className="text-2xl text-white hover:text-cyan-400 transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const target = document.getElementById('waitlist');
                    if (target) {
                      window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Join Waitlist
                </a>
              </nav>

              {/* Social Links */}
              <div className="mt-12 flex space-x-6">
                <a
                  href="https://twitter.com/dreamdao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  <FaXTwitter size={32} />
                </a>
                <a
                  href="https://medium.com/dreamdao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  <FaMedium size={32} />
                </a>
                <a
                  href="https://linkedin.com/company/dreamdao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  <FaLinkedin size={32} />
                </a>
                <a
                  href="https://t.me/dreamdao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 transition-colors duration-300"
                >
                  <FaTelegram size={32} />
                </a>
              </div>
            </div>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen container mx-auto px-4 relative flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto relative z-10 py-20"
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main circle */}
              <div className="w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" style={{ animationDuration: '3s' }} />

                {/* Outer spinning circle */}
                <div className="absolute -inset-6 border-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  {/* Dot on outer circle */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400/50 animate-ping" style={{ animationDuration: '6s', animationDelay: '0s', animationIterationCount: 'infinite' }} />
                </div>

                {/* Middle spinning circle */}
                <div className="absolute -inset-4 border-2 border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                  {/* Dot on middle circle */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400/50 animate-ping" style={{ animationDuration: '6s', animationDelay: '3s', animationIterationCount: 'infinite' }} />
                </div>
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-space-grotesk">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Dream DAO
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-4 text-gray-700 dark:text-gray-300"
          >
            Empowering Women in STEM through Decentralized Governance and Education
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Join a community of innovators, creators, and leaders shaping the future of technology. Together, we're building a more inclusive and equitable STEM landscape.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#waitlist"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300"
            >
              Join the Waitlist
              <FiArrowRight className="ml-2" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#learn-more"
              className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300"
            >
              Discover More
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Decorative background image */}
        <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop")',
              filter: 'blur(8px)'
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
          >
            <FiBook className="text-4xl mb-4 text-cyan-400" />
            <h3 className="text-xl font-bold mb-2">Educational Content</h3>
            <p className="text-gray-400">Access to curated STEM resources and learning materials</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
          >
            <FiCalendar className="text-4xl mb-4 text-cyan-400" />
            <h3 className="text-xl font-bold mb-2">Exclusive Events</h3>
            <p className="text-gray-400">Join our community events and networking opportunities</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
          >
            <FiAward className="text-4xl mb-4 text-cyan-400" />
            <h3 className="text-xl font-bold mb-2">Free Resources</h3>
            <p className="text-gray-400">Get access to valuable tools and resources for your STEM journey</p>
          </motion.div>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Decentralized Governance</h2>
          <p className="text-gray-400 mb-8">
            Dream DAO is governed by 4 dedicated governors who oversee the organization's direction and initiatives.
            Our governance model ensures transparency and community-driven decision making.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Governance Structure</h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• 4 Governors overseeing operations</li>
                <li>• Community-driven proposals</li>
                <li>• Transparent decision making</li>
                <li>• Regular governance meetings</li>
              </ul>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">How to Participate</h3>
              <ul className="text-left text-gray-400 space-y-2">
                <li>• Join our waitlist for updates</li>
                <li>• Attend governance meetings</li>
                <li>• Submit proposals</li>
                <li>• Vote on important decisions</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section id="contribute" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How to Contribute</h2>
          <p className="text-gray-400 mb-8">
            Join us in building a better future for women in STEM. There are multiple ways to contribute to our mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Share Knowledge</h3>
              <p className="text-gray-400">Contribute educational content and resources</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Mentor Others</h3>
              <p className="text-gray-400">Guide and support aspiring women in STEM</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Spread the Word</h3>
              <p className="text-gray-400">Help us grow our community and reach</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="container mx-auto px-4 py-20 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-400 mb-8">
            Be part of the future of Dream DAO. Join our waitlist to get early access and help shape our community.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-green-500/20 p-6 rounded-xl border border-green-500"
            >
              <h3 className="text-xl font-bold text-green-400 mb-4">Welcome to Dream DAO!</h3>
              <p className="text-green-400 mb-4">
                Thank you for joining our waitlist! We'll be in touch soon with updates.
              </p>
              <p className="text-gray-400 mb-4">
                In the meantime, join our Telegram channel to stay updated with the latest news and announcements.
              </p>
              <motion.a
                href="https://t.me/dreamdaowip"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
              >
                <FaTelegram className="mr-2" />
                Join Telegram
              </motion.a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-full bg-gray-50 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            <p>Powered by CiFI - Circular Finance Platform</p>
            <p className="mt-2">© 2024 Dream DAO. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://twitter.com/dreamdao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://medium.com/dreamdao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaMedium size={24} />
            </a>
            <a
              href="https://linkedin.com/company/dreamdao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://t.me/dreamdao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaTelegram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
