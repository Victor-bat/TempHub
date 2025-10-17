
import Link from "next/link";
import { Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Briefcase className="h-6 w-6 mr-2 text-primary" />
          <Link href="/" className="font-headline text-lg font-bold text-primary">
            TempHub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Find Jobs</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/jobs/post">Post a Job</Link>
            </Button>
          </nav>
          <Button variant="outline" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
