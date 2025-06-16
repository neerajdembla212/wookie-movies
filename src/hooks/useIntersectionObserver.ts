import { useEffect, useState, type RefObject } from "react";

export function useIntersectionObserver<
  T extends RefObject<HTMLAnchorElement | null>
>(ref: T) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });
    observer.observe(ref.current);
    () => {
      observer.disconnect();
    };
  }, [ref]);
  return isVisible;
}
