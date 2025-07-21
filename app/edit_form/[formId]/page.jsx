"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'

function EditForm({ params }) {

  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState(null); // Initialize with null
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState(null); // Initialize with null

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackground, setSelectedBackground] = useState(''); // Initialize with empty string
  const [selectedStyle, setSelectedStyle] = useState(null); // Initialize with null

  useEffect(() => {
    if (user) GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db.select().from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formId),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    if (result[0]) {
      setRecord(result[0]);
      setJsonForm(JSON.parse(result[0].jsonform));
      setSelectedBackground(result[0].background || '');
      setSelectedTheme(result[0].theme || 'light');
      setSelectedStyle(JSON.parse(result[0].style || '{}'));
    }
  };

  useEffect(() => {
    if (updateTrigger && jsonForm) {
      updateJsonFormInDb();
    }
  }, [updateTrigger, jsonForm]);

  const onFieldUpdate = (value, index) => {
    const newJsonForm = { ...jsonForm };
    newJsonForm.fields[index].label = value.label;
    newJsonForm.fields[index].placeholder = value.placeholder;
    setJsonForm(newJsonForm);
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    if (record) {
      await db.update(JsonForms)
        .set({ jsonform: jsonForm })
        .where(and(eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast('Form updated successfully!');
    }
  };

  const deleteField = (indexToRemove) => {
    const newFields = jsonForm.fields.filter((_, index) => index !== indexToRemove);
    setJsonForm({ ...jsonForm, fields: newFields });
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    if (record) {
      await db.update(JsonForms).set({ [columnName]: value })
        .where(and(eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
      toast.success(`${columnName.charAt(0).toUpperCase() + columnName.slice(1)} updated!`);
    }
  };

  if (!record) {
    // Optional: Add a loading spinner or skeleton screen
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Page Header */}
      <header className="flex justify-between items-center p-4 sm:p-6 border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <h1 className='text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate'>
            {jsonForm?.formTitle || "Edit Form"}
          </h1>
        </div>
        <div className='flex items-center gap-2 sm:gap-3'>
          <Link href={'/aiform/' + record?.id} target="_blank">
            <Button variant="outline" className="flex gap-2">
              <SquareArrowOutUpRight className='h-4 w-4' />
              <span className="hidden sm:inline">Preview</span>
            </Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm?.formHeading + " , Build your form in seconds with AI form Builder ",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => toast.success("Form link copied!")}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
              <Share2 className='h-4 w-4' />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </RWebShare>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6'>
        {/* Controller */}
        <div className='lg:col-span-1 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border'>
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, 'theme');
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, 'background');
              setSelectedBackground(value);
            }}
            selectedStyle={(value) => {
              setSelectedStyle(value);
              updateControllerFields(JSON.stringify(value), 'style');
            }}
            setSignInEnable={(value) => {
              updateControllerFields(value, 'enabledSignIn');
            }}
          />
        </div>
        {/* Form Preview */}
        <div
          className='lg:col-span-2 rounded-xl flex items-center justify-center p-6 sm:p-12 min-h-[70vh] transition-all duration-300 border bg-white dark:bg-gray-800'
          style={{
            backgroundImage: selectedBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {jsonForm && <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />}
        </div>
      </div>
    </div>
  )
}

export default EditForm