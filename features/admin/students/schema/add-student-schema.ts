import { z } from "zod";

export const addStudentSchema = z.object({
  lessonDays: z.string().min(1, "Dars kunlarini tanlang"),
  lessonTime: z.string().min(1, "Dars vaqtini tanlang"),
  faceIdOperator: z.string().min(1, "Face ID’chini tanlang"),
  teacher: z.string().min(1, "O’qituvchini tanlang"),
  phone: z
    .string()
    .refine((value) => value.replace(/\D/g, "").length === 9, "Telefon raqamni to’liq kiriting"),
});

export type AddStudentFormValues = z.infer<typeof addStudentSchema>;
