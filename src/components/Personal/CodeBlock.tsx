import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useSelector } from "react-redux";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-t-md border-b text-xs font-mono transition-colors ${
          isDark
            ? "bg-zinc-900 text-zinc-300 border-zinc-800"
            : "bg-gray-200 text-gray-800 border-gray-300"
        }`}
      >
        <span className="uppercase font-semibold text-indigo-600 dark:text-indigo-400">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors ${
            isDark
              ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              : "bg-gray-300 hover:bg-gray-400 text-gray-900"
          }`}
        >
          {copied ? (
            <Check size={14} className="text-green-600 dark:text-green-400" />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className={`p-4 rounded-b-md overflow-x-auto font-mono text-sm leading-relaxed border border-t-0 transition-colors ${
          isDark
            ? "bg-zinc-950 text-zinc-100 border-zinc-800"
            : "bg-gray-100 text-gray-900 border-gray-300"
        }`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
