"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";
import { Sparkles } from "lucide-react";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getFormList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getFormList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="surface-muted h-[190px] animate-pulse" />
        ))}
      </div>
    );
  }

  if (!formList.length) {
    return (
      <div className="surface-card flex min-h-[45vh] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Sparkles className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="font-accent text-2xl font-semibold text-foreground">No forms yet</h2>
        <p className="mt-2 max-w-md text-muted-foreground">Create your first AI-powered form to start collecting responses.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {formList.map((form, index) => (
        <div key={form.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 45}ms` }}>
          <FormListItem jsonForm={JSON.parse(form.jsonform)} formRecord={form} refreshData={getFormList} />
        </div>
      ))}
    </div>
  );
}

export default FormList;
