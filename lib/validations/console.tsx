import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const consoleSchema = z.object({
    name:       z.string().min(3, "Title is required"),
    image: z.union([
        z.instanceof(File)
            .refine((file) => file.size === 0 || file.type.startsWith("image/"), "File must be an image")
            .refine((file) => file.size === 0 || file.size <= MAX_FILE_SIZE, "Image must be less than 2MB")
            .optional(),
        z.string().optional(),
    ]).optional(),
    releasedate: z.string().min(1,        "Release date is required"),
    manufacturer:z.string().min(2,        "Manufacturer is required"),
    description: z.string().min(10,       "Description is too short")
});