import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 flex items-center gap-2">
        <Briefcase className="h-6 w-6 text-primary" />
        <Link href="/" className="font-headline text-xl font-bold text-primary">
          GigConnect
        </Link>
      </div>
      {children}
    </div>
  );
}
