"use client"

import { Button } from "@/components/shared/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default function Error({ error, reset, }: {
    error: Error, reset: () => void
}) {
    const router = useRouter()
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-16">
            <Image
                alt=""
                src="/images/500.svg"
                width={600}
                height={600}
                className="lg:max-w-md"
            />
            <h1 className="mb-3 w-4/5 text-center text-2xl font-bold md:text-5xl">
                Something has gone seriously wrong
            </h1>
            <p className="mb-6 w-4/5 text-center text-lg text-gray-500">
                It&apos;s always time for a coffee break. We should be back by the time you
                finish your coffee.
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