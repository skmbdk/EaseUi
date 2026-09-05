import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Badge } from "@/components/Badge/Badge";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const BadgePage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const basicCode = `import { Badge } from "dev-ease-ui";

export default function Example() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Primary</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="danger">High Severity</Badge>
      <Badge variant="glow">Pro Feature</Badge>
    </div>
  );
}`;

  const propsData = [
    {
      prop: "variant",
      type: '"default" | "secondary" | "success" | "warning" | "danger" | "info" | "outline" | "glow"',
      default: '"default"',
      description: "Color scheme variant of the badge element",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Controls the padding and text size",
    },
    {
      prop: "dot",
      type: "boolean",
      default: "false",
      description: "Displays a small colored status indicator dot before text",
    },
    {
      prop: "onRemove",
      type: "() => void",
      default: "undefined",
      description: "Optional click handler adding a close X button icon to tag",
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
          Badge & Tag
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Status indicator pills and dismissible tag elements with soft glow styles and status dots.
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

        {/* Color Variants */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Badge Variants & Status Dots
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default" dot>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success" dot>Completed</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="danger" dot>Failed</Badge>
              <Badge variant="info" dot>System Info</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="glow">
                <Sparkles size={12} className="mr-1 inline" />
                Glow Edition
              </Badge>
            </div>
          </ComponentDemo>
        </div>

        {/* Sizes & Removable Tags */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Badge Sizes & Dismissible Tags
          </h3>
          <ComponentDemo code={`<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg" onRemove={() => alert('Removed')}>Removable Tag</Badge>`}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm" variant="default">Small</Badge>
              <Badge size="md" variant="default">Medium</Badge>
              <Badge size="lg" variant="default">Large</Badge>
              <Badge variant="secondary" onRemove={() => alert("Tag dismissed!")}>
                React.js
              </Badge>
              <Badge variant="success" onRemove={() => alert("Tag dismissed!")}>
                TailwindCSS
              </Badge>
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

export default BadgePage;
