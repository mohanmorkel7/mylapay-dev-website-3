import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force manual scroll restoration (browser won't restore old scroll)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If we are on the homepage, always scroll to top
    if (pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      // for other pages you can keep "instant" or "smooth"
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);
``
  return null;
};

export default ScrollToTop;
