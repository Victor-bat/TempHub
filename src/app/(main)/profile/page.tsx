
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
import { Edit, Save, Star, ThumbsUp, X, Camera } from "lucide-react";
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
  const [tempUser, setTempUser] = useState(initialUser);

  const handleEditToggle = () => {
    if (isEditing) {
      const updatedSkills = tempUser.skills.map(s => typeof s === 'string' ? s.trim() : s).filter(Boolean);
      setUser({...tempUser, skills: updatedSkills as string[]});
    } else {
      setTempUser(user);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempUser(initialUser);
    setIsEditing(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target;
      setTempUser(prevUser => ({...prevUser, [name]: value}));
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTempUser(prevUser => ({...prevUser, skills: e.target.value.split(',')}));
  }

  const handleExperienceChange = (index: number, field: 'title' | 'company' | 'period', value: string) => {
    const newExperience = [...tempUser.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setTempUser(prevUser => ({...prevUser, experience: newExperience}));
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempUser(prevUser => ({ ...prevUser, avatar: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const currentUser = isEditing ? tempUser : user;


  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 space-y-8">
      <Card>
        <CardHeader className="relative">
          <div className="flex items-center space-x-4">
            <div className="relative">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} data-ai-hint="person face" />
                    <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {isEditing && (
                    <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                        <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                )}
            </div>
            <div>
              {isEditing ? (
                 <Input name="name" value={tempUser.name} onChange={handleInputChange} className="text-3xl font-bold font-headline mb-1" />
              ) : (
                <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
              )}
               {isEditing ? (
                 <Input name="email" value={tempUser.email} onChange={handleInputChange} className="text-md" />
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
                <Textarea name="bio" value={tempUser.bio} onChange={handleInputChange} className="mt-1 min-h-[100px]" />
              ) : (
                <p className="mt-1 text-muted-foreground">{user.bio}</p>
              )}
            </div>
            
            <Separator />

            <div>
              <h3 className="font-headline text-lg font-semibold">Skills</h3>
               {isEditing ? (
                <Input value={tempUser.skills.join(', ')} onChange={handleSkillsChange} className="mt-2" placeholder="Comma-separated skills" />
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
                    {currentUser.experience.map((exp, index) => (
                        <div key={index}>
                             {isEditing ? (
                                <div className="space-y-1">
                                    <Input value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} placeholder="Job Title" />
                                     <Input value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} placeholder="Company" />
                                     <Input value={exp.period} onChange={(e) => handleExperienceChange(index, 'period', e.target.value)} placeholder="Period (e.g. 2021 - Present)" />
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
