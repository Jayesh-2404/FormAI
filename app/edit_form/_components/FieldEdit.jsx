import { Edit3, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

function FieldEdit({ defaultValue, onUpdate, deleteField }) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className="flex items-center gap-1 pt-6">
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" type="button" aria-label="Edit field">
            <Edit3 className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 space-y-3 border-border">
          <h3 className="text-sm font-semibold text-foreground">Edit field</h3>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Label</label>
            <Input type="text" defaultValue={defaultValue.label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Placeholder</label>
            <Input type="text" defaultValue={defaultValue.placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
          </div>
          <Button
            size="sm"
            className="mt-1 w-full rounded-lg"
            onClick={() =>
              onUpdate({
                label,
                placeholder,
              })
            }
          >
            Update field
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            type="button"
            aria-label="Delete field"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this field?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the field from the form structure immediately.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteField}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
