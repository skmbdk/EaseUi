import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CodeBlock from "@/components/Personal/CodeBlock";

import { ArrowRight, BookOpen, Layers, Sparkles, CheckCircle2 } from "lucide-react";

const DocumentationPage = () => {
  const navigate = useNavigate();
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  const installCode = `npm install dev-ease-ui lucide-react class-variance-authority gsap`;

  const setupCode = `import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, setTheme } from "dev-ease-ui";
import "dev-ease-ui/style.css";
import App from "./App";

// Initialize theme preference from localStorage or default to light
const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
store.dispatch(setTheme(savedTheme));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);`;

  const usageCode = `import { Button, Card, Tooltip, Modal, Input } from "dev-ease-ui";

export default function ExamplePage() {
  return (
    <Card title="EaseUI Quickstart">
      <Tooltip content="GSAP Motion Enabled!" position="top">
        <Button variant="primary" hoverAnimation="bounce">
          Hover Me
        </Button>
      </Tooltip>
    </Card>
  );
}`;

  return (
    <div
      className={`max-w-5xl mx-auto py-12 px-6 space-y-16 transition-colors duration-200 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header Section */}
      <header
        className={`space-y-4 text-center md:text-left border-b pb-8 transition-colors ${
          isDark ? "border-zinc-800" : "border-gray-200"
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold transition-colors ${
            isDark
              ? "bg-indigo-950/60 border-indigo-800 text-indigo-300"
              : "bg-indigo-50 border-indigo-200 text-indigo-700"
          }`}
        >
          <BookOpen size={14} />
          <span>Documentation & Architecture Guide</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          EaseUI Documentation
        </h1>

        <p
          className={`text-lg max-w-3xl ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Learn how to install, configure, and build production-ready user interfaces with EaseUI component library.
        </p>
      </header>

      {/* Quick Start Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
            size={22}
          />
          1. Installation
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Install the package via npm along with peer dependencies:
        </p>
        <CodeBlock code={installCode} language="bash" />
      </section>

      {/* Setup Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Layers
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
            size={22}
          />
          2. Theme & Provider Setup
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Import the global stylesheet and wrap your application in the Redux store provider for theme persistence:
        </p>
        <CodeBlock code={setupCode} language="tsx" />
      </section>

      {/* Component Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CheckCircle2
            className={isDark ? "text-indigo-400" : "text-indigo-600"}
            size={22}
          />
          3. Component Integration
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Import any component directly into your React views:
        </p>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      {/* Components Catalog Directory */}
      <section
        className={`space-y-6 pt-4 border-t transition-colors ${
          isDark ? "border-zinc-800" : "border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-bold">Component Directory</h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Explore live previews, animation variations, and API reference specifications:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Button", desc: "Interactive button controls with GSAP hover states", path: "/components/button" },
            { name: "Card", desc: "Flexible container cards with image ratios and 3D hover effects", path: "/components/card" },
            { name: "Modal", desc: "Accessible overlay dialogs with backdrop blur animations", path: "/components/modal" },
            { name: "Input", desc: "Form input controls including floating labels and password toggles", path: "/components/input" },
            { name: "Navbar", desc: "Responsive top navigation bars with brand logo & action slots", path: "/components/navbar" },
            { name: "Tooltip", desc: "Hover & focus popover tooltips with positional arrow indicators", path: "/components/tooltip" },
            { name: "Dropdown", desc: "Animated selection menus with search filtering, custom icons & badges", path: "/components/dropdown" },
            { name: "Tabs", desc: "Animated tabbed navigation with pills, underline, and segmented styles", path: "/components/tabs" },
            { name: "Accordion", desc: "Expandable content panels with smooth GSAP height transitions", path: "/components/accordion" },
            { name: "Badge", desc: "Status indicator pills and dismissible tag elements with soft glow styles", path: "/components/badge" },
            { name: "Avatar", desc: "User profile images with fallback initials, online status & stacked groups", path: "/components/avatar" },
            { name: "Toast", desc: "Floating toast notification system with auto-dismiss timers & hook", path: "/components/toast" },
            { name: "Skeleton", desc: "Shimmer wave loading placeholders for cards, text blocks & avatars", path: "/components/skeleton" },
            { name: "Switch", desc: "Animated toggle controls with GSAP sliding thumb motion & icons", path: "/components/switch" },
            { name: "Drawer", desc: "Slide-over side panels with GSAP entrance, backdrop blur & positions", path: "/components/drawer" },
          ].map((comp) => (
            <div
              key={comp.name}
              onClick={() => navigate(comp.path)}
              className={`p-5 rounded-lg border cursor-pointer transition-all space-y-2 group ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 hover:border-indigo-500 text-gray-100"
                  : "bg-white border-gray-200 hover:border-indigo-500 hover:shadow-md text-gray-900"
              }`}
            >
              <h3 className="font-bold text-lg flex items-center justify-between">
                {comp.name}
                <ArrowRight
                  size={16}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {comp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage;
