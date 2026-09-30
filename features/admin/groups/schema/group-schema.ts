import { z } from "zod";

export const groupSchema = z.object({
  name: z.string().trim().min(2, "Guruh nomini kiriting"),
  lessonDays: z.string().min(1, "Dars kunlarini tanlang"),
  lessonTime: z.string().min(1, "Dars vaqtini tanlang"),
  faceIdOperator: z.string().min(1, "Face ID’chini tanlang"),
  direction: z.string().min(1, "Yo’nalishni tanlang"),
  teacher: z.string().min(1, "O’qituvchini tanlang"),
});

export type GroupFormValues = z.infer<typeof groupSchema>;
