import { stackServerApp } from "@/stack/server";
import { redirect }       from "next/navigation";
import SideBar            from "@/components/SideBar";
import IndexGames         from "@/components/games/Index";

export default async function GamesPage({children, searchParams,}:{children: React.ReactNode; searchParams: Promise<{ page?: string; search?: string; console?: string }>;}) {
  const user = await stackServerApp.getUser();
      if(!user) {
        redirect('/');
      }
  
  const params        = await searchParams;
  const page          = Number(params.page) || 1;
  const search        = params.search || "";
  const consoleFilter = params.console || "";

  return (
    <SideBar currentPath={'/games'}>
      <IndexGames page={page} search={search} consoleFilter={consoleFilter} />
    </SideBar>
  );
}