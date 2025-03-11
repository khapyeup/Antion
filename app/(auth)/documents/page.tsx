

import { PlusCircle } from "lucide-react";

export default function Page() {
  const hours = new Date().getHours();
  let welcomeText = "Hello";
  if (0 <= hours && hours <= 10) {
    welcomeText = "Good morning!";
  } else if (10 <= hours && hours <= 16) {
    welcomeText = "Good afternoon!";
  } else {
    welcomeText = "Good evening!";
  }

  return (
    <div className="w-full flex-col gap-10 h-screen flex justify-center items-center">
      <h1 className="text-3xl font-semibold tracking-wide">{welcomeText}</h1>
      <div className="w-full px-10 md:px-30">
        <div className="size-30 outline outline-neutral-300 rounded-lg flex flex-col gap-2 justify-center items-center hover:scale-105 transition-transform cursor-pointer">
            <PlusCircle className="text-neutral-500"/>
            <p className="text-neutral-500 text-sm">New page</p>
        </div>
      </div>
    </div>
  );
}
