import React from "react";
import { cn } from "@/lib/utils";

function PageSection({ children, className }) {
  return <section className={cn("surface-card p-4 sm:p-6", className)}>{children}</section>;
}

export default PageSection;
