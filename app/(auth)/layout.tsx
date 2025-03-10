import Navigation from "@/components/navigation";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="h-screen w-full flex">
        <Navigation />
        <main className="flex-1 h-screen overflow-y-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
