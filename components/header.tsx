import { Ellipsis } from "lucide-react";

export default function Header({title}: {title: string}) {

  return (
    <header className="bg-white select-none max-w-full">
      <div className="max-w-full h-12 opacity-100 transition-opacity relative left-0">
        <div className="flex justify-between items-center overflow-hidden h-12 px-3">
          <div className="h-full text-sm flex items-center">
            <div className="py-1 cursor-pointer rounded-md  px-1.5 text-[#37352f] hover:bg-neutral-200">
              Untiled
            </div>
          </div>
          <div className="h-full flex items-center">
            <div className="py-1 cursor-pointer rounded-md  px-1.5 text-[#37352f] hover:bg-neutral-200">
              <Ellipsis size={20}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
