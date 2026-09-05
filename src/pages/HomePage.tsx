import { useNavigate } from "react-router";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import CodeBlock from "@/components/Personal/CodeBlock";
import { ArrowRight, Sparkles, Zap, Palette, Code2 } from "lucide-react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  const quickStartCode = `import { Button, Card, Tooltip, Modal } from "dev-ease-ui";

function App() {
  return (
    <Card title="EaseUI Component">
      <Tooltip content="Hover animation powered by GSAP!" position="top">
        <Button variant="primary" hoverAnimation="jiggle">
          Interactive Button
        </Button>
      </Tooltip>
    </Card>
  );
}`;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
          <Sparkles size={16} />
          <span>Modern React & Tailwind UI Library</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Build Beautiful Interfaces <br />
          <span className="text-indigo-600 dark:text-indigo-400">With Zero Friction</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
          EaseUI provides lightweight, accessible, and highly customizable React components powered by Tailwind CSS and GSAP animations.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <Button
            variant="primary"
            size="lg"
            hoverAnimation="bounce"
            onClick={() => navigate("/components/button")}
            className="flex items-center gap-2"
          >
            Explore Components
            <ArrowRight size={18} />
          </Button>

          <Tooltip content="View GitHub Repository" position="top">
            <Button
              variant="outline"
              size="lg"
              hoverAnimation="scale"
              onClick={() =>
                window.open("https://github.com/Devendradhote001/Easeui-project", "_blank")
              }
            >
              GitHub Repository
            </Button>
          </Tooltip>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          variant={isDark ? "dark" : "light"}
          size="lg"
          animate
          className="border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-4 flex items-center justify-center">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">GSAP Powered</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Rich entrance and hover animations like jiggle, bounce, float3D, and wobble follow built directly into components.
          </p>
        </Card>

        <Card
          variant={isDark ? "dark" : "light"}
          size="lg"
          animate
          className="border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mb-4 flex items-center justify-center">
            <Palette size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Tailwind & CVA</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Class variance authority for seamless variant management, dark mode readiness, and effortless custom styling.
          </p>
        </Card>

        <Card
          variant={isDark ? "dark" : "light"}
          size="lg"
          animate
          className="border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-4 flex items-center justify-center">
            <Code2 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">TypeScript First</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Fully typed component props and strict TypeScript interfaces for autocompletion and developer productivity.
          </p>
        </Card>
      </section>

      {/* Quick Start Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Quick Start</h2>
          <p className="text-gray-600 dark:text-gray-400">Import EaseUI components into your React application in seconds.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CodeBlock code={quickStartCode} language="tsx" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
