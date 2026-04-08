import { PrismaClient }   from '@/app/generated/prisma';
import { PrismaNeon }     from '@prisma/adapter-neon';
import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import EditGame           from '@/components/games/Edit';

export default async function EditPage({children, params }:{children: React.ReactNode; params: Promise<{ id: string }>; }) {
    const user = await stackServerApp.getUser();
    if(!user) {
        redirect('/');
    }

    const prisma = new PrismaClient({
        adapter: new PrismaNeon({
            connectionString: process.env.DATABASE_URL!
        })
    })

    const consoles = await prisma.console.findMany({
        orderBy: { id: "asc" },
    });

    const { id } = await params; 
    const game   = await prisma.game.findUnique({
        where: {
            id: parseInt(id), 
        },
        include: { console: true },
    });

  return (
    <SideBar currentPath={'/games'}>
      <EditGame game={game} consoles={consoles}/>
    </SideBar>
  );
}