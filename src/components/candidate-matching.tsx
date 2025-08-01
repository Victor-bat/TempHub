"use client";

import { useState } from "react";
import { runCandidateMatch } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Wand2, UserSearch } from "lucide-react";
import type { MatchCandidatesOutput } from "@/ai/flows/candidate-matching";

type Candidate = {
  name: string;
  skills: string[];
  experience: string;
  contactInfo: string;
};

export default function CandidateMatching({
  jobDescription,
}: {
  jobDescription: string;
}) {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setError("");
    setSearched(true);
    setCandidates([]);
    const result = await runCandidateMatch(jobDescription);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
    } else {
      setCandidates(result as Candidate[]);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="font-headline">AI Candidate Matching</CardTitle>
            <CardDescription>
              Find the best candidates for this role.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center">
          <Button onClick={handleMatch} disabled={loading} className="mb-4">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Find Matching Candidates"
            )}
          </Button>

          {loading && (
             <p className="text-sm text-muted-foreground">Our AI is analyzing profiles...</p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          
          {!loading && !error && searched && candidates.length === 0 && (
            <div className="text-center p-6 border-dashed border-2 rounded-lg mt-4">
               <UserSearch className="mx-auto h-12 w-12 text-muted-foreground" />
               <p className="mt-4 text-sm font-semibold text-muted-foreground">No matching candidates found.</p>
               <p className="text-xs text-muted-foreground">Try refining the job description.</p>
            </div>
          )}

          {candidates.length > 0 && (
            <div className="mt-4 w-full text-left space-y-4">
              <h3 className="font-semibold">{candidates.length} Top Matches Found</h3>
              {candidates.map((candidate) => (
                <Card key={candidate.name} className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
                      <AvatarFallback>
                        {getInitials(candidate.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {candidate.experience}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
