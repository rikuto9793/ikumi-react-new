// src/utils/supabase/client.ts （パスはあなたの構成に合わせて）
// utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== "undefined") {
  console.log("[ENV] URL", url);
  console.log("[ENV] ANON", anonKey ? `${anonKey.slice(0,8)}...${anonKey.slice(-6)}` : "(missing)");
}

if (!url || !anonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY");

export const createClient = () => createBrowserClient(url!, anonKey!);
