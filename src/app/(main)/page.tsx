import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Job } from "@/lib/types";
import { Search, SlidersHorizontal } from "lucide-react";

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


export default function HomePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Find Your Next Gig
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse through thousands of temporary job openings.
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, skill, or company" className="pl-10" />
        </div>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
