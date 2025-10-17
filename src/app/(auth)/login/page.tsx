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

export default function LoginPage() {
  const LoginForm = ({ userType }: { userType: 'Job Seeker' | 'Business Owner' }) => (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${userType}-email`}>Email / Mobile</Label>
          <Input id={`${userType}-email`} type="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${userType}-password`}>Password</Label>
          <Input id={`${userType}-password`} type="password" required />
        </div>
      </div>
       <div className="flex items-center my-4">
        <div className="flex-grow border-t border-muted-foreground"></div>
        <span className="mx-2 text-xs text-muted-foreground">OR</span>
        <div className="flex-grow border-t border-muted-foreground"></div>
      </div>
      <Button variant="outline" className="w-full">
          Login with Google
      </Button>
      <div className="mt-4 flex flex-col gap-4">
        <Button className="w-full">Login</Button>
        <div className="text-center text-sm">
          <Link href="#" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Create New Account
          </Link>
        </div>
      </div>
    </>
  );


  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Welcome to TempHub</CardTitle>
          <CardDescription>
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
