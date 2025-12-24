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
import { useDispatch, useSelector } from "react-redux";
import Navigation from "@/components/Navigation";
import LoginPanel from "@/components/LoginPanel";
import { useLazyGetUserInfoQuery } from "@/services/Auth/userApi";
import { useEffect } from "react";
import { getAccessToken } from "@/utils/auth";
import { setCredentials } from "@/store/slices/authSlice";

function DefaultLayout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [getUserInfo] = useLazyGetUserInfoQuery();

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (token && !isAuthenticated) {
        try {
          // Gọi API để lấy user info
          const response = await getUserInfo().unwrap();

          if (response.success) {
            dispatch(
              setCredentials({
                user: response.data,
                accessToken: token,
              }),
            );
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          // Token invalid, sẽ tự động redirect về login qua baseQuery
        }
      }
    };

    checkAuth();
  }, [dispatch, isAuthenticated, getUserInfo]);
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
