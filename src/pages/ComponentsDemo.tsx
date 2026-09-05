import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";
import { useSelector } from "react-redux";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-sm transition-colors ${
        isDark
          ? "border-zinc-800 bg-zinc-900"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 border-b transition-colors ${
          isDark
            ? "border-zinc-800 bg-zinc-900 text-gray-200"
            : "border-gray-200 bg-gray-100 text-gray-800"
        }`}
      >
        <span className="text-sm font-medium">Preview</span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className={`flex items-center gap-1.5 px-3 py-1 text-sm rounded transition-colors ${
            isDark
              ? "bg-zinc-800 hover:bg-zinc-700 text-gray-200"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div
        className={`py-14 px-6 flex items-center justify-center transition-colors ${
          isDark ? "bg-zinc-950" : "bg-white"
        }`}
      >
        {children}
      </div>

      {isCodeVisible && (
        <div
          className={`border-t ${
            isDark ? "border-zinc-800" : "border-gray-200"
          }`}
        >
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
