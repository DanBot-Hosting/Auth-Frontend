"use client";
import { css } from "@styles/css";
import { Moon, Sun } from "@/utils/icons";
import { toggleTheme } from "@/utils/toggleTheme";

const themeButton = css({
  position: "relative",
  display: "inline-flex",
  w: "2.75rem",
  h: "2.75rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  flexShrink: "0",
  cursor: "pointer",

  borderRadius: "1rem",
  border: "1px solid token(colors.text.20)",
  transition: "border .2s ease-in-out",
  bg: "background.100",

  _hover: {
    border: "1px solid token(colors.text.30)",
    transition: "border .2s ease-in-out",
  },

  'html[data-color-mode="dark"] &': {
    "&:hover": {
      "& #moon": {
        opacity: "0",
        pointerEvents: "none",
        top: "200%",
      },
      "& #sun": {
        opacity: "1",
        pointerEvents: "unset",
        top: "50%",
      },
    },
  },
  'html[data-color-mode="light"] &': {
    "&:hover": {
      "& #moon": {
        opacity: "1",
        pointerEvents: "unset",
        top: "50%",
      },
      "& #sun": {
        opacity: "0",
        pointerEvents: "none",
        top: "200%",
      },
    },
  },
});

const moon = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  transition: "all .5s ease-in-out",

  'html[data-color-mode="light"] &': {
    opacity: "0",
    pointerEvents: "none",
    top: "200%",
  },
});

const sun = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  transition: "all .5s ease-in-out",

  'html[data-color-mode="dark"] &': {
    opacity: "0",
    pointerEvents: "none",
    top: "200%",
  },
});

const shadow = css({
  position: "absolute",
  bottom: "0",
  left: "50%",
  transform: "translateX(-50%)",
  width: "1.25rem",
  height: "0rem",
  m: "0",
  p: "0",
  flexShrink: "0",
  bg: "transparent",
  color: "transparent",
  boxShadow: "0px 2px 8px 3px token(colors.text.60)",
  transition: "box-shadow .2s ease-in-out",

  "div:hover > &": {
    boxShadow: "0px 2px 14px 5px token(colors.text.90)",
    transition: "box-shadow .2s ease-in-out",
  },
});

export function ToggleTheme() {
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  function fireTransition() {
    const mode = getCookie("theme");

    const toggled = mode === "dark" ? "light" : "dark";
    document.querySelector("html")?.setAttribute("data-color-mode", toggled);

    toggleTheme();
  }

  return (
    <div className={themeButton} onClick={fireTransition}>
      <Moon size={24} weight="fill" className={moon} id="moon" />
      <Sun size={24} weight="fill" className={sun} id="sun" />
      <div className={shadow} />
    </div>
  );
}
