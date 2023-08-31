"use client";
import { useFakeProgress } from "@/hooks/useFakeProgress";
import { flush } from "@/utils/css";
import { css } from "@styles/css";
import { useCallback, useEffect, useRef } from "react";

const progressBar = css({
  height: "0.125rem",
  backgroundColor: "text.70",
  transition: "width 15s ease-out",
  opacity: "1",

  "&[data-finished]": {
    width: "100%!",
    opacity: "0",
    transition: "width .15s ease-in-out, opacity .2s ease-in-out",
  },
});

/**
 * Functioning progress bar utilizing useFakeProgress.
 *
 * @see {@link https://github.com/apal21/nextjs-progressbar/issues/86#issuecomment-1447977706 Issue}
 * @return {void}
 */
export function ProgressBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { start, stop, set, progress } = useFakeProgress(0.5, 50);

  const finish = useCallback(() => {
    if (!progressRef.current) return;
    const element = progressRef.current;

    // The order is important
    element.setAttribute("data-finished", "");
    stop();
    set(0);
  }, [set, stop]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        if (!progressRef.current) return;
        const element = progressRef.current;

        // Flush animations and width from previous click
        if (progress === 0 && element.getAttribute("data-finished") === "") {
          element.style.transition = "none";
          element.removeAttribute("data-finished");
          // apply the "transition: none" rule immediately
          flush(element);
          // restore animation
          element.style.transition = "";
        }

        start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        const url = new URL(href, location.href);
        // Check if URL is remote
        if (url.origin !== location.origin) return;

        anchor.addEventListener("click", handleAnchorClick);
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        finish();
        return target.apply(thisArg, argArray);
      },
    });

    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={progressBar}
      ref={progressRef}
      style={{ width: `${Math.floor(progress)}%` }}
    />
  );
}
