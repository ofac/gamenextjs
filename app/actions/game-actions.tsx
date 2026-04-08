"use server";
import { PrismaClient }      from '@/app/generated/prisma';
import { PrismaNeon }        from '@prisma/adapter-neon';
import { gameSchema }        from "@/lib/validations/game";
import { writeFile, unlink } from "fs/promises";
import path                  from "path";

const getPrisma = () => new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
});

// Create Game - - -
export async function createGame(formData: FormData) {
    const data = Object.fromEntries(formData);
    const parsed = gameSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const file   = formData.get("cover") as File;
    let fileName = "no-cover.png";

    if (file && file.size > 0) {
        const bytes         = await file.arrayBuffer();
        const buffer        = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        fileName            = `${Date.now()}.${fileExtension}`;
        const filePath      = path.join(process.cwd(), "public/imgs", fileName);

        await writeFile(filePath, buffer);
    }

    const prisma = getPrisma();
    await prisma.game.create({
        data: {
            title:       parsed.data.title,
            developer:   parsed.data.developer,
            releasedate: new Date(parsed.data.releasedate),
            price:       parsed.data.price,
            genre:       parsed.data.genre,
            description: parsed.data.description,
            console_id:  parsed.data.console_id,
            cover:       fileName,
        },
    });
    return { success: true };
}

// Update Game - - -
export async function updateGame(formData: FormData) {
    const id = Number(formData.get("id"));
    if (!id) return { error: { id: ["Game ID is missing"] } };

    const data   = Object.fromEntries(formData);
    const parsed = gameSchema.safeParse(data);

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const file          = formData.get("cover") as File;
    const existingCover = formData.get("existing_cover") as string;
    let fileName        = existingCover || "no-cover.png";

    if (file && file.size > 0) {
        const bytes         = await file.arrayBuffer();
        const buffer        = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        fileName            = `${Date.now()}.${fileExtension}`;
        const filePath      = path.join(process.cwd(), "public/imgs", fileName);
        await writeFile(filePath, buffer);

        if (existingCover && existingCover !== "no-cover.png") {
            const oldFilePath = path.join(process.cwd(), "public/imgs", existingCover);
            try {
                await unlink(oldFilePath);
            } catch {
            }
        }
    }

    const prisma = getPrisma();
    await prisma.game.update({
        where: { id },
        data: {
            title:       parsed.data.title,
            developer:   parsed.data.developer,
            releasedate: new Date(parsed.data.releasedate),
            price:       parsed.data.price,
            genre:       parsed.data.genre,
            description: parsed.data.description,
            console_id:  parsed.data.console_id,
            cover:       fileName,
        },
    });
    return { success: true };
}

// Delete Game - - -
export async function deleteGame(id: number) {
    const prisma = getPrisma();
    const game   = await prisma.game.findUnique({ where: { id } });
    if (!game) return { error: "Game not found" };

    if (game.cover && game.cover !== "no-cover.png") {
        const filePath = path.join(process.cwd(), "public/imgs", game.cover);
        try {
            await unlink(filePath);
        } catch {
        }
    }

    await prisma.game.delete({ where: { id } });
    return { success: true };
}