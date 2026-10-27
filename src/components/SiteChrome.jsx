"use client";

import { usePathname } from "next/navigation";

/* The home page is a full-bleed scroll story with its own fixed
   header, so the shared Navbar and Footer step aside there and
   keep serving every other route. */
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return children;
}
