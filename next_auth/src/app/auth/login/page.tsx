"use client";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function Login({}: Props) {
  const { register } = useForm();
  const { data, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }
  if (status === "authenticated") {
    redirect("/");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-[409px] m-auto gap-y-6">
      <h1 className="font-[900] text-4xl text-[#202430]">Welcome Back!</h1>
      <div className="flex justify-between w-full">
        <div className="w-[109px] h-[1px] bg-[#D6DDEB]"></div>
        <div className="w-[109px] h-[1px] bg-[#D6DDEB]"></div>
      </div>
      <form
        action={async (formdata) => {
          const data = {
            email: formdata.get("email"),
            password: formdata.get("password"),
          };

          const res = await signIn("akil-login", { ...data });
          console.log(res, "res from login");
        }}
        className="flex flex-col gap-y-[22px]"
      >
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="confirmPass"
          >
            Email Address
          </label>
          <input
            {...register("confirmPass")}
            name="email"
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="email"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold  text-[#515B6F] pb-2"
            htmlFor="confirmPass"
          >
            Password
          </label>
          <input
            {...register("confirmPass")}
            name="password"
            className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="pt-11">
          <Button buttonName="Continue" />
        </div>
      </form>
      <div>
        <p className="font-normal text-[#202430a2]">
          Don’t have an account?{" "}
          <Link href={"/auth"} className="text-[#4540deda]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
