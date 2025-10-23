
'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { JobsContext } from '@/context/jobs-context';

const FileUpload = ({ label, description, id }: { label: string; description: string, id: string }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
            <div className="flex items-center justify-center w-full">
            <Label
                htmlFor={id}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
                </div>
                <Input id={id} type="file" className="hidden" />
            </Label>
        </div>
    </div>
);


export default function ApplyJobPage() {
  const params = useParams();
  const id = params.id as string;
  const { jobs, postedJobs } = useContext(JobsContext);
  const allJobs = [...jobs, ...postedJobs];
  const job = allJobs.find((j) => j.id === id);

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

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
       <Link
        href={`/jobs/${job.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Job Details
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Apply for {job.title}</CardTitle>
          <CardDescription>
            You are applying to the position of {job.title} at {job.company}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" required />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
              <Textarea
                id="cover-letter"
                placeholder="Briefly tell us why you're a great fit for this role."
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-4">
                <FileUpload id="resume-upload" label="Upload Resume" description="PDF, DOC, DOCX (Max 5MB)" />
                <FileUpload id="aadhar-upload" label="Upload Aadhar Card" description="PDF, JPG, PNG (Max 5MB)" />
                {job.category === 'Logistics' && (
                    <FileUpload id="license-upload" label="Upload Driving License" description="Required for logistics roles" />
                )}
            </div>
          </form>
        </CardContent>
         <CardFooter>
            <Button type="submit" className="w-full" size="lg">Submit Application</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
