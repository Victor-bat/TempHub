'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Job } from "@/lib/types";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "Innovate Inc.",
    location: "Remote",
    payRate: "$70/hr",
    duration: "3 Months",
    description: "Seeking an experienced React developer to help build our next-generation user interface. Must be proficient in TypeScript and Next.js.",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    category: "Tech",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Creative Solutions",
    location: "New York, NY",
    payRate: "$55/hr",
    duration: "Part-time",
    description: "We are looking for a talented UI/UX designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    category: "Design",
  },
  {
    id: "3",
    title: "Data Entry Clerk",
    company: "DataFlow",
    location: "Austin, TX",
    payRate: "$20/hr",
    duration: "1 Month",
    description: "Hiring a detail-oriented data entry clerk to manage and update information on our company's databases and computer systems.",
    skills: ["Data Entry", "Microsoft Excel", "Accuracy"],
    category: "Admin",
  },
   {
    id: "4",
    title: "Agile Project Manager",
    company: "Stripe",
    location: "Remote",
    payRate: "$85/hr",
    duration: "6 Months Contract",
    description: "We are seeking a seasoned Agile Project Manager to lead our development teams. You will be responsible for planning, executing, and finalizing projects according to strict deadlines.",
    skills: ["Agile", "Scrum", "JIRA", "Project Planning"],
    category: "Management",
  },
];

const mockPostedJobs: Job[] = [
    {
    id: "1",
    title: "Barista for Weekend Event",
    company: "Coffee House",
    location: "Downtown",
    payRate: "₹2000/day",
    duration: "2 days",
    description: "Looking for an experienced barista for a weekend coffee festival.",
    skills: ["Coffee Making", "Customer Service"],
    category: "Other"
  },
  {
    id: "2",
    title: "Temporary Retail Assistant",
    company: "Fashion Hub",
    location: "Mall",
    payRate: "₹150/hr",
    duration: "4 hours",
    description: "Need help with stocking and customer service during a sale.",
    skills: ["Retail", "Communication"],
    category: "Other"
  },
]

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (role === 'business') {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Your Job Posts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your current and past job postings.
            </p>
          </div>
          <Button asChild>
            <Link href="/jobs/post">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          {mockPostedJobs.map((job) => (
             <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
               <CardHeader>
                <CardTitle className="font-headline text-xl">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </CardTitle>
                <CardDescription>Status: Active - 5 Applicants</CardDescription>
               </CardHeader>
             </Card>
          ))}
        </div>
      </div>
    );
  }

  // Default to Job Seeker view
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Available Gigs Near You
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse through thousands of temporary job openings.
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by job type, location" className="pl-10" />
        </div>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
