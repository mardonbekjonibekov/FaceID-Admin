import type { GroupStudent } from "../types/group-student";

const days = [
  "Seshanba",
  "Dushanba",
  "Seshanba",
  "Dushanba",
  "Seshanba",
  "Dushanba",
  "Dushanba",
  "Seshanba",
  "Dushanba",
  "Dushanba",
];

// Mock data taken from the Figma frame; replace with a real API call.
export const mockGroupStudents: GroupStudent[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  fullName: "Mashhad",
  jshshir: "1234567899876",
  lessonDays: days[i % days.length],
  lessonTime: "10:00 - 12:00",
  faceIdOperator: "Abdulla Komilov",
  direction: "Matematika",
  teacher: "Xasan Jumayev",
}));
