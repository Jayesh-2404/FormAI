// app/dashboard/_components/CreateForm.jsx

"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiChatSession } from '@/configs/AiModal'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment';
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const PROMPT = ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format"

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false)
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();
    const { user } = useUser();
    const route = useRouter();

    const onCreateForm = async () => {
        setLoading(true)
        const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);

        if (result.response.text()) {
            const resp = await db.insert(JsonForms)
                .values({
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/yyyy')
                }).returning({ id: JsonForms.id });

            if (resp[0].id) {
                route.push('/edit_form/' + resp[0].id);
                setOpenDialog(false); // Close dialog on success
            }
        }
        setLoading(false);
    }

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)} className="w-full">+ Create Form</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className="my-2"
                                onChange={(event) => setUserInput(event.target.value)}
                                placeholder="Write a description of your form. For example: 'A contact form with fields for name, email, and message.'"
                            />
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button
                                    onClick={() => setOpenDialog(false)}
                                    variant="ghost">Cancel</Button>
                                <Button
                                    disabled={!userInput || loading}
                                    onClick={() => onCreateForm()}>
                                    {loading ?
                                        <Loader2 className='animate-spin' /> : 'Create'
                                    }
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateForm
