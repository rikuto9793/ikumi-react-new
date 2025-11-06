// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Supabase auth cookie → Next.js cookie に同期
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  // 保護したいパス一覧
  const protectedRoutes = ["/home", "/profile", "/messages"];

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) return response;

  // SupabaseのセッションCookieチェック
  const hasSession =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("sb-refresh-token");

  if (!hasSession) {
    // 未ログイン → /login へリダイレクト
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response; // 認証済→続行
}

// ★ 静的ファイル/画像/公開ファイルを除外
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
