"use client"

import { Button } from "@/components/shared/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-16">
      <Image
        alt=""
        src="/images/404.svg"
        width={600}
        height={600}
        className="lg:max-w-md"
      />
      <h1 className="mb-6 text-2xl font-bold md:text-5xl">
        Page not found
      </h1>
      <p className="mb-6 w-4/5 max-w-xl text-center text-lg text-gray-500">
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
      </p>
      <Button
        variant={"default"}
        onClick={() => router.replace("/dashboard")}
      >
        <div className="mr-1 flex items-center gap-x-2">
          <ChevronLeftIcon className="text-xl" /> Go back home
        </div>
      </Button>
    </div>
  );
};