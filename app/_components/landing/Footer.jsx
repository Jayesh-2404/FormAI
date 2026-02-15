import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Templates", href: "/dashboard" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="page-shell py-12 sm:py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image src="/logo.svg" width={112} height={28} alt="FormAI" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Create, style, and share forms faster with AI assistance.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>(c) {new Date().getFullYear()} FormAI. All rights reserved.</p>
          <p>Built for modern teams.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
