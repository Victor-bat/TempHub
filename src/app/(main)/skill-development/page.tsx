
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

const recommendedVideos = [
  {
    id: '1',
    title: 'Top 10 Most In-Demand Skills for 2024',
    videoId: 'jLbUNFc2jzA',
    description: 'Learn about the most in-demand skills for the current job market.'
  },
  {
    id: '2',
    title: 'How to Write a Great Resume',
    videoId: 'Tt08KmFfIYQ',
    description: 'Craft a resume that stands out and gets you noticed by recruiters.'
  },
  {
    id: '3',
    title: 'Mastering the Job Interview: Pro Tips',
    videoId: 'ppf9j8x0LA8',
    description: 'Tips and tricks to help you ace your next job interview with confidence.'
  },
  {
    id: '4',
    title: 'The 4 Communication Styles',
    videoId: 'tB-s_R2-2sI',
    description: 'Improve your verbal and non-verbal communication for professional success.'
  },
  {
    id: '5',
    title: 'Financial Planning for Gig Economy Workers',
    videoId: '8j222l5uFxc',
    description: 'Learn how to manage your finances, save for taxes, and plan for the future as a temporary worker.'
  },
  {
    id: '6',
    title: 'How To Adapt To A New Work Environment',
    videoId: 'jAhG7YEX3H8',
    description: 'Tips for making a great impression and getting up to speed quickly in any new temporary role.'
  }
];

export default function SkillDevelopmentPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <div className="mb-8 text-center">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          Skill Development Hub
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Invest in yourself. Watch these videos to sharpen your skills and advance your career.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {recommendedVideos.map((video) => (
          <Card key={video.id} className="group flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-video overflow-hidden rounded-lg border">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
