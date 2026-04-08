import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GearIconCustom from "@/components/icons/GearIcon";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage({children}:{children: React.ReactNode;}) {
  const user = await stackServerApp.getUser();
      if(!user) {
        redirect('/');
      }

  return (
    <SideBar currentPath={'/settings'}>
      <div className="p-4 bg-base-200 min-h-screen">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold flex gap-2">
                 <GearIconCustom />
                 Settings
              </h1>
            </div>
            <AccountSettings />
       </div>
    </SideBar>
  );
}