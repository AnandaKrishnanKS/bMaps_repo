"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { DashboardIcon } from "@radix-ui/react-icons";
import { getEnabledServices } from "@/app/api/auth";
import useScroll from "@/lib/hooks/use-scroll";
import useStorage from "@/lib/hooks/use-session-storage";
import { Button } from "@/components/shared/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/shared/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";

import { toSnakeCase, tw_style_merge } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/nav-bar/theme-toggle";
import { useLogOutModal } from "@/components/layout/nav-bar/logout-modal";
import UserDropdown from "@/src/components/layout/nav-bar/user-dropdown";
import { Popover, PopoverContent, PopoverTrigger } from "../../shared/popover";
import ConnectionStatusIndicator from "../../shared/connectionStatusIndicator.tsx";

export default function AppNavbar({
  is_AdminDash = false,
}: {
  is_AdminDash: boolean;
}) {
  function getTitle(key: string): string | undefined {
    const serviceTitles: { [key: string]: string } = {
      SP: "Strategic Plan",
      RA: "Range Architecture",
      OTB: "Open to Buy",
      AP: "Assortment Plan",
      BP: "Budget Plan",
      WSSI_MSSI: "WSSI_MSSI",
      MFP: "Merchandise Financial Plan",
      SF: "Sales Forecasting",
      MP: "Margin Planning",
      OP: "Option Plan",
      SG: "Store Grading",
      ASR: "Auto Stock Replenishment",
      KPI: "Key Performance Index",
    };
    return serviceTitles[key] || undefined;
  }

  const scrolled = useScroll(50);
  const router = useRouter();
  const pathname = usePathname();

  const { getItem } = useStorage();
  const access_token = getItem("access_token");

  const [user_name, setUserName] = useState<string>("");
  const [user_email, setUserEmail] = useState<string>("");

  const [services, setServices] = useState<string[]>([]);

  const { LogOutModal, setShowLogOutModal } = useLogOutModal();

  const [heading, setHeading] = useState<string>("Dashboard");

  useEffect(() => {
    const page_heading =
      pathname?.startsWith("/dashboard/service/assortment__plan") === true
        ? "Assortment Plan"
        : pathname?.startsWith(
            "/dashboard/service/auto__stock__replenishment"
          ) === true
        ? "Auto Stock Replenishment"
        : pathname?.startsWith("/dashboard/service/budget__plan") === true
        ? "Budget Plan"
        : pathname?.startsWith("/dashboard/service/margin__planning") === true
        ? "Margin Planning"
        : pathname?.startsWith(
            "/dashboard/service/merchandise__financial__plan"
          ) === true
        ? "Merchandise Financial Plan"
        : pathname?.startsWith("/dashboard/service/option__plan") === true
        ? "Option Plan"
        : pathname?.startsWith("/dashboard/service/open__to__buy") === true
        ? "Open to Buy"
        : pathname?.startsWith("/dashboard/service/range__architecture") ===
          true
        ? "Range Architecture"
        : pathname?.startsWith("/dashboard/service/sales__Forcasting") === true
        ? "Sales Forcasting"
        : pathname?.startsWith("/dashboard/service/store__grading") === true
        ? "Store Grading"
        : pathname?.startsWith("/dashboard/service/strategic__plan") === true
        ? "Strategic Plan"
        : pathname?.startsWith("/dashboard/service/wssi_mssi") === true
        ? "WSSI MSSI"
        : pathname?.startsWith("/dashboard/service/kpi") === true
        ? "Key Performance Index"
        : "Dashboard";
    setHeading(page_heading);
  }, [pathname]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getEnabledServices();
        if (response.services === null) {
          setServices([]);
          alert(
            "Unable to fetch enabled services in your account. Please try loging in again."
          );
        } else {
          setServices(response.services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (services.length === 0) {
      fetchServices();
    }
  }, [access_token, services]);

  useEffect(() => {
    setUserName(getItem("user_name", "session"));
    setUserEmail(getItem("user_email", "session"));
  }, [access_token, getItem]);

  useEffect(() => {
    if (!access_token) {
      router.replace("/");
    }
  });

  return (
    <header className="subpixel-antialiased">
      <nav
        className={`fixed top-0 w-full bg-white border-gray-200 px-4 lg:px-6 ${
          scrolled ? "border-b border-gray-200 backdrop-blur-xl" : ""
        } bg-white/0 z-30 transition-all`}
      >
        <LogOutModal />
        <div className="w-full p-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center bg-stone-50 rounded-lg w-max pr-3">
                <Image
                  src={"/logo.png"}
                  className="mx-2 px-2"
                  alt="BMAPS logo"
                  width="132"
                  height="24"
                ></Image>
                <span className="self-center text-indigo-950 whitespace-nowrap text-2xl font-semibold">
                  - BMAPS
                </span>
              </div>
            </div>
            {is_AdminDash === true ? (
              <div className="px-0 lg:py-3 lg:px-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className={tw_style_merge(
                      "flex items-center px-4",
                      (pathname === "/admin") === true
                        ? "font-bold text-primary"
                        : "font-medium text-default"
                    )}
                    onClick={() => router.replace("/admin")}
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className={tw_style_merge(
                      "flex items-center px-4",
                      pathname?.startsWith("/admin/analytics") === true
                        ? "font-bold text-primary"
                        : "font-medium text-default"
                    )}
                    onClick={() => router.replace("/admin/analytics")}
                  >
                    Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className={tw_style_merge(
                      "flex items-center px-4",
                      pathname?.startsWith("/admin/iam") === true
                        ? "font-bold text-primary"
                        : "font-medium text-default"
                    )}
                    onClick={() => router.replace("/admin/iam")}
                  >
                    IAM
                  </Button>
                  <Button
                    variant="ghost"
                    className={tw_style_merge(
                      "flex items-center px-4",
                      pathname?.startsWith("/admin/services") === true
                        ? "font-bold text-primary"
                        : "font-medium text-default"
                    )}
                    onClick={() => router.replace("/admin/services")}
                  >
                    Services
                  </Button>
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
            )}
            <div className="flex flex-col items-end">
              <div className="flex items-center lg:gap-x-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                      <DashboardIcon className="me-2 font-bold" />
                      <span className="text-grey-900">Services</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 mr-3" align="start">
                    <Command
                      loop
                      className="rounded-b-none"
                      filter={(value, search) => {
                        if (
                          value
                            .toString()
                            .toUpperCase()
                            .startsWith(search.toString().toUpperCase())
                        )
                          return 1;
                        return 0;
                      }}
                    >
                      <CommandInput placeholder={"Search service..."} />
                      <CommandList>
                        <CommandEmpty>No services found.</CommandEmpty>
                        <CommandGroup>
                          {services.map((service, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                router.replace(
                                  `/dashboard/service/${toSnakeCase(
                                    String(getTitle(service))
                                  )}`
                                )
                              }
                            >
                              <CommandItem>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <div className="text-sm font-medium ml-1">
                                  {getTitle(service)}
                                </div>
                              </CommandItem>
                            </div>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <ModeToggle />
                <UserDropdown
                  user_email={user_email}
                  user_name={user_name}
                  setShowLogOutModal={setShowLogOutModal}
                />
              </div>
              <ConnectionStatusIndicator className=" mt-2" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
