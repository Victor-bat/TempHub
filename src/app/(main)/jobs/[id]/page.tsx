
'use client';

import React, { useContext } from 'react';
import Link from "next/link";
import { JobsContext } from '@/context/jobs-context';
import CandidateMatching from "@/components/candidate-matching";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Job } from "@/lib/types";
import { ArrowLeft, Clock, DollarSign, MapPin, Code, PenTool, Clipboard, Users, ShoppingCart, ConciergeBell, Calendar, Wrench, Truck, Briefcase } from "lucide-react";


const categoryIcons: { [key in Job["category"]]: React.ElementType } = {
  Tech: Code,
  Design: PenTool,
  Admin: Clipboard,
  Management: Users,
  Retail: ShoppingCart,
  Hospitality: ConciergeBell,
  Events: Calendar,
  Labor: Wrench,
  Logistics: Truck,
  Other: Briefcase,
};


export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { jobs, postedJobs } = useContext(JobsContext);
  const allJobs = [...jobs, ...postedJobs];
  const job = allJobs.find((j) => j.id === params.id);

  if (!job) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Link href="/dashboard" className="mt-4 inline-block text-primary hover:underline">
          Back to all jobs
        </Link>
      </div>
    );
  }

  const Icon = categoryIcons[job.category] || Briefcase;

  const ApplyNowButton = () => (
    <Button size="lg" className="w-full" asChild>
      <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
    </Button>
  );

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <Link
        href="/dashboard?role=seeker"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">{job.category}</Badge>
                  <CardTitle className="font-headline text-3xl">{job.title}</CardTitle>
                  <CardDescription className="text-lg">{job.company}</CardDescription>
                </div>
                 <div className="p-4 bg-muted rounded-lg hidden sm:block">
                   <Icon className="h-8 w-8 text-primary" />
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.payRate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{job.duration}</span>
                  </div>
              </div>
              
              <h3 className="font-semibold mb-2 font-headline">Job Description</h3>
              <p className="text-foreground/80 whitespace-pre-wrap">{job.description}</p>
              
              <h3 className="font-semibold mt-6 mb-2 font-headline">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="block md:hidden">
            <ApplyNowButton />
          </div>

          <div className="block md:hidden">
            <CandidateMatching jobDescription={job.description} />
          </div>

        </div>
        <div className="md:col-span-1 space-y-6">
            <div className="hidden md:block">
              <ApplyNowButton />
            </div>
            <div className="hidden md:block">
             <CandidateMatching jobDescription={job.description} />
            </div>
        </div>
      </div>
    </div>
  );
}
