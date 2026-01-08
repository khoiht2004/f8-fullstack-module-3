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
import { useAddPostModal } from "@/features/hooks/UseAddPostModal";
import AddPostModal from "../Modal/AddPostModal";

function Navigation() {
  const { isOpen, handleOpen, handleClose } = useAddPostModal();
  const [themeModalOpen, setThemeModalOpen] = useState(false);

  /** CSS Classes - Tái sử dụng */
  const navLinkClass =
    "rounded-[12px] px-3.75 py-2.5 hover:bg-(--bg-icon-hover) max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:rounded-xl text-2xl cursor-pointer";

  const addPostBtnClass =
    "rounded-[12px] px-3.75 py-2.5 max-md:flex max-md:w-full max-md:items-center max-md:justify-center max-md:rounded-xl text-2xl cursor-pointer bg-(--bg-icon) text-(--color-icon)";

  /** Handlers */
  const handleOpenThemeModal = () => {
    setThemeModalOpen(true);
  };

  const handleCloseThemeModal = () => {
    setThemeModalOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 bottom-0 left-0 z-50 flex min-w-17.5 flex-col justify-between px-2">
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
          <ul className="flex flex-col items-center gap-5 max-md:fixed max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:h-12.5 max-md:flex-row max-md:justify-between max-md:gap-3 max-md:bg-(--bg-base) max-md:p-1.5">
            {/* Home */}
            <li className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around">
              <NavLink
                to={paths.homePage}
                className={navLinkClass}
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-icon-active)"
                    : "var(--color-icon)",
                })}
                end
              >
                {({ isActive }) => (
                  <FontAwesomeIcon
                    icon={isActive ? ["fas", "house"] : ["fas", "house"]}
                  />
                )}
              </NavLink>
            </li>

            {/* Search */}
            <li className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around">
              <NavLink
                to={paths.searchPage}
                className={navLinkClass}
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-icon-active)"
                    : "var(--color-icon)",
                })}
              >
                {({ isActive }) => (
                  <FontAwesomeIcon
                    icon={
                      isActive
                        ? ["fas", "magnifying-glass"]
                        : ["fas", "magnifying-glass"]
                    }
                  />
                )}
              </NavLink>
            </li>

            {/* Add Post Button */}
            <li className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around">
              <button
                className={`${addPostBtnClass} hover:text-(--color-icon-hover)`}
                onClick={handleOpen}
              >
                <FontAwesomeIcon icon={["fas", "plus"]} />
              </button>
            </li>

            {/* Activity */}
            <li className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around">
              <NavLink
                to={paths.activityPage}
                className={navLinkClass}
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-icon-active)"
                    : "var(--color-icon)",
                })}
              >
                {({ isActive }) => (
                  <FontAwesomeIcon
                    icon={isActive ? ["fas", "heart"] : ["far", "heart"]}
                  />
                )}
              </NavLink>
            </li>

            {/* Profile */}
            <li className="my-1 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-around">
              <NavLink
                to={paths.profilePage}
                className={navLinkClass}
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--color-icon-active)"
                    : "var(--color-icon)",
                })}
              >
                {({ isActive }) => (
                  <FontAwesomeIcon
                    icon={isActive ? ["fas", "user"] : ["far", "user"]}
                  />
                )}
              </NavLink>
            </li>
          </ul>
        </section>

        {/* Menu */}
        <section className="relative text-center">
          <NavMenu onClick={handleOpenThemeModal}>
            <FontAwesomeIcon
              icon={["fas", "bars"]}
              className="mb-5 cursor-pointer text-2xl text-(--color-icon) transition ease-in hover:text-(--color-icon-hover)"
            />
          </NavMenu>
          {themeModalOpen && <ThemeModal onClick={handleCloseThemeModal} />}
        </section>
      </nav>

      {isOpen && <AddPostModal onClick={handleClose} />}
    </>
  );
}

export default Navigation;
