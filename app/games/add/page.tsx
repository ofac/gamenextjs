import { PrismaClient }   from '@/app/generated/prisma';
import { PrismaNeon }     from '@prisma/adapter-neon';
import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import AddForm            from "@/components/games/Add";

export default async function AddPage({children}:{children: React.ReactNode;}) {
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

  return (
    <SideBar currentPath={'/games'}>
      <AddForm consoles={consoles}/>
    </SideBar>
  );
}