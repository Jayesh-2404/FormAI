"use client";

import FormUi from "@/app/edit_form/_components/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LiveAiForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);

  useEffect(() => {
    if (params) getFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getFormData = async () => {
    const result = await db.select().from(JsonForms).where(eq(JsonForms.id, Number(params?.formid)));
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6"
      style={{
        backgroundImage: record?.background,
      }}
    >
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative z-10 w-full max-w-3xl">
        {record ? (
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={() => {}}
            deleteField={() => {}}
            selectedStyle={JSON.parse(record?.style)}
            selectedTheme={record?.theme}
            editable={false}
            formId={record.id}
            enabledSignIn={record?.enabledSignIn}
          />
        ) : null}
      </div>

      <Link
        className="fixed bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
        href="/"
      >
        <Image src="/logo.png" width={22} height={22} alt="FormAI logo" />
        Build your own form
      </Link>
    </div>
  );
}

export default LiveAiForm;
