
'use client';

import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobile-nav";
import { JobsProvider } from "@/context/jobs-context";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <JobsProvider>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          {!isLandingPage && <Header />}
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          {!isLandingPage && <MobileNav />}
        </Suspense>
      </div>
    </JobsProvider>
  );
}
