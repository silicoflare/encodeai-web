import { BotIcon, GraduationCapIcon, TrophyIcon } from "lucide-react";

export default function Features() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#329D36] p-10 py-20 snap-start"
      data-text="white"
    >
      <div className="w-4/5 h-4/5 flex flex-col items-center">
        <div className="w-full text-5xl font-semibold font-heading text-center text-white">
          Why AURA?
        </div>
        <div className="w-full h-full grid grid-cols-3 gap-10 items-center justify-items-center mt-10">
          <div className="w-full h-full flex flex-col items-center gap-3 text-white text-2xl text-center">
            <BotIcon size={200} strokeWidth={1} />
            Work on and gain experience with various AI-based projects
          </div>
          <div className="w-full h-full flex flex-col items-center gap-3 text-white text-2xl text-center">
            <GraduationCapIcon size={200} strokeWidth={1} />
            Learn AI from peer mentors with profound experience
          </div>
          <div className="w-full h-full flex flex-col items-center gap-3 text-white text-2xl text-center">
            <TrophyIcon size={200} strokeWidth={1} />
            Participate in and conduct adrenaline-rushing AI competitions
          </div>
        </div>
      </div>
    </div>
  );
}
