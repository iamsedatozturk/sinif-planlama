import { ROUTES_ENUM } from "@/routes/route.constant";

// src/utils/routing.ts
export const getAccessDeniedPath = (pathname: string) =>
  pathname.startsWith('/admin') ? ROUTES_ENUM.protected.accessDenied : ROUTES_ENUM.public.accessDenied
