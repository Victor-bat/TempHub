'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-4">
        <Briefcase className="h-12 w-12 text-primary" />
        <h1 className="text-5xl font-bold font-headline text-primary">TempHub</h1>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Work Made Simple. Opportunities Made Instant.
      </p>
    </div>
  );
}
