"use client";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { useNotification } from "@/hooks/useNotification";
import { useSettings } from "@/hooks/useSettings";
import { generateThemeOptions } from "@/utils/themes";
import { css } from "@styles/css";
import { useCallback, useMemo, useRef } from "react";

const field = css({
  display: "flex",
  flexDir: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  gap: "0.625rem",
  width: "100%",
});

const fields = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.875rem",
  w: "100%",
});

const label = css({
  color: "text.90",
  textAlign: "right",
  fontSize: "1rem",
  fontWeight: "600",
  userSelect: "none",
  lineHeight: "1.75",
});

const select = css({
  display: "flex",
  w: "100%",
  maxW: "37.5rem",
  gap: "0.9375rem",

  "@media screen and (max-width: 500px)": {
    "& > input": {
      padding: "0.625rem 1.25rem",
    },
  },

  "& > *": {
    flex: "1 0 0",
    maxW: "100%",

    "& > *": {
      maxW: "100%",
      w: "100%",
    },
  },
});

const switches = css({
  display: "flex",
  flexDir: "column",
});

const description = css({
  color: "text.60",
  fontSize: "0.9375rem",
  fontWeight: "400",
});

export default function Interface() {
  const { get, set } = useSettings();

  const themePreferences: SelectOption[] = generateThemeOptions();

  const pickedTheme = get("theme");
  const themeIndex = themePreferences.findIndex(
    (theme) => theme.value === pickedTheme
  );

  const blurModes: SelectOption[] = useMemo(() => [
    { label: "Full", value: "full" },
    { label: "Limited", value: "limited" },
    { label: "Disabled", value: "disabled" },
  ], []);

  const pickedBlurMode = get("blur-mode");
  const blurModeIndex = blurModes.findIndex(
    (blurMode) => blurMode.value === pickedBlurMode
  );

  const backgroundEnabled = get("background-enabled") === "true";
  const backgroundAnimated = get("background-animate") === "true";

  const enabledRef = useRef<HTMLInputElement | null>(null);
  const animatedRef = useRef<HTMLInputElement | null>(null);
  const themeRef = useRef<SelectRef | null>(null);
  const blurModeRef = useRef<SelectRef | null>(null);

  const { show } = useNotification();
  const resetSettings = useCallback(() => {
    if (get("background-enabled") !== "true") enabledRef.current?.click();
    if (get("background-animate") !== "true") animatedRef.current?.click();
    if (get("theme") !== "dbh") themeRef.current?.change(themePreferences[0]);
    if (get("blur-mode") !== "full") blurModeRef.current?.change(blurModes[0]);

    show({ children: "Settings were successfully reset!" });
  }, [blurModes, get, show, themePreferences]);

  return (
    <div className={fields}>
      <div className={field}>
        <label className={label}>Theme</label>
        <div className={select}>
          <Select
            options={themePreferences}
            initial={themeIndex}
            ref={themeRef}
            placeholder="Pick a theme..."
            onChange={(option) => set("theme", option.value)}
          />
        </div>
        <span className={description}>Your theme preferences</span>
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <div className={select}>
          <Select
            options={blurModes}
            initial={blurModeIndex}
            ref={blurModeRef}
            placeholder="Pick blur mode..."
            onChange={(option) => set("blur-mode", option.value)}
          />
        </div>
        <span className={description}>
          Blur may affect performance of low end devices
        </span>
      </div>
      <div className={field}>
        <label className={label}>Background</label>
        <div className={switches}>
          <Switch
            checked={backgroundEnabled}
            ref={enabledRef}
            onChange={(state) => {
              if (get("background-animate") === "true" && !state)
                animatedRef.current?.click();
              set("background-enabled", state ? "true" : "false");
            }}
          >
            Show the background
          </Switch>
          <Switch
            checked={backgroundAnimated}
            ref={animatedRef}
            onChange={(state) => {
              if (get("background-enabled") === "false" && state)
                enabledRef.current?.click();
              set("background-animate", state ? "true" : "false");
            }}
          >
            Animation shaders
          </Switch>
        </div>
      </div>
      <div className={field}>
        <Button secondary pill onClick={resetSettings}>
          Reset Settings
        </Button>
      </div>
    </div>
  );
}
