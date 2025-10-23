
'use client';

import { useState, useContext, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobsContext } from "@/context/jobs-context";
import type { Job } from "@/lib/types";

function PostJobContent() {
  const router = useRouter();
  const { addJob, addPostedJob } = useContext(JobsContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Job['category'] | ''>('');
  const [payRate, setPayRate] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState("My Company"); // Assuming a default company for now

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !payRate || !duration || !location || !skills || !description) {
      // Basic validation
      alert("Please fill out all fields.");
      return;
    }

    const newJob: Job = {
      id: Date.now().toString(),
      title,
      company,
      category: category as Job['category'],
      payRate,
      duration,
      location,
      skills: skills.split(',').map(s => s.trim()),
      description,
    };

    addJob(newJob);
    addPostedJob(newJob);
    router.push('/dashboard?role=business');
  };


  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Post a New Gig</CardTitle>
          <CardDescription>
            Fill out the details below to find your next temporary hire.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="e.g., Senior React Developer" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setCategory(value as Job['category'])} value={category} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Hospitality">Hospitality</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Labor">Labor</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="pay-rate">Pay Rate</Label>
                <Input id="pay-rate" placeholder="e.g., ₹900/day" value={payRate} onChange={e => setPayRate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 3 Months, Part-time" value={duration} onChange={e => setDuration(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Chennai, TN" value={location} onChange={e => setLocation(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills Required</Label>
              <Input
                id="skills"
                placeholder="e.g., React, TypeScript, Figma"
                value={skills}
                onChange={e => setSkills(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Separate skills with a comma.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the job responsibilities, requirements, and any other relevant details."
                className="min-h-[150px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end">
                <Button type="submit">Post Gig</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PostJobPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostJobContent />
    </Suspense>
  )
}
