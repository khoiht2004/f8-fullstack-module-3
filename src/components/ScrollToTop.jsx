import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Component xử lý scroll behavior khi chuyển trang
 * - Scroll to top khi navigate đến trang mới (PUSH)
 * - Restore scroll position khi back/forward (POP)
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef(pathname);

  // Lưu scroll position trước khi rời trang
  useEffect(() => {
    const mainContainer = document.querySelector("main.overflow-auto");

    return () => {
      if (mainContainer) {
        sessionStorage.setItem(
          `scrollPos_${prevPathnameRef.current}`,
          mainContainer.scrollTop.toString(),
        );
      }
    };
  }, [pathname]);

  // Restore hoặc scroll to top
  useLayoutEffect(() => {
    const mainContainer = document.querySelector("main.overflow-auto");

    if (navigationType === "PUSH") {
      // Navigate mới -> scroll to top
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    } else if (navigationType === "POP") {
      // Back/forward -> restore scroll position sau khi content render
      const savedPosition = sessionStorage.getItem(`scrollPos_${pathname}`);
      if (mainContainer && savedPosition) {
        const targetScroll = parseInt(savedPosition, 10);

        // Dùng requestAnimationFrame để đợi browser render xong
        const restoreScroll = () => {
          if (mainContainer.scrollHeight >= targetScroll) {
            mainContainer.scrollTop = targetScroll;
          } else {
            // Content chưa đủ cao, thử lại frame tiếp theo
            requestAnimationFrame(restoreScroll);
          }
        };

        requestAnimationFrame(restoreScroll);
      }
    }

    prevPathnameRef.current = pathname;
  }, [pathname, navigationType]);

  return null;
}

export default ScrollToTop;
