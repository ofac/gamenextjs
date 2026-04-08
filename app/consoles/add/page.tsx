import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import AddForm            from "@/components/consoles/Add";

export default async function AddPage({children}:{children: React.ReactNode;}) {
    const user = await stackServerApp.getUser();
    if(!user) {
        redirect('/');
    }

  return (
    <SideBar currentPath={'/consoles'}>
      <AddForm />
    </SideBar>
  );
}