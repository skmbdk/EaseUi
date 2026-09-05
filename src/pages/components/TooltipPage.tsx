import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useSelector } from "react-redux";

const TooltipPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const positionUsageCode = `import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="Tooltip on Top" position="top">
  <Button variant="outline" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on Bottom" position="bottom">
  <Button variant="outline" size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on Left" position="left">
  <Button variant="outline" size="sm">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on Right" position="right">
  <Button variant="outline" size="sm">Right</Button>
</Tooltip>`;

  const variantUsageCode = `import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="Dark Variant (Default)" variant="dark" position="top">
  <Button variant="dark" size="sm">Dark Tooltip</Button>
</Tooltip>

<Tooltip content="Light Variant" variant="light" position="top">
  <Button variant="primary" size="sm">Light Tooltip</Button>
</Tooltip>

<Tooltip content="Appears after 500ms delay" delay={500} position="top">
  <Button variant="secondary" size="sm">Delayed Tooltip</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode | string",
      default: "-",
      description: "Content displayed inside the tooltip popover",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "The target element that triggers the tooltip on hover/focus",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "The placement position of the tooltip relative to the trigger element",
    },
    {
      prop: "variant",
      type: '"dark" | "light"',
      default: '"dark"',
      description: "The visual color variant of the tooltip",
    },
    {
      prop: "delay",
      type: "number",
      default: "0",
      description: "Delay in milliseconds before showing the tooltip on hover",
    },
    {
      prop: "animate",
      type: "boolean",
      default: "true",
      description: "Whether to enable entrance fade-in animation",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Additional custom class names for extended styling",
    },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-4 space-y-12 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="space-y-4">
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Tooltip
        </h1>
        <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          The Tooltip component displays informative text when users hover or focus on an element.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Positioning
        </h2>
        <ComponentDemo code={positionUsageCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Tooltip on Top" position="top">
              <Button variant="outline" size="sm">
                Top
              </Button>
            </Tooltip>

            <Tooltip content="Tooltip on Bottom" position="bottom">
              <Button variant="outline" size="sm">
                Bottom
              </Button>
            </Tooltip>

            <Tooltip content="Tooltip on Left" position="left">
              <Button variant="outline" size="sm">
                Left
              </Button>
            </Tooltip>

            <Tooltip content="Tooltip on Right" position="right">
              <Button variant="outline" size="sm">
                Right
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Variants & Delay
        </h2>
        <ComponentDemo code={variantUsageCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Dark Variant (Default)" variant="dark" position="top">
              <Button variant="dark" size="sm">
                Dark Tooltip
              </Button>
            </Tooltip>

            <Tooltip content="Light Variant" variant="light" position="top">
              <Button variant="primary" size="sm">
                Light Tooltip
              </Button>
            </Tooltip>

            <Tooltip content="Appears after 500ms delay" delay={500} position="top">
              <Button variant="secondary" size="sm">
                Delayed (500ms)
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          API Reference
        </h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
