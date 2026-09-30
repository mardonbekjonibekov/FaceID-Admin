import type { Group } from "../types/group";

// First 10 rows come from the Figma frame; the rest vary so every direction has groups.
const figmaRows: [string, string][] = [
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

const extraDirections = ["Matematika", "Ingliz tili", "Kiberxavfsizlik"];
const extraTimes = ["10:00 - 12:00", "14:00 - 16:00", "16:00 - 18:00"];
const extraDays = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

export const mockGroups: Group[] = Array.from({ length: 100 }, (_, i) => {
  if (i < figmaRows.length) {
    const [lessonDays, faceIdOperator] = figmaRows[i];
    return {
      id: i + 1,
      name: "Nodirbek-foundation",
      lessonDays,
      lessonTime: "10:00 - 12:00",
      faceIdOperator,
      direction: "Matematika",
      teacher: "Xasan Jumayev",
    };
  }
  return {
    id: i + 1,
    name: "Nodirbek-foundation",
    lessonDays: extraDays[i % extraDays.length],
    lessonTime: extraTimes[i % extraTimes.length],
    faceIdOperator: "Abdulla Komilov",
    direction: extraDirections[i % extraDirections.length],
    teacher: "Xasan Jumayev",
  };
});
