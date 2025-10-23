
'use client';

import { useState } from "react";
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
import { Edit, Save, Star, ThumbsUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialUser = {
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
  upvotes: 128,
  reviews: [
      {
          id: 1,
          author: "Stark Industries",
          rating: 5,
          comment: "Excellent work ethic and delivered on time. Highly recommended.",
      },
      {
          id: 2,
          author: "Wayne Enterprises",
          rating: 5,
          comment: "Alice is a great team player and a very skilled developer.",
      }
  ]
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [tempSkills, setTempSkills] = useState(user.skills.join(", "));

  const handleEditToggle = () => {
    if (isEditing) {
        setUser(prevUser => ({...prevUser, skills: tempSkills.split(',').map(s => s.trim()).filter(Boolean)}));
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setUser(initialUser);
    setTempSkills(initialUser.skills.join(", "));
    setIsEditing(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target;
      setUser(prevUser => ({...prevUser, [name]: value}));
  }


  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 space-y-8">
      <Card>
        <CardHeader className="relative">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} data-ai-hint="person face" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                 <Input name="name" value={user.name} onChange={handleInputChange} className="text-3xl font-bold font-headline mb-1" />
              ) : (
                <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
              )}
               {isEditing ? (
                 <Input name="email" value={user.email} onChange={handleInputChange} className="text-md" />
              ) : (
                <CardDescription className="text-md">{user.email}</CardDescription>
              )}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg text-foreground">{user.upvotes}</span>
                    <span className="text-sm">Upvotes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {isEditing && (
                 <Button variant="outline" size="icon" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel</span>
                </Button>
            )}
            <Button variant="outline" size="icon" onClick={handleEditToggle}>
                {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                <span className="sr-only">{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-lg font-semibold">About Me</h3>
              {isEditing ? (
                <Textarea name="bio" value={user.bio} onChange={handleInputChange} className="mt-1 min-h-[100px]" />
              ) : (
                <p className="mt-1 text-muted-foreground">{user.bio}</p>
              )}
            </div>
            
            <Separator />

            <div>
              <h3 className="font-headline text-lg font-semibold">Skills</h3>
               {isEditing ? (
                <Input value={tempSkills} onChange={(e) => setTempSkills(e.target.value)} className="mt-2" placeholder="Comma-separated skills" />
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                    ))}
                </div>
              )}
            </div>

            <Separator />
            
            <div>
                <h3 className="font-headline text-lg font-semibold">Work Experience</h3>
                <div className="mt-2 space-y-4">
                    {user.experience.map((exp, index) => (
                        <div key={exp.company}>
                             {isEditing ? (
                                <div className="space-y-1">
                                    <Input value={exp.title} onChange={(e) => {
                                        const newExperience = [...user.experience];
                                        newExperience[index].title = e.target.value;
                                        setUser({...user, experience: newExperience});
                                    }} placeholder="Job Title" />
                                     <Input value={exp.company} onChange={(e) => {
                                        const newExperience = [...user.experience];
                                        newExperience[index].company = e.target.value;
                                        setUser({...user, experience: newExperience});
                                    }} placeholder="Company" />
                                     <Input value={exp.period} onChange={(e) => {
                                        const newExperience = [...user.experience];
                                        newExperience[index].period = e.target.value;
                                        setUser({...user, experience: newExperience});
                                    }} placeholder="Period (e.g. 2021 - Present)" />
                                </div>
                            ) : (
                                <>
                                    <h4 className="font-semibold">{exp.title}</h4>
                                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Reviews & Ratings</CardTitle>
            <CardDescription>What others are saying about {user.name.split(' ')[0]}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {user.reviews.map(review => (
                <div key={review.id} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center mb-1">
                        <h4 className="font-semibold">{review.author}</h4>
                        <div className="flex items-center ml-auto">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">&quot;{review.comment}&quot;</p>
                </div>
            ))}
             {user.reviews.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No reviews yet.</p>
             )}
        </CardContent>
      </Card>
    </div>
  );
}
