"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthComponentProps = {
  auth?: string[];
};

export function withAuth<P extends object>(
  Component: React.ComponentType<P> & AuthComponentProps
) {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (
        (status === "unauthenticated" &&
          Component.auth &&
          Component.auth[0] !== "NOAUTH") ||
        (session &&
          Component.auth &&
          (!Component.auth.includes(session.user.role) ||
            Component.auth[0] === "NOAUTH"))
      ) {
        router.push("/");
      }
    }, [status, router, session]);

    if (Component.auth && status === "loading") {
      return (
        <div className="flex flex-col w-screen h-screen justify-center items-center gap-2">
          <Loader2Icon size={30} className="animate-spin" />
        </div>
      );
    }

    if (
      (status === "unauthenticated" &&
        Component.auth &&
        Component.auth[0] !== "NOAUTH") ||
      (session && Component.auth && !Component.auth.includes(session.user.role))
    ) {
      return null;
    }

    if (
      !Component.auth ||
      (!session && Component.auth && Component.auth[0] === "NOAUTH") ||
      session
    ) {
      return <Component {...props} />;
    }

    return null;
  };
}
