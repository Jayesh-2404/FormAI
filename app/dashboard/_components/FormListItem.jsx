import { Button } from "@/components/ui/button";
import { Edit, Share, Trash2, View } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms, userResponses } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

function FormListItem({ jsonForm, formRecord, refreshData }) {
  const { user } = useUser();
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const getResponseCount = async () => {
      const result = await db.select().from(userResponses).where(eq(userResponses.formRef, formRecord.id));
      setResponseCount(result?.length || 0);
    };
    getResponseCount();
  }, [formRecord]);

  const onDeleteForm = async () => {
    const result = await db
      .delete(JsonForms)
      .where(and(eq(JsonForms.id, formRecord.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    if (result) {
      toast.success("Form deleted.");
      refreshData();
    }
  };

  return (
    <article className="surface-card group relative h-full p-5">
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/0 via-primary/40 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-secondary/60 p-2.5">
          <View className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {formRecord?.createdAt?.split("T")[0] || "Unknown date"}
        </span>
      </div>

      <h2 className="line-clamp-1 text-lg font-semibold text-foreground">{jsonForm?.formTitle}</h2>
      <p className="mt-1 line-clamp-2 min-h-10 text-sm text-muted-foreground">{jsonForm?.formHeading}</p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="badge-accent">{responseCount} responses</span>
        <div className="flex items-center gap-1">
          <RWebShare
            data={{
              text: `${jsonForm?.formHeading} - Build your form in seconds with FormAI`,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${formRecord?.id}`,
              title: jsonForm?.formTitle,
            }}
            onClick={() => toast.success("Share link opened.")}
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <Share className="h-4 w-4" />
            </Button>
          </RWebShare>

          <Link href={`/edit_form/${formRecord?.id}`}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                <AlertDialogDescription>This action is permanent and removes the form and all response data.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteForm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </article>
  );
}

export default FormListItem;
