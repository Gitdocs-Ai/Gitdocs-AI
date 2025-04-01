"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !mobileMenuOpen
          ? "backdrop-blur-md bg-gitdocs-light-purple/10 border border-white/20 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/logo.png"} width={33} height={33} alt="logo" />
            <span className="text-lg font-semibold">GitDocs AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:ms-10 ms-6 md:flex items-center lg:space-x-8 space-x-5">
            <Link
              href="/"
              className="text-sm relative group font-medium hover:text-gitdocs-blue transition-colors"
            >
              Home
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"
              ></span>
            </Link>
            <Link
              href="/blog"
              className="text-sm relative group font-medium hover:text-gitdocs-blue transition-colors"
            >
              Blogs
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"
              ></span>
            </Link>
            <Link
              href="/#features"
              className="text-sm relative group font-medium hover:text-gitdocs-blue transition-colors"
            >
              Features
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"
              ></span>
            </Link>
            <Link
              href="/#pricing"
              className="text-sm relative group font-medium hover:text-gitdocs-blue transition-colors"
            >
              Pricing
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"
              ></span>
            </Link>
            <Link
              href="/contact"
              className="text-sm relative group font-medium hover:text-gitdocs-blue transition-colors"
            >
              Contact Us
              <span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"
              ></span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <SignedOut>
            <div className="hidden md:flex items-center space-x-4">
              <SignInButton>
                <p
                  className={`cursor-pointer ${buttonVariants({ variant: "outline-gradient" })}`}
                >
                  Log In
                </p>
              </SignInButton>
              <SignUpButton>
                <p
                  className={`cursor-pointer ${buttonVariants({ variant: "gradient" })}`}
                >
                  Get Started
                </p>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="scale-110 hidden md:block">
              <UserButton showName={true}>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Dashboard"
                    labelIcon={<LayoutDashboard size={16} />}
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center z-[51]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-colors`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Fullscreen Overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Solid background with lighter color */}
          <div className="absolute inset-0 bg-[#F1F0FB]"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gitdocs-blue/10"></div>
            <div className="absolute bottom-1/3 right-1/5 w-40 h-40 rounded-full bg-gitdocs-purple/10"></div>
            <div className="absolute top-2/3 right-1/4 w-24 h-24 rounded-full border border-gitdocs-blue/20"></div>
            <div className="absolute bottom-1/4 left-1/5 w-20 h-20 rounded-full border border-gitdocs-purple/20"></div>

            {/* Code bracket decorations */}
            <div className="absolute top-20 right-10 text-6xl opacity-20 text-gitdocs-blue font-mono">
              {"{"}
            </div>
            <div className="absolute bottom-20 left-10 text-6xl opacity-20 text-gitdocs-purple font-mono">
              {"}"}
            </div>
          </div>

          <div className="relative h-full flex flex-col justify-center items-center">
            <nav className="flex flex-col items-center justify-center space-y-8 p-8">
              <Link
                href="/"
                className="text-xl font-semibold text-[#221F26] hover:text-gitdocs-blue relative group transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gitdocs-blue group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gitdocs-blue"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Link>
              <Link
                href="/blog"
                className="text-xl font-semibold text-[#221F26] hover:text-gitdocs-purple relative group transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gitdocs-purple group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gitdocs-purple"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Link>
              <Link
                href="/#features"
                className="text-xl font-semibold text-[#221F26] hover:text-gitdocs-blue relative group transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gitdocs-blue group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gitdocs-blue"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Link>
              <Link
                href="/#pricing"
                className="text-xl font-semibold text-[#221F26] hover:text-gitdocs-orange relative group transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gitdocs-orange group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gitdocs-orange"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-xl font-semibold text-[#221F26] hover:text-gitdocs-blue relative group transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gitdocs-blue group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gitdocs-blue"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </Link>

              <SignedOut>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
                  <SignInButton>
                    <p
                      className="px-6 py-3 rounded-full bg-white text-gitdocs-blue font-medium border border-gitdocs-blue/20 hover:shadow-md hover:border-gitdocs-blue/50 transition-all duration-300 text-center transform hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log In
                    </p>
                  </SignInButton>
                  <SignUpButton>
                    <p
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple text-white font-medium hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </p>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="pt-8 scale-110">
                  <UserButton showName={true}>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Dashboard"
                        labelIcon={<LayoutDashboard size={16} />}
                        href="/dashboard"
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
