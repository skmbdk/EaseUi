import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Avatar, AvatarGroup } from "@/components/Avatar/Avatar";
import { useSelector } from "react-redux";

const AvatarPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const basicCode = `import { Avatar, AvatarGroup } from "dev-ease-ui";

export default function Example() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar name="Devendra Dhote" status="online" size="lg" />
      <Avatar name="Sarah Connor" status="busy" size="lg" />
      <Avatar name="Alex Rivers" status="away" size="lg" />
    </div>
  );
}`;

  const groupCode = `import { Avatar, AvatarGroup } from "dev-ease-ui";

export default function ExampleGroup() {
  return (
    <AvatarGroup max={3} size="md">
      <Avatar name="Devendra Dhote" />
      <Avatar name="Sarah Connor" />
      <Avatar name="Alex Rivers" />
      <Avatar name="John Doe" />
      <Avatar name="Emma Watson" />
    </AvatarGroup>
  );
}`;

  const propsData = [
    {
      prop: "src",
      type: "string",
      default: "undefined",
      description: "URL image source path for the user avatar image",
    },
    {
      prop: "name",
      type: "string",
      default: "undefined",
      description: "Full user name used to compute two-letter initials when image is missing or fails to load",
    },
    {
      prop: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Avatar dimensions and typography scale",
    },
    {
      prop: "shape",
      type: '"circle" | "square"',
      default: '"circle"',
      description: "Border radius shape styling",
    },
    {
      prop: "status",
      type: '"online" | "offline" | "busy" | "away"',
      default: "undefined",
      description: "Status indicator badge appended to bottom right corner",
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
          Avatar & Avatar Group
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          User profile images with automatic fallback initials, online status badges, and stacked team avatar groups.
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

        {/* Statuses & Initials */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Avatars with Status Indicators & Fallback Initials
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar name="Devendra Dhote" status="online" size="lg" />
              <Avatar name="Sarah Connor" status="busy" size="lg" />
              <Avatar name="Alex Rivers" status="away" size="lg" />
              <Avatar name="John Doe" status="offline" size="lg" />
              <Avatar name="Square Avatar" shape="square" size="lg" status="online" />
            </div>
          </ComponentDemo>
        </div>

        {/* Stacked Avatar Groups */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Stacked Avatar Groups with Overflow Counter
          </h3>
          <ComponentDemo code={groupCode}>
            <div className="flex flex-col gap-4">
              <AvatarGroup max={3} size="lg">
                <Avatar name="Devendra Dhote" />
                <Avatar name="Sarah Connor" />
                <Avatar name="Alex Rivers" />
                <Avatar name="John Doe" />
                <Avatar name="Emma Watson" />
              </AvatarGroup>
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

export default AvatarPage;
