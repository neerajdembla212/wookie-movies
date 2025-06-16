import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const SCROLL_KEY = "scroll-element";

// this hooks tracks the scroll location and restores it upon navigation to and from the home page
export function useScrollRestoration() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (!saved) {
      return;
    }

    const scrollToElement = document.querySelector(`[data-slug=${saved}]`);
    if (!scrollToElement) {
      console.log("not found!!!")
      return;
    }

    scrollToElement.scrollIntoView({ behavior: "instant", block: "center" });

  }, [pathname]);
}
