"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import FormListItemResp from "./_components/FormListItemResp";
import PageHeader from "@/components/layout/PageHeader";

function Responses() {
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

  return (
    <div className="page-shell">
      <PageHeader title="Responses" subtitle="Review submission volume and export response data." />

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="surface-muted h-40 animate-pulse" />
          ))}
        </div>
      ) : formList.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {formList.map((form, index) => (
            <div key={form.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 45}ms` }}>
              <FormListItemResp formRecord={form} jsonForm={JSON.parse(form.jsonform)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="surface-card py-14 text-center text-muted-foreground">No forms found. Create one and collect responses to see exports here.</div>
      )}
    </div>
  );
}

export default Responses;
