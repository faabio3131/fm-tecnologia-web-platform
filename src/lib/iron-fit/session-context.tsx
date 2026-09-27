"use client";

import { createContext, useContext } from "react";
import type { IronFitSessionUser } from "./auth-contract";

const SessionContext = createContext<IronFitSessionUser | null>(null);

export function IronFitSessionProvider({ user, children }: { user: IronFitSessionUser; children: React.ReactNode }) {
  return <SessionContext.Provider value={user}>{children}</SessionContext.Provider>;
}

export function useIronFitSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("IRON FIT session context unavailable");
  return value;
}

export function hasAnyRole(user: IronFitSessionUser, roles: string[]) {
  return user.isSuperAdmin || roles.some((role) => user.roles.includes(role));
}
