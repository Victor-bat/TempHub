
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Alice Johnson",
    email: "alice.j@email.com",
    avatar: "https://placehold.co/100x100.png",
    bio: "Senior full-stack developer with over 5 years of experience in building modern, scalable web applications. Passionate about clean code and great user experiences.",
    skills: ["React", "Node.js", "TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
    experience: [
      {
        title: "Senior Developer",
        company: "Innovate Inc.",
        period: "2021 - Present",
      },
      {
        title: "Mid-level Developer",
        company: "Tech Solutions",
        period: "2019 - 2021",
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8">
      <Card>
        <CardHeader className="relative">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} data-ai-hint="person face" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
              <CardDescription className="text-md">{user.email}</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="icon" className="absolute top-4 right-4">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit Profile</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold">About Me</h3>
              <p className="mt-1 text-muted-foreground">{user.bio}</p>
            </div>
            
            <Separator />

            <div>
              <h3 className="font-headline text-lg font-semibold">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>

            <Separator />
            
            <div>
                <h3 className="font-headline text-lg font-semibold">Work Experience</h3>
                <div className="mt-2 space-y-4">
                    {user.experience.map(exp => (
                        <div key={exp.company}>
                            <h4 className="font-semibold">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.period}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
