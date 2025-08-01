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
import { MapPin, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline text-xl">
              <Link href={`/jobs/${job.id}`} className="hover:underline">
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
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
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
        <Button asChild>
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
