export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  payRate: string;
  duration: string;
  description: string;
  skills: string[];
  category: "Tech" | "Design" | "Admin" | "Management" | "Retail" | "Hospitality" | "Events" | "Labor" | "Logistics" | "Other";
};
