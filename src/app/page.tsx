import Features from "@/components/Features";
import Hero from "@/components/Hero";
import JoinNow from "@/components/JoinNow";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      <Navbar />
      <div className="w-screen h-screen overflow-y-scroll scroll-snap-container snap-mandatory">
        <Hero />
        <Features />
        <JoinNow />
      </div>
    </div>
  );
}
