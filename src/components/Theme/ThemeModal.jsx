import { Moon, ArrowLeft, Sun } from "lucide-react";
import { useState } from "react";

function ThemeModal({ onClick }) {
  const [activeTheme, setActiveTheme] = useState("dark"); // "light" or "dark"

  return (
    <>
      <div className="absolute bottom-[calc(100%+4px)] left-[10%] h-30 w-56 rounded-2xl bg-[#262626]">
        <header className="relative flex h-11 items-center justify-start">
          <ArrowLeft className="size-11 cursor-pointer p-3" onClick={onClick} />
          <span className="absolute left-[50%] translate-x-[-50%] text-[15px] font-semibold text-[#f3f5f7]">
            Giao diện
          </span>
        </header>

        <div className="px-3 pt-2 pb-3">
          {/* Container với animated slider */}
          <div className="relative flex h-11 items-center justify-around rounded-2xl bg-[#0a0a0a] p-[3px]">
            {/* Animated Slider Background */}
            <div
              className="absolute h-9.5 w-[calc(50%-4px)] rounded-xl bg-[#3a3a3a] transition-all duration-300 ease-out"
              style={{
                left: activeTheme === "light" ? "3px" : "calc(50% + 1px)",
              }}
            />

            {/* Light Theme Button */}
            <button
              onClick={() => setActiveTheme("light")}
              className="relative z-10 flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl transition-colors"
            >
              <Sun
                className={`size-5 transition-colors ${
                  activeTheme === "light" ? "text-white" : "text-zinc-500"
                }`}
              />
            </button>

            {/* Dark Theme Button */}
            <button
              onClick={() => setActiveTheme("dark")}
              className="relative z-10 flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl transition-colors"
            >
              <Moon
                className={`size-5 transition-colors ${
                  activeTheme === "dark" ? "text-white" : "text-zinc-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThemeModal;
