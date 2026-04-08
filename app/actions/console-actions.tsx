"use server";
import { PrismaClient }      from '@/app/generated/prisma';
import { PrismaNeon }        from '@prisma/adapter-neon';
import { consoleSchema }        from "@/lib/validations/console";
import { writeFile, unlink } from "fs/promises";
import path                  from "path";

const getPrisma = () => new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
});

// Create Console - - -
export async function createConsole(formData: FormData) {
    const data = Object.fromEntries(formData);
    const parsed = consoleSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const file   = formData.get("image") as File;
    let fileName = "no-image.png";

    if (file && file.size > 0) {
        const bytes         = await file.arrayBuffer();
        const buffer        = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        fileName            = `${Date.now()}.${fileExtension}`;
        const filePath      = path.join(process.cwd(), "public/imgs", fileName);

        await writeFile(filePath, buffer);
    }

    const prisma = getPrisma();
    await prisma.console.create({
        data: {
            name:         parsed.data.name,
            releasedate:  new Date(parsed.data.releasedate),
            manufacturer: parsed.data.manufacturer,
            description:  parsed.data.description,
            image:        fileName,
        },
    });
    return { success: true };
}

// Update Console - - -
export async function updateConsole(formData: FormData) {
    const id = Number(formData.get("id"));
    if (!id) return { error: { id: ["Console ID is missing"] } };

    const data   = Object.fromEntries(formData);
    const parsed = consoleSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const file          = formData.get("image") as File;
    const existingImage = formData.get("existing_image") as string;
    let fileName        = existingImage || "no-image.png";

    if (file && file.size > 0) {
        const bytes         = await file.arrayBuffer();
        const buffer        = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        fileName            = `${Date.now()}.${fileExtension}`;
        const filePath      = path.join(process.cwd(), "public/imgs", fileName);
        await writeFile(filePath, buffer);

        if (existingImage && existingImage !== "no-image.png") {
            const oldFilePath = path.join(process.cwd(), "public/imgs", existingImage);
            try {
                await unlink(oldFilePath);
            } catch {
            }
        }
    }

    const prisma = getPrisma();
    await prisma.console.update({
        where: { id },
        data: {
            name:         parsed.data.name,
            releasedate:  new Date(parsed.data.releasedate),
            manufacturer: parsed.data.manufacturer,
            description:  parsed.data.description,
            image:        fileName,
        },
    });
    return { success: true };
}

// Delete Console - - -
export async function deleteConsole(id: number) {
    const prisma = getPrisma();
    const console   = await prisma.console.findUnique({ where: { id } });
    if (!console) return { error: "Console not found" };

    if (console.image && console.image !== "no-image.png") {
        const filePath = path.join(process.cwd(), "public/imgs", console.image);
        try {
            await unlink(filePath);
        } catch {
        }
    }

    await prisma.console.delete({ where: { id } });
    return { success: true };
}