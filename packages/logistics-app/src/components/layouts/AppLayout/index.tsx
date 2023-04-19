import { ReactNode } from "react";
import AppHeader from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <AppHeader />
      <main className="flex-1 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-2">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
