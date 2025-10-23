'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Job } from "@/lib/types";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";

const mockJobs: Job[] = [
  {
    id: "1",
    title: "React Developer",
    company: "TCS",
    location: "Chennai, TN",
    payRate: "₹900/day",
    duration: "2 Months",
    description: "Seeking an experienced React developer to help build our next-generation user interface. Must be proficient in TypeScript and Next.js.",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    category: "Tech",
  },
  {
    id: "5",
    title: "Event Staff for Wedding",
    company: "Chennai Events",
    location: "Chennai, TN",
    payRate: "₹800/day",
    duration: "1 Day",
    description: "Energetic event staff needed for a wedding reception. Responsibilities include setup, guest assistance, and breakdown.",
    skills: ["Customer Service", "Teamwork", "Communication"],
    category: "Events",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Freshworks",
    location: "Chennai, TN",
    payRate: "₹950/day",
    duration: "Part-time",
    description: "We are looking for a talented UI/UX designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    category: "Design",
  },
   {
    id: "6",
    title: "Warehouse Associate",
    company: "E-com Logistics",
    location: "Coimbatore, TN",
    payRate: "₹700/day",
    duration: "2 Weeks",
    description: "Looking for a reliable warehouse associate for picking, packing, and shipping orders. Must be able to lift up to 20 kgs.",
    skills: ["Packing", "Inventory", "Lifting"],
    category: "Labor",
  },
  {
    id: "4",
    title: "Agile Project Manager",
    company: "Zoho",
    location: "Chennai, TN",
    payRate: "₹1000/day",
    duration: "3 Months Contract",
    description: "We are seeking a seasoned Agile Project Manager to lead our development teams. You will be responsible for planning, executing, and finalizing projects according to strict deadlines.",
    skills: ["Agile", "Scrum", "JIRA", "Project Planning"],
    category: "Management",
  },
  {
    id: "7",
    title: "Kitchen Helper",
    company: "Sangeetha Restaurant",
    location: "Madurai, TN",
    payRate: "₹800/day",
    duration: "2 days",
    description: "Assistant needed in a busy kitchen for food prep and cleaning duties during the weekend rush.",
    skills: ["Food Prep", "Cleaning", "Teamwork"],
    category: "Hospitality",
  },
  {
    id: "8",
    title: "Delivery Driver",
    company: "Quick Delivery",
    location: "Coimbatore, TN",
    payRate: "₹1000/day",
    duration: "Flexible",
    description: "Flexible delivery driver position available. Must have a valid driver's license and a reliable vehicle.",
    skills: ["Driving", "Navigation", "Customer Service"],
    category: "Logistics",
  },
  {
    id: "3",
    title: "Data Entry Clerk",
    company: "Info Systems",
    location: "Madurai, TN",
    payRate: "₹600/day",
    duration: "1 Month",
    description: "Hiring a detail-oriented data entry clerk to manage and update information on our company's databases and computer systems.",
    skills: ["Data Entry", "Microsoft Excel", "Accuracy"],
    category: "Admin",
  },
];

const mockPostedJobs: Job[] = [
    {
    id: "1",
    title: "Barista for Weekend Event",
    company: "The Brew Room",
    location: "Chennai, TN",
    payRate: "₹750/day",
    duration: "2 days",
    description: "Looking for an experienced barista for a weekend coffee festival.",
    skills: ["Coffee Making", "Customer Service"],
    category: "Hospitality"
  },
  {
    id: "2",
    title: "Temporary Retail Assistant",
    company: "Nalli Silks",
    location: "Coimbatore, TN",
    payRate: "₹650/day",
    duration: "4 hours",
    description: "Need help with stocking and customer service during a sale.",
    skills: ["Retail", "Communication"],
    category: "Retail"
  },
]

const jobCategories = ["Tech", "Design", "Admin", "Management", "Retail", "Hospitality", "Events", "Labor", "Logistics", "Other"];

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const [filters, setFilters] = useState({
    chennai: false,
    coimbatore: false,
    madurai: false,
    payHigh: false,
    payMid: false,
    payLow: false,
    categories: new Set<string>(),
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => {
        const newCategories = new Set(prev.categories);
        if(checked) {
            newCategories.add(category);
        } else {
            newCategories.delete(category);
        }
        return {...prev, categories: newCategories};
    })
  }

  if (role === 'business') {
    return (
      <div className="container mx-auto p-4 md:p-8 animate-fade-in">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
              Your Job Posts
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your current and past job postings.
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/jobs/post">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockPostedJobs.map((job) => (
             <Card key={job.id} className="group flex flex-col">
               <CardHeader>
                <CardTitle className="font-headline text-xl">
                  <Link href={`/jobs/${job.id}`} className="group-hover:text-primary transition-colors">
                    {job.title}
                  </Link>
                </CardTitle>
                <CardDescription>{job.company} - {job.location}</CardDescription>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-muted-foreground">Status: <span className="text-green-500 font-semibold">Active</span></p>
                 <p className="text-sm text-muted-foreground">Applicants: <span className="font-semibold text-foreground">5</span></p>
               </CardContent>
               <CardFooter>
                 <Button variant="outline" className="w-full">View Applicants</Button>
               </CardFooter>
             </Card>
          ))}
        </div>
      </div>
    );
  }

  // Default to Job Seeker view
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Available Gigs in Tamil Nadu
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Instantly find temporary jobs that fit your skills and schedule. Your next opportunity is just a click away.
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by job title, skill, or company" className="pl-10 text-base" />
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                         {jobCategories.map(cat => (
                            <DropdownMenuCheckboxItem
                                key={cat}
                                checked={filters.categories.has(cat)}
                                onCheckedChange={(checked) => handleCategoryChange(cat, checked)}
                            >
                                {cat}
                            </DropdownMenuCheckboxItem>
                         ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                 <DropdownMenuLabel>Location</DropdownMenuLabel>
                 <DropdownMenuCheckboxItem
                    checked={filters.chennai}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, chennai: !!checked}))}
                >
                    Chennai
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.coimbatore}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, coimbatore: !!checked}))}
                >
                    Coimbatore
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.madurai}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, madurai: !!checked}))}
                >
                    Madurai
                </DropdownMenuCheckboxItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuLabel>Pay per day</DropdownMenuLabel>
                 <DropdownMenuCheckboxItem
                    checked={filters.payHigh}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, payHigh: !!checked}))}
                >
                    ₹900 and above
                </DropdownMenuCheckboxItem>
                 <DropdownMenuCheckboxItem
                    checked={filters.payMid}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, payMid: !!checked}))}
                >
                    ₹700 - ₹900
                </DropdownMenuCheckboxItem>
                 <DropdownMenuCheckboxItem
                    checked={filters.payLow}
                    onCheckedChange={(checked) => setFilters(prev => ({...prev, payLow: !!checked}))}
                >
                    Below ₹700
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
