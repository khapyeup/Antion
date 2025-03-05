import Navigation from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex">
      <Navigation />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
