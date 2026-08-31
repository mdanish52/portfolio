// lib/types.ts

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  order: number;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  order: number;
};

export type Skill = {
  id: string;
  name: string;
  category?: string | null;
  order: number;
};