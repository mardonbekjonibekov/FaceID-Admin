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

// Groups 1-10 have 25 students each (3 pages); other groups start empty.
// Mock data taken from the Figma frame; replace with a real API call.
export const mockGroupStudents: GroupStudent[] = Array.from(
  { length: 250 },
  (_, i) => ({
    id: i + 1,
    groupId: Math.floor(i / 25) + 1,
    fullName: "Mashhad",
    jshshir: String(1234567899876 + i),
    phone: "90 123-45-67",
    lessonDays: days[Math.floor(i / 25) % days.length],
    lessonTime: "10:00 - 12:00",
    faceIdOperator: "Abdulla Komilov",
    direction: "Matematika",
    teacher: "Xasan Jumayev",
  }),
);
