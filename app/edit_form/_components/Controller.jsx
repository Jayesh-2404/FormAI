import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Themes from "@/app/_data/Themes";
import GradientBg from "@/app/_data/GradientBg";
import { Button } from "@/components/ui/button";
import Style from "@/app/_data/Style";
import { Checkbox } from "@/components/ui/checkbox";
import { Image as ImageIcon, Layout, Lock, Palette } from "lucide-react";
import Image from "next/image";

function Controller({ selectedTheme, selectedBackground, selectedStyle, setSignInEnable }) {
  const [showMore, setShowMore] = useState(6);

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Theme</h2>
        </div>
        <Select onValueChange={(value) => selectedTheme(value)}>
          <SelectTrigger className="w-full bg-secondary/30">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {Themes.map((theme) => (
              <SelectItem value={theme.theme} key={theme.theme}>
                <div className="flex items-center gap-2">
                  <div className="flex overflow-hidden rounded border border-border/50 shadow-sm">
                    <span className="h-4 w-4" style={{ backgroundColor: theme.primary }} />
                    <span className="h-4 w-4" style={{ backgroundColor: theme.secondary }} />
                    <span className="h-4 w-4" style={{ backgroundColor: theme.accent }} />
                    <span className="h-4 w-4" style={{ backgroundColor: theme.neutral }} />
                  </div>
                  <span className="text-sm">{theme.theme}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Background</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {GradientBg.map(
            (bg, index) =>
              index < showMore && (
                <button
                  key={bg.name}
                  type="button"
                  onClick={() => selectedBackground(bg.gradient)}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-primary/50"
                  style={{ background: bg.gradient || "#fff" }}
                >
                  {index === 0 ? <span className="absolute inset-0 flex items-center justify-center bg-white text-xs font-medium text-muted-foreground">None</span> : null}
                </button>
              )
          )}
        </div>
        <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setShowMore(showMore > 6 ? 6 : GradientBg.length)}>
          {showMore > 6 ? "Show less" : "Show more"}
        </Button>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Style</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Style.map((item) => (
            <button key={item.id} type="button" className="group" onClick={() => selectedStyle(item)}>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border transition-all group-hover:border-primary group-hover:shadow-md">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <span className="mt-1.5 block text-center text-xs font-medium capitalize text-muted-foreground transition-colors group-hover:text-primary">{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-4">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/35 p-3">
          <Checkbox id="auth-checkbox" onCheckedChange={(value) => setSignInEnable(value)} className="mt-0.5" />
          <div>
            <label htmlFor="auth-checkbox" className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              Require sign-in
            </label>
            <p className="mt-1 text-xs text-muted-foreground">Users must be authenticated before they can submit.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Controller;
