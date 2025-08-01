
"use server";

import {
  matchCandidates,
  type MatchCandidatesInput,
  type MatchCandidatesOutput
} from "@/ai/flows/candidate-matching";

const candidateProfiles = [
  {
    name: "Alice Johnson",
    skills: ["React", "Node.js", "TypeScript", "Next.js"],
    experience:
      "5 years as a full-stack developer, specializing in building scalable web applications with the MERN stack.",
    contactInfo: "alice.j@email.com",
  },
  {
    name: "Bob Williams",
    skills: ["Graphic Design", "Figma", "Adobe Illustrator", "User Research"],
    experience:
      "3 years in UI/UX design, with a strong portfolio of mobile and web app designs. Proficient in creating wireframes, prototypes, and high-fidelity mockups.",
    contactInfo: "bob.w@email.com",
  },
  {
    name: "Charlie Brown",
    skills: [
      "Data Entry",
      "Microsoft Excel",
      "QuickBooks",
      "Administrative Support",
    ],
    experience:
      "2 years as an administrative assistant. Highly organized and detail-oriented, with experience in scheduling, bookkeeping, and customer service.",
    contactInfo: "charlie.b@email.com",
  },
  {
    name: "Diana Miller",
    skills: ["Project Management", "Agile", "Scrum", "JIRA"],
    experience:
      "8 years as a project manager for tech companies. Proven track record of leading cross-functional teams to deliver projects on time and within budget.",
    contactInfo: "diana.m@email.com",
  },
  {
    name: "Ethan Davis",
    skills: ["JavaScript", "HTML", "CSS", "Vue.js", "Web Performance"],
    experience:
      "2 years of freelance front-end development. Passionate about creating responsive, accessible, and user-friendly web interfaces.",
    contactInfo: "ethan.d@email.com",
  },
  {
    name: "Fiona Garcia",
    skills: ["Content Writing", "SEO", "WordPress", "Copywriting"],
    experience: "4 years as a content strategist and writer, helping brands grow their online presence through high-quality blog posts and articles.",
    contactInfo: "fiona.g@email.com"
  }
];

export async function runCandidateMatch(
  jobDescription: string
): Promise<MatchCandidatesOutput | { error: string }> {
  try {
    const input: MatchCandidatesInput = {
      jobDescription,
      candidateProfiles,
    };
    const matchedCandidates = await matchCandidates(input);
    return matchedCandidates;
  } catch (error) {
    console.error("Error in candidate matching AI flow:", error);
    return { error: "An unexpected error occurred while finding candidates." };
  }
}
