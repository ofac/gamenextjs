import { PrismaClient }   from '@/app/generated/prisma';
import { PrismaNeon }     from '@prisma/adapter-neon';
import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import EditConsole        from '@/components/consoles/Edit';

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

    const { id }  = await params; 
    const console = await prisma.console.findUnique({
        where: {
            id: parseInt(id), 
        }
    });

  return (
    <SideBar currentPath={'/consoles'}>
      <EditConsole console={console}/>
    </SideBar>
  );
}