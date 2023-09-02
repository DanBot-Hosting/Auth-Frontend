import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { css } from "@styles/css";

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
  const themePreferences: SelectOption[] = [
    { label: "DanBot Hosting", value: "dbh" },
  ];

  const blurModes: SelectOption[] = [
    { label: "Full", value: "full" },
    { label: "Limited", value: "limited" },
    { label: "Disabled", value: "disabled" },
  ];

  return (
    <div className={fields}>
      <div className={field}>
        <label className={label}>Theme</label>
        <div className={select}>
          <Select
            options={themePreferences}
            initial={0}
            placeholder="Pick a theme..."
          />
        </div>
        <span className={description}>Your theme preferences</span>
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <div className={select}>
          <Select
            options={blurModes}
            initial={0}
            placeholder="Pick blur mode..."
          />
        </div>
        <span className={description}>
          Blur may affect performance of low end devices
        </span>
      </div>
      <div className={field}>
        <label className={label}>Background</label>
        <div className={switches}>
          <Switch>Show the background</Switch>
          <Switch>Animation shaders</Switch>
        </div>
      </div>
      <div className={field}>
        <Button secondary pill>Reset Settings</Button>
      </div>
    </div>
  );
}
