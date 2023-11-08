import useStorage from "@/lib/hooks/use-session-storage";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/shared/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ModeToggle() {
    const { setTheme } = useTheme()
  
    const Storage = useStorage();
    const current_theme_settings = Storage.getItem("theme", "local") || undefined;
    const [cur_theme, setCurTheme] = useState<string | undefined>(current_theme_settings);
  
    const setUITheme = () => {
      try {
        if (cur_theme === "light") {
          setTheme("dark");
          setCurTheme("dark");
        } else {
          setTheme("light");
          setCurTheme("light");
        }
      } catch { }
    }
  
    return (
      <Button variant="outline" size="icon" onClick={() => setUITheme()}>
        {
          cur_theme === "dark" ?
            <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
            : <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        }
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }