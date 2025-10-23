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
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase } from "lucide-react";


export default function SignupPage() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:flex items-center justify-center flex-col p-8 text-center">
        <Briefcase className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-4xl font-headline font-bold text-primary">TempHub</h2>
        <p className="mt-2 text-lg text-foreground">
          Work Made Simple. Opportunities Made Instant.
        </p>
      </div>
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
            <Card>
                <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
                <CardDescription>
                    Join TempHub to find your next gig or your next hire.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <RadioGroup defaultValue="seeker" className="grid grid-cols-2 gap-4">
                    <div>
                    <RadioGroupItem value="seeker" id="seeker" className="peer sr-only" />
                    <Label
                        htmlFor="seeker"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        Job Seeker
                    </Label>
                    </div>
                    <div>
                    <RadioGroupItem value="business" id="business" className="peer sr-only" />
                    <Label
                        htmlFor="business"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        Business
                    </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your Name" required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" type="tel" placeholder="+91 1234567890" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Chennai, TN" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                <Button className="w-full">Sign Up</Button>
                <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign In
                    </Link>
                </div>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
