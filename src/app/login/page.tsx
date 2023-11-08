import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/shared/badge"
import { UserAuthForm } from "@/app/login/components/login_form"

export default function AuthenticationPage() {
  const services = ["Strategic Plan", "Range Architecture", "Open to Buy", "Assortment Plan", "Budget Plan", "Merchandise Financial Plan", "Wssi Mssi", "Sales Forecasting", "Margin Planning", "Option Plan", "Store Grading", "Auto Stock Replenishment"];
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white login_bg_lg lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex text-stone-600 items-center justify-center text-2xl py-1 bg-zinc-100 rounded-full p-2 px-3 border-b-2 border-zinc-300">
              <Image
                src={new URL("@/public/logo.png", import.meta.url).toString()}
                className="mr-2"
                alt="BMAPS logo"
                width="88"
                height="16"
              ></Image>
              <p>- MAPS</p>
            </Link>
          </div>
          <div className="md:shrink-0">
            <Image
              src={"images/login.svg"}
              alt="Authentication"
              width={600}
              height={600}
              className="mx-auto"
            />
          </div>
          <div className="relative z-20 mb-auto">
            <blockquote className="space-y-2">
              <p className="text-lg w-fit mx-auto">
                An opinionated collection of services, and utilities for your Retail workflows.
              </p>
            </blockquote>
            <hr className="my-5 mx-12" />
            <div className="flex flex-wrap justify-between items-center gap-4">
              {services.map((service, idx) => (
                <Badge key={idx} variant="secondary" className="text-indigo-950 whitespace-nowrap w-fit border-indigo-950">{service}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:p-8 my-16">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to continue
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}