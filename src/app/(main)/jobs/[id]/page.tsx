
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
import { ArrowLeft, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mockJobs: Job[] = [
  {
    id: "1",
    title: "React Developer",
    company: "TCS",
    location: "Chennai, TN",
    payRate: "₹900/day",
    duration: "2 Months",
    description: "Seeking an experienced React developer to help build our next-generation user interface. Must be proficient in TypeScript and Next.js. You will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack. You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "Redux", "Webpack"],
    category: "Tech",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Freshworks",
    location: "Chennai, TN",
    payRate: "₹950/day",
    duration: "Part-time",
    description: "We are looking for a talented UI/UX designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional user interfaces.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Wireframing"],
    category: "Design",
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
    id: "3",
    title: "Data Entry Clerk",
    company: "Info Systems",
    location: "Madurai, TN",
    payRate: "₹600/day",
    duration: "1 Month",
    description: "Hiring a detail-oriented data entry clerk to manage and update information on our company's databases and computer systems. The ideal candidate will be computer savvy and a fast typist with a keen eye for detail. You will report to a data manager or another senior data team member.",
    skills: ["Data Entry", "Microsoft Excel", "Accuracy", "Typing Speed"],
    category: "Admin",
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
    description: "We are seeking a seasoned Agile Project Manager to lead our development teams. You will be responsible for planning, executing, and finalizing projects according to strict deadlines and within budget. This includes acquiring resources and coordinating the efforts of team members and third-party contractors or consultants in order to deliver projects according to plan.",
    skills: ["Agile", "Scrum", "JIRA", "Project Planning", "Risk Management"],
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
    payRate: "₹1000/day + tips",
    duration: "Flexible",
    description: "Flexible delivery driver position available. Must have a valid driver's license and a reliable vehicle.",
    skills: ["Driving", "Navigation", "Customer Service"],
    category: "Logistics",
  },
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
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
                 <Image
                    src={`https://placehold.co/60x60.png`}
                    data-ai-hint="company logo"
                    alt={`${job.company} logo`}
                    width={60}
                    height={60}
                    className="rounded-lg hidden sm:block"
                  />
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
