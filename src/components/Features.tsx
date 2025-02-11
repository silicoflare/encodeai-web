import {
  BotIcon,
  GlobeIcon,
  GraduationCapIcon,
  TrophyIcon,
} from "lucide-react";

export default function Features() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-main p-10 py-20 snap-start"
      data-text="white"
    >
      <div className="w-[90%] md:w-4/5 flex flex-col items-center">
        <div className="w-full text-3xl md:text-5xl font-semibold font-heading text-center text-white">
          Why EncodeAI?
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 place-items-center mt-10 md:mt-20 grow">
          <div className="flex flex-col items-center gap-3 text-white text-xl md:text-2xl text-center h-full">
            <BotIcon size={100} strokeWidth={1} />
            Work on various AI-based projects
          </div>
          <div className="flex flex-col items-center gap-3 text-white text-xl md:text-2xl text-center h-full">
            <GlobeIcon size={100} strokeWidth={1} />
            Learn to make beautiful websites with peers
          </div>
          <div className="flex flex-col items-center gap-3 text-white text-xl md:text-2xl text-center h-full">
            <TrophyIcon size={100} strokeWidth={1} />
            Participate in and conduct competitive coding events
          </div>
        </div>
      </div>
    </div>
  );
}
