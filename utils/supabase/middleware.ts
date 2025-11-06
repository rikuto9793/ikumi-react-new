import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // ❗レスポンスは一度だけ作る（再生成しない）
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 必須: 3メソッド (get / set / remove)
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options?: Parameters<typeof response.cookies.set>[2]) {
          // ✅ response 側にだけ書く
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options?: Parameters<typeof response.cookies.set>[2]) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Cookie同期のために session 取得（getUserでもOK）
  await supabase.auth.getSession();

  return response;
}
