import type { StudentSearchResult } from "../types/student";

// Mock data taken from the Figma frames; replace with a real API call.
export const mockStudents: StudentSearchResult[] = [
  {
    id: 1,
    fullName: "Munira Fahriddinova",
    jshshir: "64967385727490",
    direction: "Matematika",
    company: "IT House",
  },
  {
    id: 2,
    fullName: "Munira Fahriddinova",
    jshshir: "64967385727490",
    direction: "Ingliz tili",
    company: "IT House",
  },
  {
    id: 3,
    fullName: "Munira Fahriddinova",
    jshshir: "64967385727490",
    direction: "Kiberxavfsizlik",
    company: "iGoo",
  },
];

export function searchStudents(jshshir: string): StudentSearchResult[] {
  const query = jshshir.trim();
  if (!query) return mockStudents;
  return mockStudents.filter((student) => student.jshshir.startsWith(query));
}
