import { ChevronDownIcon } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center gap-3 snap-start relative bg-none"
      data-text="white"
    >
      <div className="text-6xl md:text-9xl font-bold font-head">
        Encode
        <div className="inline text-main">.ai</div>
      </div>
      <div className="w-full font-heading text-center mt-10 text-lg md:text-4xl font-semibold uppercase md:leading-loose">
        Your journey into the world of technology
        <br />
        <div className="text-3xl md:text-6xl text-main">begins here!</div>
      </div>
      <ChevronDownIcon
        size={75}
        className="absolute bottom-5 md:left-[50%] text-white animate-bounce"
      />
    </div>
  );
}
