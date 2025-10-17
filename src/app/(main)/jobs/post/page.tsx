
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

export default function PostJobPage() {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="e.g., Senior React Developer" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="pay-rate">Pay Rate</Label>
                <Input id="pay-rate" placeholder="e.g., $50/hr or $500/project" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 3 Months, Part-time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Remote or New York, NY" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills Required</Label>
              <Input
                id="skills"
                placeholder="e.g., React, TypeScript, Figma (comma-separated)"
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
