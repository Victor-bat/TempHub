
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
import type { Job } from "@/lib/types";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";

// Using the same mock data for now
const mockJobs: Job[] = [
    {
    id: "1",
    title: "Senior React Developer",
    company: "Innovate Inc.",
    location: "Remote",
    payRate: "$70/hr",
    duration: "3 Months",
    description: "Seeking an experienced React developer to help build our next-generation user interface.",
    skills: ["React", "TypeScript", "Next.js"],
    category: "Tech",
  },
  {
    id: "5",
    title: "Event Staff",
    company: "Grand Festivities",
    location: "Downtown",
    payRate: "$18/hr",
    duration: "1 Day",
    description: "Energetic event staff needed for a corporate conference.",
    skills: ["Customer Service", "Teamwork"],
    category: "Events",
  },
];


export default function ApplyJobPage({ params }: { params: { id: string } }) {
  const job = mockJobs.find((j) => j.id === params.id);

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
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
              <Textarea
                id="cover-letter"
                placeholder="Briefly tell us why you're a great fit for this role."
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="proofs">Upload Documents</Label>
                 <div className="flex items-center justify-center w-full">
                    <Label
                        htmlFor="proofs"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Resume, ID, or other required documents
                        </p>
                        </div>
                        <Input id="proofs" type="file" className="hidden" multiple />
                    </Label>
                </div>
                 <p className="text-xs text-muted-foreground pt-1">
                    Please upload any documents required by the job description.
                </p>
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
