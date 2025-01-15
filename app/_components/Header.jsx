"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const {user, isSignedIn} = useUser();
    return (
    <div className='p-5 border-b shadow-sm'>
        <div className='flex justify-between items-center'>
            
            <Image src="/logo.svg" alt="Logo" width={150} height={100} />
           {isSignedIn?
            <div className='flex items-center gap-5'>
            <Button variant = "outline">Dashboard</Button>
            <UserButton/>
            </div>:
            <Button>Get Started</Button>
           }
        </div>    
    </div>
  )
}

export default Header