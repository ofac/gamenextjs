import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import IndexConsoles      from "@/components/consoles/Index";

export default async function ConsolesPage({children}:{children: React.ReactNode;}) {
  const user = await stackServerApp.getUser();
  if(!user) {
    redirect('/');
  }

  return (
    <SideBar currentPath={'/consoles'}>
      <IndexConsoles />
    </SideBar>
  );
}