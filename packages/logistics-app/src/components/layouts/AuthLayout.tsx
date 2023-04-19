import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="card shadow-xl bg-neutral min-w-[22rem] p-8 flex flex-col gap-4 justify-center text-center">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
