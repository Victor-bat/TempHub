'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (userType: 'Job Seeker' | 'Business Owner') => {
    const role = userType === 'Job Seeker' ? 'seeker' : 'business';
    router.push(`/dashboard?role=${role}`);
  };

  const LoginForm = ({ userType }: { userType: 'Job Seeker' | 'Business Owner' }) => (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${userType}-email`}>Email / Mobile</Label>
          <Input id={`${userType}-email`} type="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2 relative">
          <div className="flex items-center">
            <Label htmlFor={`${userType}-password`}>Password</Label>
            <Link
              href="#"
              className="ml-auto inline-block text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Input id={`${userType}-password`} type="password" required />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Button className="w-full" onClick={() => handleLogin(userType)}>Login</Button>
        <Button variant="outline" className="w-full">
            Login with Google
        </Button>
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create New Account
        </Link>
      </div>
    </>
  );


  return (
     <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to continue to TempHub
            </p>
          </div>
           <Tabs defaultValue="seeker" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="business">Business Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="seeker" className="mt-6">
                <LoginForm userType="Job Seeker" />
            </TabsContent>
            <TabsContent value="business" className="mt-6">
                 <LoginForm userType="Business Owner" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
       <div className="hidden bg-muted lg:flex items-center justify-center flex-col p-8 text-center">
        <Briefcase className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-4xl font-headline font-bold text-primary">TempHub</h2>
        <p className="mt-2 text-lg text-foreground">
          Work Made Simple. Opportunities Made Instant.
        </p>
      </div>
    </div>
  );
}
