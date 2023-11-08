"use client"

import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const HomePage: FC = function () {
    const router = useRouter();
    useEffect(()=>{
        router.replace("/login");
    })
    return (
        <></>
    )
}

export default HomePage;