

'use client';

import Link from "next/link";
import { Home, PlusSquare, User, Briefcase, BrainCircuit } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function MobileNav() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const isBusiness = role === 'business';

  const seekerLinks = [
    { href: "/dashboard?role=seeker", icon: Home, label: "Home" },
    { href: "#", icon: BrainCircuit, label: "Skills" },
    { href: "/profile?role=seeker", icon: User, label: "Profile" },
  ];

  const businessLinks = [
    { href: "/dashboard?role=business", icon: Briefcase, label: "Dashboard" },
    { href: "/jobs/post", icon: PlusSquare, label: "Post" },
    { href: "/profile?role=business", icon: User, label: "Profile" },
  ];

  const navLinks = isBusiness ? businessLinks : seekerLinks;

  // Ensure grid-cols-3 for 3 items, adjust if number of items changes
  const gridColsClass = `grid-cols-${navLinks.length}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className={`grid h-full max-w-lg ${gridColsClass} mx-auto`}>
        {navLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted group"
          >
            <Icon className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
            <span className="text-xs text-muted-foreground group-hover:text-primary">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
