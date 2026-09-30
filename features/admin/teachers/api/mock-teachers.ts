import type { Teacher } from "../types/teacher";

const names = [
  "Sunnat Rahatov",
  "Firdavs Oxunjonov",
  "Zamira Muhammadova",
  "Yulduz Muhammadisoyeva",
  "Salim Murodov",
  "Zulfiya Ortiqova",
  "Laziz Holmatov",
  "Muhriddin Muhammadov",
  "Salima Yoqubova",
  "Salima Fahriddinova",
];

// Mock data taken from the Figma frame; replace with a real API call.
export const mockTeachers: Teacher[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  fullName: names[i % names.length],
  direction: "Matematika",
}));
