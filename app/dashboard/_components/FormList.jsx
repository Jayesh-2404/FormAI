"use client"
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';
import { FilePlus2 } from 'lucide-react';
import CreateForm from './CreateForm'; // Import CreateForm

function FormList() {
    const {user}=useUser();
    const [formList,setFormList]=useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if (user) {
            GetFormList();
        }
    },[user])

    const GetFormList=async()=>{
        setIsLoading(true);
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));

        setFormList(result);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {/* Skeleton Loader */}
                {[1, 2, 3].map(item => (
                    <div key={item} className="h-[230px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
                ))}
            </div>
        )
    }

    if (formList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 bg-white dark:bg-gray-800/50">
              <FilePlus2 className="h-16 w-16 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No Forms Yet</h3>
              <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">You haven't created any forms. Let's get your first one set up in seconds!</p>
              <div className="mt-6">
                <CreateForm />
              </div>
            </div>
        );
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {formList.map((form)=>(
            <FormListItem
                key={form.id}
                formRecord={form}
                jsonForm={JSON.parse(form.jsonform)}
                refreshData={GetFormList}
            />
        ))}
    </div>
  )
}

export default FormList