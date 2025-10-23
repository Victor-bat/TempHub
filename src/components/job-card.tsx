
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
import { MapPin, DollarSign, Clock, ArrowRight, Code, PenTool, Clipboard, Users, ShoppingCart, ConciergeBell, Calendar, Wrench, Truck, Briefcase } from "lucide-react";
import Link from "next/link";
import React from "react";

type JobCardProps = {
  job: Job;
};

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

export function JobCard({ job }: JobCardProps) {
  const Icon = categoryIcons[job.category] || Briefcase;

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
          <div className="p-3 bg-muted rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
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
