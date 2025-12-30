import { Moon, ArrowLeft, Sun } from "lucide-react";
import { useTheme } from "./hooks";

function ThemeModal({ onClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="absolute bottom-[calc(100%+4px)] left-[10%] h-30 w-56 rounded-2xl border border-(--outline-primary) bg-(--bg-nav)">
        <header className="relative flex h-11 items-center justify-start">
          <ArrowLeft className="size-11 cursor-pointer p-3" onClick={onClick} />
          <span className="absolute left-[50%] translate-x-[-50%] text-[15px] font-semibold">
            Giao diện
          </span>
        </header>

        <div className="px-3 pt-2 pb-3">
          {/* Container với animated slider */}
          <div className="relative flex h-11 items-center justify-around rounded-2xl bg-(--bg-theme-icon) p-[3px]">
            {/* Animated Slider Background */}
            <div
              className="absolute h-9.5 w-[calc(50%-4px)] rounded-xl border border-(--outline-primary) bg-(--bg-hover) transition-all duration-300 ease-out"
              style={{
                left: theme === "light" ? "3px" : "calc(50% + 1px)",
              }}
            />

            {/* Light Theme Button */}
            <button
              onClick={toggleTheme}
              className="relative z-10 flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl transition-colors"
            >
              <Sun
                className={`size-5 transition-colors ${
                  theme === "light"
                    ? "text-(--color-icon-active)"
                    : "text-zinc-500"
                }`}
              />
            </button>

            {/* Dark Theme Button */}
            <button
              onClick={toggleTheme}
              className="relative z-10 flex h-full flex-1 cursor-pointer items-center justify-center rounded-xl transition-colors"
            >
              <Moon
                className={`size-5 transition-colors ${
                  theme === "dark"
                    ? "text-(--color-icon-active)"
                    : "text-zinc-500"
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
