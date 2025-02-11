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
import { register } from "./fx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { withAuth } from "@/components/withAuth";

function SignUp() {
  const router = useRouter();

  const formSchema = z.object({
    srn: z.string(),
    name: z.string(),
    password: z.string(),
    confPass: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      srn: "",
      name: "",
      password: "",
      confPass: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.password !== data.confPass) {
      form.setError("confPass", { message: "Passwords don't match" });
      return;
    }

    const res = await register(data);

    if (res === 403) {
      form.setError("srn", { message: "Student with SRN already exists" });
      return;
    } else {
      toast.success("Created account successfully!");
      await signIn("student-auth", {
        username: data.srn,
        password: data.password,
        callbackUrl: "/",
      });
    }
  }

  return (
    <div
      className="w-screen h-screen grid grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-rows-1 snap-start"
      data-text="white"
    >
      <Navbar />
      <div className="row-span-1 md:col-span-2 w-full h-full bg-main text-white flex flex-col items-center justify-center text-4xl text-center leading-normal">
        Enter the world of modern technology,
        <br /> with EncodeAI
      </div>
      <div className="row-span-2 md:col-span-1 w-full h-full flex flex-col justify-center items-center gap-5 px-10">
        <h1 className="text-3xl font-semibold uppercase">Sign Up</h1>
        <Form {...form}>
          <form
            className="w-3/4 flex flex-col items-center gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="leading-[0.5]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="border-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confPass"
              render={({ field }) => (
                <FormItem className="leading-[0.5]">
                  <FormLabel>Confirm Password</FormLabel>
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
          Already a member?
          <Link href="/login" className="underline text-main cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

SignUp.auth = ["NOAUTH"];
export default withAuth(SignUp);
