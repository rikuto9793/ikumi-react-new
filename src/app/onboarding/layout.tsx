// app/onboarding/1/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Onboarding Step 1",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
