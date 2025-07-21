"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hideHeaderPaths = ['/aiform', '/sign-in', '/sign-up', '/dashboard', '/edit_form'];
  if (hideHeaderPaths.some(p => path.includes(p))) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-border bg-background/90 backdrop-blur-sm shadow-sm' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
              <Image src={'/logo.svg'} width={120} height={30} alt='logo' />
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className='flex items-center gap-5'>
                <Link href={'/dashboard'}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton />
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <SignInButton>
                  <Button>Get Started</Button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;