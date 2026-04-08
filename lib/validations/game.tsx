import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const gameSchema = z.object({
    title:       z.string().min(3, "Title is required"),
    cover: z.union([
        z.instanceof(File)
            .refine((file) => file.size === 0 || file.type.startsWith("image/"), "File must be an image")
            .refine((file) => file.size === 0 || file.size <= MAX_FILE_SIZE, "Image must be less than 2MB")
            .optional(),
        z.string().optional(),
    ]).optional(),
    developer:   z.string().min(2,        "Developer is required"),
    releasedate: z.string().min(1,        "Release date is required"),
    price:       z.coerce.number().min(1, "Price must be positive"),
    genre:       z.string().min(2,        "Genre is required"),
    description: z.string().min(10,       "Description is too short"),
    console_id:  z.coerce.number().min(1, "You must select a console"),
});