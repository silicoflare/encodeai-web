"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MenuIcon } from "lucide-react";

function Menu() {
  const [color, setColor] = useState("black");
  const { data: session } = useSession();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const col = entry.target.getAttribute("data-text");
            setColor(col ?? "white");
          }
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".snap-start").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="hidden md:flex items-center justify-center gap-10 w-full font-semibold text-lg font-heading uppercase ml-20 transition ease-in-out"
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
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="active:outline-none outline-none">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{session.user.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[15rem]">
            <DropdownMenuLabel className="flex flex-col items-start justify-center gap-1">
              {session.user.name}
              <div className="text-muted-foreground font-light text-sm">
                {session.user.id}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                await signOut({
                  callbackUrl: "/",
                });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" className="cursor-pointer">
          Login
        </Link>
      )}
    </div>
  );
}

function MobileNav() {
  const { data: session } = useSession();

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="active:outline-none outline-none block md:hidden">
        <MenuIcon size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem] mr-2 md:mr-0">
        <DropdownMenuLabel className="flex flex-col items-start justify-center gap-1">
          {session.user.name}
          <div className="text-muted-foreground font-light text-sm">
            {session.user.id}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={async () => {
            await signOut({
              callbackUrl: "/",
            });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/login" className="cursor-pointer uppercase block md:hidden">
      Login
    </Link>
  );
}

export default function Navbar() {
  return (
    <div className="w-full px-7 py-5 fixed top-0 left-0 flex items-center justify-between z-20">
      <Link href="/">
        <Image
          src={"/encodeai-logo.png"}
          alt="encodeai logo"
          width={50}
          height={50}
        />
      </Link>
      <Menu />
      <Image
        src={"/aiml-logo.png"}
        alt="aiml logo"
        width={100}
        height={100}
        className="hidden md:block"
      />
      <MobileNav />
    </div>
  );
}
