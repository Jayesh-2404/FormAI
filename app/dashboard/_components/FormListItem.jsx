import { Button } from '@/components/ui/button'
import { Edit, Share, Trash, MessageSquare, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms, userResponses } from '@/configs/schema' // Import userResponses
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'

function FormListItem({formRecord,jsonForm,refreshData}) {

    const {user}=useUser();
    const [responseCount, setResponseCount] = useState(null); // Use null for initial loading state

    useEffect(() => {
        const getResponseCount = async () => {
            if (formRecord?.id) {
                const result = await db.select().from(userResponses)
                    .where(eq(userResponses.formRef, formRecord.id));
                setResponseCount(result.length);
            }
        };
        getResponseCount();
    }, [formRecord]);

    const onDeleteForm=async()=>{
        const result=await db.delete(JsonForms)
        .where(and(eq(JsonForms.id,formRecord.id),
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))

        if(result)
        {
            toast.success('Form Deleted Successfully!');
            refreshData()
        } else {
            toast.error('Failed to delete form.');
        }
    }

  return (
    <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full'>
        <div className='p-5 flex-grow'>
            <div className='flex justify-between items-start'>
                <div className="flex-grow pr-4">
                    <h2 className='text-lg font-bold text-gray-900 dark:text-white truncate' title={jsonForm?.formTitle}>
                        {jsonForm?.formTitle}
                    </h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1 h-10 overflow-hidden text-ellipsis'>
                        {jsonForm?.formHeading}
                    </p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full flex-shrink-0 h-8 w-8">
                           <Trash className='h-4 w-4' />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this form
                                and all associated responses.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className='bg-red-600 hover:bg-red-700'
                                onClick={()=>onDeleteForm()}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className='mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-2'>
                    <MessageSquare className='h-4 w-4 text-gray-400' />
                    <span className="font-medium">
                        {responseCount === null ? 'Loading...' : `${responseCount} Responses`}
                    </span>
                </div>
                <div className='flex items-center gap-2'>
                    <CalendarDays className='h-4 w-4 text-gray-400' />
                    <span className='font-medium'>Created on {formRecord.createdAt}</span>
                </div>
            </div>
        </div>

        <div className='border-t border-gray-100 dark:border-gray-700 mt-auto p-3 bg-slate-50 dark:bg-gray-800/50 rounded-b-xl flex justify-end items-center gap-2'>
            <RWebShare
                data={{
                    text: jsonForm?.formHeading+" , Build your form in seconds with AI form Builder ",
                    url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
                    title: jsonForm?.formTitle,
                }}
                onClick={() => toast.success("Form link copied!")}
            >
                <Button variant="outline" size="sm" className="flex gap-2"> <Share className='h-4 w-4'/> Share</Button>
            </RWebShare>
            <Link href={'/edit_form/'+formRecord?.id}>
                <Button size="sm" className="flex gap-2"> <Edit className='h-4 w-4'/> Edit</Button>
            </Link>
        </div>
    </div>
  )
}

export default FormListItem