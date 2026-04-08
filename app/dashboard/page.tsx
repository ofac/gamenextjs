import { stackServerApp } from "@/stack/server";
import { redirect }          from "next/navigation";
import SideBar               from "@/components/SideBar";
import SquaresFourIconCustom from "@/components/icons/SquaresFourIcon";
import DashboardContent      from "@/components/dashboard/DashboardContent";

export default async function DashboardPage({ children }:{ children: React.ReactNode }) {
  const user = await stackServerApp.getUser();
  if(!user) {
    redirect('/');
  }

  return (
    <SideBar currentPath={'/dashboard'}>
      <div className="p-4 bg-base-200 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex gap-2">
              <SquaresFourIconCustom />
              Dashboard
          </h1>
        </div>  
        <DashboardContent />
      </div>
    </SideBar>
  );
}