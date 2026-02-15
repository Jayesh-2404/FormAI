"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, LayoutTemplate, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState(null);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [record, setRecord] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    if (user) getFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formId), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    if (result[0]) {
      setRecord(result[0]);
      setJsonForm(JSON.parse(result[0].jsonform));
      setSelectedBackground(result[0].background || "");
      setSelectedTheme(result[0].theme || "light");
      setSelectedStyle(JSON.parse(result[0].style || "{}"));
    }
  };

  useEffect(() => {
    if (updateTrigger && jsonForm) updateJsonFormInDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTrigger, jsonForm]);

  const onFieldUpdate = (value, index) => {
    const newJsonForm = { ...jsonForm };
    newJsonForm.fields[index].label = value.label;
    newJsonForm.fields[index].placeholder = value.placeholder;
    setJsonForm(newJsonForm);
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    if (!record) return;
    await db
      .update(JsonForms)
      .set({ jsonform: jsonForm })
      .where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
    toast.success("Form updated.");
  };

  const deleteField = (indexToRemove) => {
    const newFields = jsonForm.fields.filter((_, index) => index !== indexToRemove);
    setJsonForm({ ...jsonForm, fields: newFields });
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    if (!record) return;
    await db
      .update(JsonForms)
      .set({ [columnName]: value })
      .where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
    toast.success(`${columnName.charAt(0).toUpperCase() + columnName.slice(1)} updated.`);
  };

  if (!record) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex min-w-0 items-center gap-2">
              <span className="rounded-lg bg-primary/10 p-1.5">
                <LayoutTemplate className="h-4 w-4 text-primary" />
              </span>
              <h1 className="truncate font-accent text-sm font-semibold text-foreground sm:text-base">{jsonForm?.formTitle || "Edit Form"}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/aiform/${record?.id}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
            </Link>
            <RWebShare
              data={{
                text: `${jsonForm?.formHeading} - Build your form with FormAI`,
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${record?.id}`,
                title: jsonForm?.formTitle,
              }}
              onClick={() => toast.success("Share link opened.")}
            >
              <Button size="sm" className="gap-1.5 rounded-full">
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </RWebShare>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:p-8">
        <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:h-fit">
          <div className="surface-card p-5">
            <Controller
              selectedTheme={(value) => {
                updateControllerFields(value, "theme");
                setSelectedTheme(value);
              }}
              selectedBackground={(value) => {
                updateControllerFields(value, "background");
                setSelectedBackground(value);
              }}
              selectedStyle={(value) => {
                setSelectedStyle(value);
                updateControllerFields(JSON.stringify(value), "style");
              }}
              setSignInEnable={(value) => {
                updateControllerFields(value, "enabledSignIn");
              }}
            />
          </div>
        </aside>

        <section className="lg:col-span-9">
          <div
            className="surface-card flex min-h-[74vh] items-center justify-center rounded-3xl p-4 sm:p-8"
            style={{
              backgroundImage: selectedBackground,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: !selectedBackground ? "#f8fafc" : "transparent",
            }}
          >
            <div className="w-full max-w-[620px]">{jsonForm ? <FormUi jsonForm={jsonForm} selectedTheme={selectedTheme} selectedStyle={selectedStyle} onFieldUpdate={onFieldUpdate} deleteField={deleteField} /> : null}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditForm;
