import { PrismaClient }   from '@/app/generated/prisma';
import { PrismaNeon }     from '@prisma/adapter-neon';
import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import ShowGame           from '@/components/games/Show';

export default async function ShowPage({children, params }:{children: React.ReactNode; params: Promise<{ id: string }>; }) {
    const user = await stackServerApp.getUser();
    if(!user) {
        redirect('/');
    }

    const prisma = new PrismaClient({
        adapter: new PrismaNeon({
            connectionString: process.env.DATABASE_URL!
        })
    })

    const { id } = await params; 
    const game   = await prisma.game.findUnique({
        where: {
            id: parseInt(id), 
        },
        include: { console: true },
    });

  return (
    <SideBar currentPath={'/games'}>
      <ShowGame game={game} />
    </SideBar>
  );
}