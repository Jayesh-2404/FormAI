// app/dashboard/responses/page.jsx

"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp'
import { FileText } from 'lucide-react'

function Responses() {
    const { user } = useUser();
    const [formList, setFormList] = useState(null); // Use null for initial loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getFormList();
        }
    }, [user]);

    const getFormList = async () => {
        setIsLoading(true);
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id)); // Order for consistency

        setFormList(result);
        setIsLoading(false);
    };

    return (
        // This is the main fix: A full-height container with a background color
        <div className='p-6 sm:p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
            <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>Responses</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400 mb-6">View and export responses for your forms.</p>

            {/* Handle Loading State */}
            {isLoading && (
                <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map(item => (
                        <div key={item} className="h-[150px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            )}

            {/* Handle Empty State */}
            {!isLoading && formList?.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12">
                    <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No Forms Found</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">You haven't created any forms yet. Once you do, their responses will appear here.</p>
                </div>
            )}

            {/* Display Form List */}
            {!isLoading && formList?.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {formList.map((form) => (
                        <FormListItemResp
                            key={form.id}
                            formRecord={form}
                            jsonForm={JSON.parse(form.jsonform)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Responses;
