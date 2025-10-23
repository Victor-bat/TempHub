
'use client';

import { Suspense, useState, useMemo, useContext } from 'react';
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
import { JobsContext } from '@/context/jobs-context';

const jobCategories = ["Tech", "Design", "Admin", "Management", "Retail", "Hospitality", "Events", "Labor", "Logistics", "Other"];

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { jobs, postedJobs } = useContext(JobsContext);

  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredJobs = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return jobs.filter(job => {
      // Search filter
      if (searchQuery) {
        const searchableContent = [
          job.title,
          job.company,
          ...job.skills,
        ].join(' ').toLowerCase();

        if (!searchableContent.includes(lowercasedQuery)) {
          return false;
        }
      }

      // Category filter
      if (filters.categories.size > 0 && !filters.categories.has(job.category)) {
        return false;
      }

      // Location filter
      const locationFilters = [
        filters.chennai && "Chennai",
        filters.coimbatore && "Coimbatore",
        filters.madurai && "Madurai",
      ].filter(Boolean);

      if (locationFilters.length > 0 && !locationFilters.some(loc => job.location.includes(loc as string))) {
        return false;
      }

      // Pay rate filter
      const payRate = parseInt(job.payRate.replace(/[^0-9]/g, ''));
      const payFilters = [
        filters.payHigh && payRate >= 900,
        filters.payMid && payRate >= 700 && payRate < 900,
        filters.payLow && payRate < 700,
      ];
      
      if (payFilters.some(f => f) && !payFilters.some(f => f === true)) {
          return false;
      }
      if(filters.payHigh || filters.payMid || filters.payLow){
          let pass = false;
          if(filters.payHigh && payRate >= 900) pass = true;
          if(filters.payMid && (payRate >= 700 && payRate < 900)) pass = true;
          if(filters.payLow && payRate < 700) pass = true;
          if(!pass) return false;
      }


      return true;
    });
  }, [searchQuery, filters, jobs]);

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
          {postedJobs.map((job) => (
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
          <Input 
            placeholder="Search by job title, skill, or company" 
            className="pl-10 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
                                onCheckedChange={(checked) => handleCategoryChange(cat, !!checked)}
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
        {filteredJobs.map((job) => (
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
