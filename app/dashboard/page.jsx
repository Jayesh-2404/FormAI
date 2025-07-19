// app/dashboard/page.jsx

import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function Dashboard() {
    return (
        <div className="p-6 sm:p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
                        Create and manage your AI-powered forms.
                    </p>
                </div>
                {/* The CreateForm button is a clear call-to-action */}
                <CreateForm />
            </div>

            {/* Main Content Area */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">My Forms</h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400 mb-6">View, edit, and share all the forms you have created.</p>

                {/* FormList handles fetching and displaying the attractive cards */}
                <FormList />
            </div>
        </div>
    )
}

export default Dashboard
