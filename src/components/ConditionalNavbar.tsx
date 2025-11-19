"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return !isHomePage ? <Navbar /> : null;
}
