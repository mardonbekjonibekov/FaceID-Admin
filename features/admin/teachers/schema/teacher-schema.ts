import { z } from "zod";

export const teacherSchema = z.object({
  fullName: z
    .string()
    .trim()
    .regex(/^\S+\s+\S+/, "Ism va familiyani kiriting"),
  direction: z.string().min(1, "Yo’nalishni tanlang"),
});

export type TeacherFormValues = z.infer<typeof teacherSchema>;
