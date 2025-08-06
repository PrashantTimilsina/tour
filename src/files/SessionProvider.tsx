"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
type Props = {
  children: React.ReactNode;
};
function CustomSessionProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default CustomSessionProvider;
