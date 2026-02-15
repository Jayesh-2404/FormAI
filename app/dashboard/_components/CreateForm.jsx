"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { generateForm } from "@/actions/generateAiForm";
import { toast } from "sonner";

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    if (!userInput) return;
    setLoading(true);

    try {
      const result = await generateForm(userInput, user?.primaryEmailAddress?.emailAddress);
      if (result?.success && result?.data?.id) {
        route.push("/edit_form/" + result.data.id);
        setOpenDialog(false);
        toast.success("Form created successfully.");
        return;
      }

      toast.error(result?.error || "Could not create the form.");
    } catch (error) {
      toast.error(error?.message || "Unexpected error while creating the form.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenDialog(true)}
        className="gap-2 rounded-full bg-primary text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
        size="lg"
      >
        <Plus className="h-5 w-5" />
        Create New Form
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-accent text-2xl font-semibold text-foreground">
              <Sparkles className="h-6 w-6 text-primary" />
              Create new form
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-muted-foreground">
              Describe your form and FormAI will generate fields, structure, and defaults for you.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Textarea
              className="min-h-[150px] resize-none bg-secondary/30 p-4 text-base"
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Example: I need a registration form for a coding workshop with name, email, experience level, and expectations."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button onClick={() => setOpenDialog(false)} variant="outline" className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={onCreateForm} disabled={loading} className="min-w-[100px] rounded-lg">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
