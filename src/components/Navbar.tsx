"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Features", href: "/features" },
  { name: "Bot Forge", href: "/bot-forge" },
  { name: "Studio OS", href: "/studio-os" },
  { name: "AI", href: "/ai" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-nexus-dark/80 backdrop-blur-md border-b border-nexus-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-nexus-indigo rounded-lg flex items-center justify-center nexus-glow group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tighter">
                VIRTUA<span className="text-nexus-indigo">CITY</span> NEXUS
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-nexus-indigo px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-nexus-indigo/10 hover:bg-nexus-indigo/20 text-nexus-indigo px-5 py-2 rounded-full text-sm font-bold transition-all border border-nexus-indigo/20"
                >
                  <User size={16} />
                  Identity Core
                </Link>
              ) : (
                <Link
                  href="/nexus"
                  className="bg-nexus-indigo hover:bg-nexus-indigo/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all nexus-glow-hover"
                >
                  Enter Nexus
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-nexus-card focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-nexus-dark border-b border-nexus-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-nexus-indigo block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 bg-nexus-indigo/10 text-nexus-indigo px-3 py-2 rounded-md text-base font-bold text-center"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                Identity Core
              </Link>
            ) : (
              <Link
                href="/signup"
                className="block bg-nexus-indigo text-white px-3 py-2 rounded-md text-base font-bold text-center"
                onClick={() => setIsOpen(false)}
              >
                Initialize Identity
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
