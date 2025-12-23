// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

// React import
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import Navigation from "@/components/Navigation";
import LoginPanel from "@/components/LoginPanel";

function DefaultLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <>
      <div className="w-full bg-black px-5">
        <Navigation />
        <main className="mx-auto flex h-dvh justify-center gap-2.5 text-white">
          <div className="flex w-159.5 flex-col items-center">
            <Outlet />
          </div>
          {/* Chỉ hiển thị LoginPanel khi CHƯA đăng nhập */}
          {!isAuthenticated && <LoginPanel />}
        </main>

        {/* Add posts button */}
        <Button className="fixed right-[3%] bottom-[3%] h-17 w-20.5 cursor-pointer rounded-2xl outline outline-[#77777790] outline-solid hover:scale-110 max-md:hidden">
          <FontAwesomeIcon icon="fas fa-plus" className="fa-xl" />
        </Button>
      </div>
    </>
  );
}

export default DefaultLayout;
