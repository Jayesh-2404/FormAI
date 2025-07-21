"use client" // Add this since we are using a hook
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'
import { useUser } from '@clerk/nextjs'

function Dashboard() {
    const { user } = useUser();

    return (
        <div className="p-6 sm:p-10">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Welcome back, {user?.firstName}!
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                        Here's where you can manage, edit, and view responses for all your forms.
                    </p>
                </div>
                <div className="w-full sm:w-auto">
                    <CreateForm />
                </div>
            </header>

            {/* Title for the forms section */}
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">My Forms</h2>

            {/* Form List */}
            <FormList />
        </div>
    )
}

export default Dashboard