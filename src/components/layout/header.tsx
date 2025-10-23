
'use client';

import Link from "next/link";
import { Briefcase, User, BrainCircuit, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const isBusiness = role === 'business';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Briefcase className="h-6 w-6 mr-2 text-primary" />
          <Link href={isBusiness ? "/dashboard?role=business" : "/dashboard?role=seeker"} className="font-headline text-lg font-bold text-primary">
            TempHub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:space-x-4">
            {isBusiness ? (
              <>
                 <Button variant="ghost" asChild>
                  <Link href="/dashboard?role=business">Dashboard</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/jobs/post">Post a Job</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard?role=seeker">Find Jobs</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/skill-development">Skill Development</Link>
                </Button>
              </>
            )}
          </nav>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/profile?role=${role || 'seeker'}`}>
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
