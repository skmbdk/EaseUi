import { useState } from "react";
import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Switch } from "@/components/Switch/Switch";
import { useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";

const SwitchPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const [notifications, setNotifications] = useState(true);
  const [darkModeToggle, setDarkModeToggle] = useState(false);

  const basicCode = `import { Switch } from "dev-ease-ui";

export default function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      label="Enable Push Notifications"
      description="Receive email and browser notifications for activity."
      checked={enabled}
      onChange={(v) => setEnabled(v)}
    />
  );
}`;

  const iconCode = `import { Switch } from "dev-ease-ui";
import { Sun, Moon } from "lucide-react";

export default function IconSwitch() {
  return (
    <Switch
      label="Dark Mode Toggle"
      checkedIcon={<Moon size={12} />}
      uncheckedIcon={<Sun size={12} />}
    />
  );
}`;

  const propsData = [
    {
      prop: "checked",
      type: "boolean",
      default: "false",
      description: "Controlled active toggle state boolean",
    },
    {
      prop: "onChange",
      type: "(checked: boolean) => void",
      default: "undefined",
      description: "Callback function fired on toggle change",
    },
    {
      prop: "label",
      type: "string",
      default: "undefined",
      description: "Primary title text rendered alongside switch button",
    },
    {
      prop: "description",
      type: "string",
      default: "undefined",
      description: "Secondary helper text string rendered below title",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Switch dimensions scale",
    },
    {
      prop: "checkedIcon",
      type: "ReactNode",
      default: "undefined",
      description: "Icon element rendered inside thumb when active",
    },
  ];

  return (
    <div
      className={`max-w-4xl mx-auto p-4 space-y-12 transition-colors duration-200 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div className="space-y-2">
        <h1
          className={`text-4xl font-bold tracking-tight ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Switch / Toggle
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Animated toggle controls with GSAP sliding thumb transitions, labels, descriptions, and icon slots.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Examples
        </h2>

        {/* Basic Switch */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Standard Switch with Labels & Descriptions
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="flex flex-col gap-6 w-full max-w-md">
              <Switch
                label="Push Notifications"
                description="Receive instant desktop notifications when updates are posted."
                checked={notifications}
                onChange={(v) => setNotifications(v)}
              />
              <Switch
                label="Two-Factor Authentication"
                description="Require security code on every new login session."
                defaultChecked
              />
            </div>
          </ComponentDemo>
        </div>

        {/* Icon & Size Switch */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Icons & Sizes
          </h3>
          <ComponentDemo code={iconCode}>
            <div className="flex flex-col gap-6 w-full max-w-md">
              <Switch
                size="sm"
                label="Small Switch"
                defaultChecked
              />
              <Switch
                size="md"
                label="Theme Mode Switch"
                checked={darkModeToggle}
                onChange={(v) => setDarkModeToggle(v)}
                checkedIcon={<Moon size={12} className="text-indigo-600" />}
                uncheckedIcon={<Sun size={12} className="text-amber-500" />}
              />
              <Switch
                size="lg"
                label="Large Switch"
                defaultChecked
              />
            </div>
          </ComponentDemo>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-2">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          API Reference
        </h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default SwitchPage;
