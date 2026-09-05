import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Accordion } from "@/components/Accordion/Accordion";
import { useSelector } from "react-redux";
import { HelpCircle, ShieldCheck, Zap } from "lucide-react";

const AccordionPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const faqItems = [
    {
      id: "faq-1",
      title: "What is EaseUI component library?",
      icon: <HelpCircle size={18} />,
      content:
        "EaseUI is a lightweight, modern React component library built with Tailwind CSS, TypeScript, and GSAP animations designed for high-performance web applications.",
    },
    {
      id: "faq-2",
      title: "How does theme persistence work?",
      icon: <Zap size={18} />,
      content:
        "Theme state is managed through Redux Toolkit and persisted to localStorage. DOM attributes data-theme and root .dark class update synchronously across all components.",
    },
    {
      id: "faq-3",
      title: "Is EaseUI accessible and responsive?",
      icon: <ShieldCheck size={18} />,
      content:
        "Yes, all components follow standard WAI-ARIA guidelines, support keyboard navigation, and automatically adapt to mobile, tablet, and desktop viewports.",
    },
  ];

  const basicCode = `import { Accordion } from "dev-ease-ui";
import { HelpCircle, Zap, ShieldCheck } from "lucide-react";

const faqItems = [
  { id: "1", title: "What is EaseUI?", icon: <HelpCircle />, content: "EaseUI is a React library." },
  { id: "2", title: "Theme Support", icon: <Zap />, content: "Full Dark & Light mode support." },
];

export default function Example() {
  return <Accordion items={faqItems} defaultOpenIds={["1"]} />;
}`;

  const propsData = [
    {
      prop: "items",
      type: "AccordionItem[]",
      default: "[]",
      description: "Array of accordion panel objects containing id, title, content, icon, disabled",
    },
    {
      prop: "allowMultiple",
      type: "boolean",
      default: "false",
      description: "Allows multiple accordion panels to remain expanded simultaneously",
    },
    {
      prop: "defaultOpenIds",
      type: "string[]",
      default: "[]",
      description: "Array of item IDs to expand by default on initial render",
    },
    {
      prop: "variant",
      type: '"bordered" | "separated" | "ghost"',
      default: '"bordered"',
      description: "Visual container styling variant for accordion items",
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
          Accordion
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Expandable content panels with smooth GSAP height transitions, chevron rotations, and dark/light theme binding.
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

        {/* Standard Bordered Accordion */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Bordered Accordion
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="w-full max-w-xl">
              <Accordion items={faqItems} defaultOpenIds={["faq-1"]} />
            </div>
          </ComponentDemo>
        </div>

        {/* Separated Card Accordion */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Separated Card Accordion (Multi-Expand)
          </h3>
          <ComponentDemo code={`<Accordion items={faqItems} variant="separated" allowMultiple />`}>
            <div className="w-full max-w-xl">
              <Accordion items={faqItems} variant="separated" allowMultiple />
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

export default AccordionPage;
