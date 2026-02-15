"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { JsonForms, userResponses } from "@/configs/schema";
import { eq, inArray } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { FileText, MessageSquare, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

function Analytics() {
  const { user } = useUser();
  const [forms, setForms] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getAnalyticsData = async () => {
    setLoading(true);
    try {
      const formsResult = await db.select().from(JsonForms).where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));
      setForms(formsResult);

      if (formsResult.length > 0) {
        const formIds = formsResult.map((form) => form.id);
        const responsesResult = await db.select().from(userResponses).where(inArray(userResponses.formRef, formIds));
        setTotalResponses(responsesResult.length);

        const withCounts = formsResult
          .map((form) => ({
            ...form,
            responseCount: responsesResult.filter((response) => response.formRef === form.id).length,
          }))
          .sort((a, b) => b.responseCount - a.responseCount);

        setForms(withCounts);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWidth = (count) => {
    if (!forms.length) return 0;
    const max = Math.max(...forms.map((item) => item.responseCount || 0));
    return max === 0 ? 0 : (count / max) * 100;
  };

  return (
    <div className="page-shell">
      <PageHeader title="Analytics" subtitle="Track form performance and response trends." />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total forms</p>
              <p className="text-2xl font-semibold text-foreground">{loading ? "-" : forms.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-100 p-3">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total responses</p>
              <p className="text-2xl font-semibold text-foreground">{loading ? "-" : totalResponses}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-100 p-3">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. responses per form</p>
              <p className="text-2xl font-semibold text-foreground">{loading ? "-" : forms.length > 0 ? (totalResponses / forms.length).toFixed(1) : "0"}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="surface-card overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-accent text-xl font-semibold text-foreground">Form performance</h3>
        </div>
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading analytics...</div>
        ) : forms.length > 0 ? (
          <div className="divide-y divide-border">
            {forms.map((form) => (
              <div key={form.id} className="px-5 py-4 transition-colors hover:bg-secondary/30">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h4 className="truncate font-medium text-foreground">{JSON.parse(form.jsonform).formTitle}</h4>
                  <span className="text-sm font-semibold text-primary">{form.responseCount || 0} responses</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${getWidth(form.responseCount || 0)}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-muted-foreground">No analytics yet. Create forms and collect responses to see data here.</div>
        )}
      </section>
    </div>
  );
}

export default Analytics;
