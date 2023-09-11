import { SegmentedControl } from "@/components/SegmentedControl";
import { getDictionary } from "@/utils/dictionary";
import { css } from "@styles/css";
import { use } from "react";

const centered = css({
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  gap: "3.4375rem",
});

const main = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  maxW: "37.5rem",
  w: "100%",
});

export default function SettingsLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const translation = use(
    getDictionary<Dictionary.Settings.Layout>(lang, "settings/layout")
  );
  return (
    <div className={centered}>
      <SegmentedControl
        options={[
          {
            label: "account",
            value: "/settings",
          },
          {
            label: "payments",
            value: "/settings/payments",
          },
          {
            label: "interface",
            value: "/settings/interface",
          },
        ]}
        translation={translation.segmentedControl}
        locale={lang}
      />
      <div className={main}>{children}</div>
    </div>
  );
}
