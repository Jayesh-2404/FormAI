"use client"
import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <SignedIn>
      <div>
          {/* The SideNav is fixed and only shown on medium screens and up */}
          <div className='md:w-64 fixed h-screen hidden md:block'>
              <SideNav/>
          </div>
          {/* The main content takes up the rest of the space, with its own background and min-height */}
          <main className='md:ml-64 min-h-screen bg-gray-50 dark:bg-gray-900'>
              {/* On mobile, a top header with a hamburger menu button could be added here in the future */}
              {children}
          </main>
      </div>
    </SignedIn>
  )
}

export default DashboardLayout