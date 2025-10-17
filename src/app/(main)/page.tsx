'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This component is no longer the main job board. 
// It now redirects to the dashboard which will serve that purpose.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Default to job seeker view for now
    router.replace('/dashboard?role=seeker');
  }, [router]);

  return null;
}
