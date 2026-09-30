import type { Group } from "../types/group";

const rows: [string, string][] = [
  ["Seshanba", "Temur Zokirov"],
  ["Dushanba", "Temur Zokirov"],
  ["Seshanba", "Temur Zokirov"],
  ["Dushanba", "Fahriddin Murodov"],
  ["Seshanba", "Temur Zokirov"],
  ["Dushanba", "Temur Zokirov"],
  ["Dushanba", "Fahriddin Murodov"],
  ["Seshanba", "Fahriddin Murodov"],
  ["Dushanba", "Temur Zokirov"],
  ["Dushanba", "Temur Zokirov"],
];

// Mock data taken from the Figma frame; replace with a real API call.
export const mockGroups: Group[] = Array.from({ length: 100 }, (_, i) => {
  const [lessonDays, faceIdOperator] = rows[i % rows.length];
  return {
    id: i + 1,
    name: "Nodirbek-foundation",
    lessonDays,
    lessonTime: "10:00 - 12:00",
    faceIdOperator,
    direction: "Matematika",
  };
});
