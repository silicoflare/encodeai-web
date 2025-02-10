"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Menu() {
  const [color, setColor] = useState("black");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const col = entry.target.getAttribute("data-text");
            setColor(col ?? "black");
          }
        });
      },
      { threshold: 0.75 }
    );

    document.querySelectorAll(".snap-start").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex items-center justify-center gap-10 w-full font-semibold text-lg font-heading uppercase ml-20 transition ease-in-out"
      style={{ color }}
    >
      <Link href="/" className="cursor-pointer">
        Events
      </Link>
      <Link href="/" className="cursor-pointer">
        FAQs
      </Link>
      <Link href="/" className="cursor-pointer">
        Contact
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="w-full px-7 py-5 fixed top-0 left-0 flex items-center justify-between z-20">
      <Image src={"/aura-logo.png"} alt="aura logo" width={75} height={75} />
      <Menu />
      <Image src={"/aiml-logo.png"} alt="aiml logo" width={150} height={100} />
    </div>
  );
}
