"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ONBOARDING_STEPS, LAST_STEP } from "../steps";
import { Button } from "@/components/ui/button";

export default function StepNav() {
  const router = useRouter();
  const pathname = usePathname();
  const idx = ONBOARDING_STEPS.indexOf(pathname as any);

  useEffect(() => {
    const next = ONBOARDING_STEPS[idx + 1];
    if (next) router.prefetch(next);
  }, [idx, router]);

  const next = () => (pathname === LAST_STEP ? router.push("/home") : router.push(ONBOARDING_STEPS[idx + 1]));
  const back = () => idx > 0 && router.push(ONBOARDING_STEPS[idx - 1]);

  return (
    <div className="mt-8 flex justify-between">
      <Button variant="outline" onClick={back} disabled={idx <= 0}>戻る</Button>
      <Button className="bg-gradient-to-r from-pink-500 to-purple-600" onClick={next}>次へ</Button>
    </div>
  );
}
