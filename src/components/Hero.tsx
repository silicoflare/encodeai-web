import { ChevronDownIcon } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center gap-3 snap-start relative bg-none"
      data-text="black"
    >
      <img src="/aura-header.png" alt="aura header" className="w-1/2" />
      <div className="w-full font-heading text-center mt-10 text-3xl font-semibold uppercase">
        Your journey into AI begins here!
      </div>
      <ChevronDownIcon
        size={75}
        className="absolute bottom-5 left-[50%] text-black animate-bounce"
      />
    </div>
  );
}
