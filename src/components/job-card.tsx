import type { Job } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">{job.category}</Badge>
            <CardTitle className="font-headline text-xl">
              <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors duration-300">
                {job.title}
              </Link>
            </CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          <Image
            src={`https://placehold.co/40x40.png`}
            data-ai-hint="company logo"
            alt={`${job.company} logo`}
            width={40}
            height={40}
            className="rounded-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/jobs/${job.id}`}>
            View Details
            <ArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
