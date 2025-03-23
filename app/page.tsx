import Navbar from "@/components/navbar";
import { Book, FileText, Goal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    name: "Docs",
    icon: <FileText size={70} />,
    description: "Build any type, communicate any idea",
  },
  {
    name: "Wiki",
    icon: <Book size={70} />,
    description: "One home base for all your knowlwedge",
  },
  {
    name: "Goals",
    icon: <Goal size={70} />,
    description: "Track progress toward what is most important",
  },
];

export default function Page() {
  return (
    <div>
      <header className="sticky top-0 z-50 shadow-md">
        <Navbar />
      </header>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-6 pt-5 px-5">
        <h2 className="text-5xl font-bold text-center sm:text-7xl">
          The happier workspace
        </h2>
        <h3 className="text-2xl text-center sm:text-4xl">
          Write. Plan. Collaborate.
        </h3>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-400 shadow-lg transition-transform transform hover:scale-105"
        >
          Get Antion Free
        </Link>
        <div className="relative h-full w-full">
          <Image
            className=" object-cover"
            src="/hero.png"
            alt="hero image"
            fill
          />
        </div>
      </div>

      <div className="pt-5 px-5 mt-10 min-h-screen flex justify-center flex-col">
        <h2 className="font-bold text-4xl sm:text-6xl w-1/2">
          Everything you need to do your best work.
        </h2>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="space-y-2 ">
              {feature.icon}
              <h2 className="text-xl sm:text-2xl font-semibold">
                {feature.name}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}