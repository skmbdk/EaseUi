import { useState } from "react";
import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { User, Settings, LogOut, Shield, Heart, Star, Sparkles, Globe } from "lucide-react";

const DropdownPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const [selectedFramework, setSelectedFramework] = useState("react");

  const frameworkOptions = [
    { label: "React", value: "react", icon: <Sparkles size={16} className="text-indigo-500" />, badge: "Popular" },
    { label: "Vue.js", value: "vue", icon: <Star size={16} className="text-emerald-500" /> },
    { label: "Next.js", value: "next", icon: <Globe size={16} className="text-blue-500" /> },
    { label: "Svelte", value: "svelte", icon: <Heart size={16} className="text-red-500" />, badge: "Fast" },
  ];

  const userMenuOptions = [
    { label: "Profile", value: "profile", icon: <User size={16} /> },
    { label: "Settings", value: "settings", icon: <Settings size={16} /> },
    { label: "Security", value: "security", icon: <Shield size={16} />, badge: "2FA" },
    { label: "Logout", value: "logout", icon: <LogOut size={16} /> },
  ];

  const basicCode = `import { Dropdown } from "dev-ease-ui";

const options = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Next.js", value: "next" },
];

export default function Example() {
  return (
    <Dropdown
      label="Select Framework"
      options={options}
      placeholder="Choose framework..."
      onChange={(val) => console.log(val)}
    />
  );
}`;

  const searchableCode = `import { Dropdown } from "dev-ease-ui";
import { User, Settings, Shield, LogOut } from "lucide-react";

const userMenu = [
  { label: "Profile", value: "profile", icon: <User /> },
  { label: "Settings", value: "settings", icon: <Settings /> },
  { label: "Security", value: "security", icon: <Shield />, badge: "2FA" },
  { label: "Logout", value: "logout", icon: <LogOut /> },
];

export default function Example() {
  return (
    <Dropdown
      label="Searchable Select"
      options={userMenu}
      searchable
      placeholder="Filter options..."
    />
  );
}`;

  const propsData = [
    {
      prop: "options",
      type: "DropdownOption[]",
      default: "[]",
      description: "Array of selectable option objects containing label, value, icon, badge, disabled",
    },
    {
      prop: "value",
      type: "string",
      default: "undefined",
      description: "Currently selected option value",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      default: "undefined",
      description: "Callback function triggered when an option is selected",
    },
    {
      prop: "placeholder",
      type: "string",
      default: `"Select an option"`,
      description: "Placeholder text shown when no item is selected",
    },
    {
      prop: "searchable",
      type: "boolean",
      default: "false",
      description: "Enables an inline live search input filter inside the popup menu",
    },
    {
      prop: "position",
      type: '"bottom-left" | "bottom-right" | "top-left" | "top-right"',
      default: '"bottom-left"',
      description: "Popup placement position relative to trigger button",
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
          Dropdown / Select
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Animated selection menu component supporting live search, custom icons, badge tags, and GSAP motion.
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

        {/* Standard Select */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Standard Select
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="w-full max-w-sm">
              <Dropdown
                label="Select Tech Stack"
                options={frameworkOptions}
                value={selectedFramework}
                onChange={(val) => setSelectedFramework(val)}
              />
            </div>
          </ComponentDemo>
        </div>

        {/* Searchable Dropdown Menu */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Searchable Menu with Badges & Icons
          </h3>
          <ComponentDemo code={searchableCode}>
            <div className="w-full max-w-sm">
              <Dropdown
                label="Account Menu"
                options={userMenuOptions}
                searchable
                placeholder="Search menu..."
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

export default DropdownPage;
