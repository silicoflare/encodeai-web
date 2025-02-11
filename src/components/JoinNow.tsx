import Link from "next/link";

export default function JoinNow() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center snap-start relative"
      data-text="white"
    >
      <img
        src="/team.jpg"
        alt="team"
        className="w-full h-full absolute top-0 left-0 brightness-[.2] -z-20"
      />
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 h-full md:h-2/3 z-10">
        <div className="text-center text-4xl md:text-6xl text-white font-heading uppercase md:leading-[1.25]">
          Join us in this journey
          <br className="hidden md:block" /> of{" "}
          <div className="inline text-main font-semibold">coding</div> and{" "}
          <div className="inline text-main font-semibold">fun</div>!
        </div>
        <div className="w-full md:w-1/2 grid grid-rows-2 md:grid-cols-2 items-center justify-center justify-items-center mt-10 gap-5 md:gap-10">
          <Link
            href="/login"
            className="w-full text-center px-14 py-5 border-main rounded-md bg-main text-white text-2xl font-heading uppercase transition ease-in-out duration-200 hover:bg-primary/90 hover:border-primary/90"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="w-full text-center px-14 py-5 border-main rounded-md bg-main text-white text-2xl font-heading uppercase transition ease-in-out duration-200 hover:bg-primary/90 hover:border-primary/90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
