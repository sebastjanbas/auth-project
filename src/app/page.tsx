import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalToggle from "@/components/ModalToggle";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div className="pt-10 flex flex-col justify-center items-center gap-2">
          <ModalToggle />
          <span className="text-white">
            Press the switch to toggle modal log in form
          </span>
        </div>
      </div>
    </main>
  );
}
