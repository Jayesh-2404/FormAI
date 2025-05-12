import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function Dashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-10">
            <h2 className="font-bold text-2xl sm:text-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <CreateForm />
            </h2>
            {/* List of Forms */}
            <div className="mt-6">
                <FormList />
            </div>
        </div>
    )
}

export default Dashboard