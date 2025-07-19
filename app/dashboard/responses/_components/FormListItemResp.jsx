// app/dashboard/responses/_components/FormListItemResp.jsx

import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react' // Import useEffect
import * as XLSX from 'xlsx';

function FormListItemResp({jsonForm,formRecord}) {

    const [loading,setLoading]=useState(false);
    const [responseCount, setResponseCount] = useState(0); // State to hold response count

    // Fetch response count when component mounts or formRecord changes
    useEffect(() => {
        const getResponseCount = async () => {
            const result = await db.select().from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id));
            if (result) {
                setResponseCount(result.length);
            }
        };
        getResponseCount();
    }, [formRecord]);

    const ExportData=async()=>{
        let jsonData=[];
        setLoading(true);
        const result=await db.select().from(userResponses)
        .where(eq(userResponses.formRef,formRecord.id));

        console.log(result);
        if(result)
        {
            result.forEach((item)=>{
                const jsonItem=JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            })
            setLoading(false);
        }
        console.log(jsonData);
        exportToExcel(jsonData)
    }


    /**
     * Convert Json to Excel and then Donwload it
     */
    const exportToExcel=(jsonData)=>{
        if (jsonData.length === 0) {
            alert("No responses to export!");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, jsonForm?.formTitle+".xlsx");
    }

  return (
    <div className='border shadow-sm rounded-lg p-4 my-5'>

        <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
        <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
        <hr className='my-4'></hr>
        <div className='flex justify-between items-center'>
            {/* Display the dynamic response count */}
            <h2 className='text-sm'><strong>{responseCount}</strong> Responses</h2>
            <Button className="" size="sm"
            onClick={()=>ExportData()}
            disabled={loading}
            >
                {loading?<Loader2 className='animate-spin' />:'Export' }
                </Button>
        </div>
    </div>
  )
}

export default FormListItemResp
