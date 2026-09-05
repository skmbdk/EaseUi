import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Tabs } from "@/components/Tabs/Tabs";
import { useSelector } from "react-redux";
import { User, Lock, Bell } from "lucide-react";

const TabsPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const tabItems = [
    {
      id: "account",
      label: "Account",
      icon: <User size={16} />,
      badge: "Active",
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-base">Account Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your public profile username, email preferences, and personal details.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: <Lock size={16} />,
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-base">Security & Authentication</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update your password, enable two-factor authentication, and monitor active sessions.
          </p>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={16} />,
      badge: 3,
      content: (
        <div className="space-y-2">
          <h3 className="font-semibold text-base">Notification Preferences</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure push notifications, weekly digest emails, and security alert triggers.
          </p>
        </div>
      ),
    },
  ];

  const pillsCode = `import { Tabs } from "dev-ease-ui";
import { User, Lock, Bell } from "lucide-react";

const tabItems = [
  { id: "account", label: "Account", icon: <User />, content: <div>Account Settings</div> },
  { id: "security", label: "Security", icon: <Lock />, content: <div>Security Settings</div> },
  { id: "notifications", label: "Notifications", icon: <Bell />, badge: 3, content: <div>Notification Settings</div> },
];

export default function Example() {
  return <Tabs items={tabItems} variant="pills" />;
}`;

  const underlineCode = `<Tabs items={tabItems} variant="underline" />`;
  const segmentedCode = `<Tabs items={tabItems} variant="segmented" />`;

  const propsData = [
    {
      prop: "items",
      type: "TabItem[]",
      default: "[]",
      description: "Array of tab objects containing id, label, icon, badge, content, disabled",
    },
    {
      prop: "defaultTabId",
      type: "string",
      default: "items[0].id",
      description: "Initial active tab identifier",
    },
    {
      prop: "onChange",
      type: "(id: string) => void",
      default: "undefined",
      description: "Callback function fired on active tab switch",
    },
    {
      prop: "variant",
      type: '"pills" | "underline" | "segmented"',
      default: '"pills"',
      description: "Visual styling variant of tab triggers",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Padding and font size controls for tab buttons",
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
          Tabs
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Animated tabbed interface component with smooth GSAP content transitions and multiple layout styles.
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

        {/* Pill Variant */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Pills Variant
          </h3>
          <ComponentDemo code={pillsCode}>
            <div className="w-full max-w-xl">
              <Tabs items={tabItems} variant="pills" />
            </div>
          </ComponentDemo>
        </div>

        {/* Underline Variant */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Underline Variant
          </h3>
          <ComponentDemo code={underlineCode}>
            <div className="w-full max-w-xl">
              <Tabs items={tabItems} variant="underline" />
            </div>
          </ComponentDemo>
        </div>

        {/* Segmented Control Variant */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Segmented Control Variant
          </h3>
          <ComponentDemo code={segmentedCode}>
            <div className="w-full max-w-xl">
              <Tabs items={tabItems} variant="segmented" />
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

export default TabsPage;
