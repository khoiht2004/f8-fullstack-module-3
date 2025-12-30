import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Thêm tất cả icon vào library
library.add(fas, far, fab);

import { NavLink } from "react-router";
import paths from "@/configs/path";
import NavMenu from "./NavMenu";
import { useState } from "react";
import ThemeModal from "../Theme/ThemeModal";

const styles = {
  link: {
    fontSize: "24px",
    cursor: "pointer",
  },
  addPostBtn: {
    fontSize: "24px",
    color: "var(--color-icon)",
    cursor: "pointer",
    backgroundColor: "var(--bg-icon)",
  },
};

const items = [
  {
    path: paths.homePage,
    iconSolid: ["fas", "house"],
    iconRegular: ["fas", "house"],
  },
  {
    path: paths.searchPage,
    iconSolid: ["fas", "magnifying-glass"],
    iconRegular: ["fas", "magnifying-glass"],
  },
  { path: null, iconSolid: ["fas", "plus"], iconRegular: ["fas", "plus"] },
  {
    path: paths.activityPage,
    iconSolid: ["fas", "heart"],
    iconRegular: ["far", "heart"],
  },
  {
    path: paths.profilePage,
    iconSolid: ["fas", "user"],
    iconRegular: ["far", "user"],
  },
];

function Navigation() {
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  /** Dùng để mở ThemeModal */
  const handleOpenThemeModal = () => {
    setThemeModalOpen(true);
  };

  const handleCloseThemeModal = () => {
    setThemeModalOpen(false);
  };

  return (
    <nav className="fixed top-0 bottom-0 left-0 flex min-w-17.5 flex-col justify-between px-2">
      {/* Logo */}
      <section className="size-15">
        <NavLink
          to="/"
          className="mt-4 mb-6 flex justify-center hover:scale-[1.05]"
        >
          <FontAwesomeIcon icon={["fab", "threads"]} size="3x" />
        </NavLink>
      </section>

      {/* Nav icon */}
      <section>
        <ul className="flex flex-col items-center gap-5 max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:z-10 max-md:h-12.5 max-md:flex-row max-md:justify-between max-md:gap-3 max-md:bg-(--bg-base) max-md:p-1.5">
          {items.map((item, index) => (
            <li
              className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around"
              key={index}
            >
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...(item.path ? styles.link : styles.addPostBtn),
                  color: isActive
                    ? "var(--color-icon-active)"
                    : "var(--color-icon)",
                })}
                className="rounded-[12px] px-3.75 py-2.5 hover:bg-(--bg-icon-hover) max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:rounded-xl"
                end={item.path === "/"}
              >
                {({ isActive }) => (
                  <FontAwesomeIcon
                    icon={isActive ? item.iconSolid : item.iconRegular}
                  />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Menu */}
      <section className="relative text-center">
        <NavMenu onClick={handleOpenThemeModal}>
          <FontAwesomeIcon
            icon={["fas", "bars"]}
            style={styles.link}
            className="mb-5 text-(--color-icon) transition ease-in hover:text-(--color-icon-hover)"
          />
        </NavMenu>
        {themeModalOpen && <ThemeModal onClick={handleCloseThemeModal} />}
      </section>
    </nav>
  );
}

export default Navigation;
