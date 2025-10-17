import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Log In</CardTitle>
          <CardDescription>
            Are you looking for talent or for work?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex-col gap-2" asChild>
            <Link href="/login/business">
              <Building className="h-6 w-6" />
              <span>For Business</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2" asChild>
            <Link href="/login/seeker">
              <User className="h-6 w-6" />
              <span>For Job Seekers</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
