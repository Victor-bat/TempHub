
'use client';

import React, { createContext, useState, ReactNode } from 'react';
import type { Job } from '@/lib/types';

const mockJobs: Job[] = [
  {
    id: "1",
    title: "React Developer",
    company: "TCS",
    location: "Chennai, TN",
    payRate: "₹900/day",
    duration: "2 Months",
    description: "Seeking an experienced React developer to help build our next-generation user interface. Must be proficient in TypeScript and Next.js.",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    category: "Tech",
  },
  {
    id: "5",
    title: "Event Staff for Wedding",
    company: "Chennai Events",
    location: "Chennai, TN",
    payRate: "₹800/day",
    duration: "1 Day",
    description: "Energetic event staff needed for a wedding reception. Responsibilities include setup, guest assistance, and breakdown.",
    skills: ["Customer Service", "Teamwork", "Communication"],
    category: "Events",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Freshworks",
    location: "Chennai, TN",
    payRate: "₹950/day",
    duration: "Part-time",
    description: "We are looking for a talented UI/UX designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research"],
    category: "Design",
  },
   {
    id: "6",
    title: "Warehouse Associate",
    company: "E-com Logistics",
    location: "Coimbatore, TN",
    payRate: "₹700/day",
    duration: "2 Weeks",
    description: "Looking for a reliable warehouse associate for picking, packing, and shipping orders. Must be able to lift up to 20 kgs.",
    skills: ["Packing", "Inventory", "Lifting"],
    category: "Labor",
  },
  {
    id: "4",
    title: "Agile Project Manager",
    company: "Zoho",
    location: "Chennai, TN",
    payRate: "₹1000/day",
    duration: "3 Months Contract",
    description: "We are seeking a seasoned Agile Project Manager to lead our development teams. You will be responsible for planning, executing, and finalizing projects according to strict deadlines.",
    skills: ["Agile", "Scrum", "JIRA", "Project Planning"],
    category: "Management",
  },
  {
    id: "7",
    title: "Kitchen Helper",
    company: "Sangeetha Restaurant",
    location: "Madurai, TN",
    payRate: "₹800/day",
    duration: "2 days",
    description: "Assistant needed in a busy kitchen for food prep and cleaning duties during the weekend rush.",
    skills: ["Food Prep", "Cleaning", "Teamwork"],
    category: "Hospitality",
  },
  {
    id: "8",
    title: "Delivery Driver",
    company: "Quick Delivery",
    location: "Coimbatore, TN",
    payRate: "₹1000/day",
    duration: "Flexible",
    description: "Flexible delivery driver position available. Must have a valid driver's license and a reliable vehicle.",
    skills: ["Driving", "Navigation", "Customer Service"],
    category: "Logistics",
  },
  {
    id: "3",
    title: "Data Entry Clerk",
    company: "Info Systems",
    location: "Madurai, TN",
    payRate: "₹600/day",
    duration: "1 Month",
    description: "Hiring a detail-oriented data entry clerk to manage and update information on our company's databases and computer systems.",
    skills: ["Data Entry", "Microsoft Excel", "Accuracy"],
    category: "Admin",
  },
];

const mockPostedJobs: Job[] = [
    {
    id: "1",
    title: "Barista for Weekend Event",
    company: "The Brew Room",
    location: "Chennai, TN",
    payRate: "₹750/day",
    duration: "2 days",
    description: "Looking for an experienced barista for a weekend coffee festival.",
    skills: ["Coffee Making", "Customer Service"],
    category: "Hospitality"
  },
  {
    id: "2",
    title: "Temporary Retail Assistant",
    company: "Nalli Silks",
    location: "Coimbatore, TN",
    payRate: "₹650/day",
    duration: "4 hours",
    description: "Need help with stocking and customer service during a sale.",
    skills: ["Retail", "Communication"],
    category: "Retail"
  },
];


type JobsContextType = {
  jobs: Job[];
  postedJobs: Job[];
  addJob: (job: Job) => void;
  addPostedJob: (job: Job) => void;
};

export const JobsContext = createContext<JobsContextType>({
  jobs: [],
  postedJobs: [],
  addJob: () => {},
  addPostedJob: () => {},
});

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [postedJobs, setPostedJobs] = useState<Job[]>(mockPostedJobs);

  const addJob = (job: Job) => {
    setJobs(prevJobs => [job, ...prevJobs]);
  };
  
  const addPostedJob = (job: Job) => {
    setPostedJobs(prevJobs => [job, ...prevJobs]);
  };

  return (
    <JobsContext.Provider value={{ jobs, postedJobs, addJob, addPostedJob }}>
      {children}
    </JobsContext.Provider>
  );
};
