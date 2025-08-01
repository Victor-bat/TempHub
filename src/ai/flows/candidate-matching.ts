'use server';

/**
 * @fileOverview An AI-powered candidate matching flow for job postings.
 *
 * - matchCandidates - A function that takes a job description and returns a list of candidate profiles.
 * - MatchCandidatesInput - The input type for the matchCandidates function.
 * - MatchCandidatesOutput - The return type for the matchCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CandidateProfileSchema = z.object({
  name: z.string().describe('The full name of the candidate.'),
  skills: z.array(z.string()).describe('A list of skills possessed by the candidate.'),
  experience: z.string().describe('A summary of the candidate\'s work experience.'),
  contactInfo: z.string().describe('The email or phone number to contact the candidate.'),
});

const MatchCandidatesInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The full description of the job posting, including required skills and experience.'),
  candidateProfiles: z.array(CandidateProfileSchema).describe('A list of candidate profiles to match against the job description.'),
});
export type MatchCandidatesInput = z.infer<typeof MatchCandidatesInputSchema>;

const MatchCandidatesOutputSchema = z.array(CandidateProfileSchema).describe('A list of candidate profiles that are a good match for the job description, ranked by relevance.');
export type MatchCandidatesOutput = z.infer<typeof MatchCandidatesOutputSchema>;

export async function matchCandidates(input: MatchCandidatesInput): Promise<MatchCandidatesOutput> {
  return matchCandidatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchCandidatesPrompt',
  input: {schema: MatchCandidatesInputSchema},
  output: {schema: MatchCandidatesOutputSchema},
  prompt: `You are an expert recruiter specializing in matching candidates to job postings.

You will be provided with a job description and a list of candidate profiles.

Your task is to analyze the job description and identify the candidates whose skills and experience best match the requirements.

Return a list of candidate profiles that are a good match for the job description, ranked by relevance. Only include candidates who are qualified for the job.

Job Description: {{{jobDescription}}}

Candidate Profiles:
{{#each candidateProfiles}}
Name: {{{name}}}
Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Experience: {{{experience}}}
Contact Info: {{{contactInfo}}}
{{/each}}
`,
});

const matchCandidatesFlow = ai.defineFlow(
  {
    name: 'matchCandidatesFlow',
    inputSchema: MatchCandidatesInputSchema,
    outputSchema: MatchCandidatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
