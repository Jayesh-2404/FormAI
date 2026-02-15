import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Download, Loader2, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

function FormListItemResp({ jsonForm, formRecord }) {
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const getResponseCount = async () => {
      const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id));
      setResponseCount(result?.length || 0);
    };
    getResponseCount();
  }, [formRecord]);

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
    XLSX.writeFile(workbook, `${jsonForm?.formTitle || "Form_Responses"}.xlsx`);
    toast.success("Responses exported.");
  };

  const exportData = async () => {
    setLoading(true);
    const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id));

    if (result?.length) {
      const jsonData = result.map((item) => JSON.parse(item.jsonResponse));
      setLoading(false);
      exportToExcel(jsonData);
    } else {
      setLoading(false);
      toast.error("No responses available for export.");
    }
  };

  return (
    <article className="surface-card flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-secondary/60 p-2.5">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {formRecord?.createdAt?.split("T")[0] || "Unknown date"}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="line-clamp-1 text-lg font-semibold text-foreground">{jsonForm?.formTitle}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{jsonForm?.formHeading}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <span className="badge-primary">{responseCount} responses</span>
        <Button onClick={exportData} disabled={loading || responseCount === 0} variant="outline" size="sm" className="h-9 gap-2 rounded-lg">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </article>
  );
}

export default FormListItemResp;
