"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { IChildren } from "@/types/layout";

export default function AuthContext({ children, session }: IChildren & { session: Session | null }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}