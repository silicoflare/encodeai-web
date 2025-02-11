"use client";

import Navbar from "@/components/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { login } from "./fx";
import Link from "next/link";
import { withAuth } from "@/components/withAuth";

function Login() {
  const router = useRouter();

  const formSchema = z.object({
    srn: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      srn: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await login(data.srn, data.password);

    if (res === 404) {
      form.setError("srn", { message: "Student not found" });
      return;
    } else if (res === 401) {
      form.setError("password", { message: "Wrong password" });
      return;
    }
    {
      await signIn("student-auth", {
        username: data.srn,
        password: data.password,
        callbackUrl: "/",
      });
    }
  }

  return (
    <div
      className="w-screen h-screen grid grid-rows-3 md:grid-cols-3 snap-start"
      data-text="white"
    >
      <Navbar />
      <div className="row-span-1 md:col-span-2 w-full h-full bg-main text-white flex flex-col items-center justify-center text-4xl text-center leading-normal">
        Enter the world of modern technology,
        <br /> with EncodeAI
      </div>
      <div className="row-span-2 md:col-span-1 w-full h-full flex flex-col justify-center items-center gap-5 px-10">
        <h1 className="text-3xl font-semibold uppercase">Login</h1>
        <Form {...form}>
          <form
            className="w-3/4 flex flex-col items-center gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="srn"
              render={({ field }) => (
                <FormItem className="leading-[0.5]">
                  <FormLabel>SRN</FormLabel>
                  <FormControl>
                    <Input className="border-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="leading-[0.5]">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-center">
              <Button type="submit" className="bg-main border-main text-white">
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-5 flex items-center justify-center gap-1">
          Not a member yet?
          <Link href="/signup" className="underline text-main cursor-pointer">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

Login.auth = ["NOAUTH"];
export default withAuth(Login);
