import { useSelector } from "react-redux";

interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropsTable = ({ data }: PropsTableProps) => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  return (
    <div
      className={`overflow-x-auto rounded-lg border shadow-sm transition-colors duration-200 ${
        isDark ? "border-zinc-800 bg-zinc-900" : "border-gray-200 bg-white"
      }`}
    >
      <table className="w-full text-left border-collapse">
        <thead
          className={`border-b transition-colors duration-200 ${
            isDark
              ? "bg-zinc-800/60 border-zinc-800 text-gray-100"
              : "bg-gray-50 border-gray-200 text-gray-900"
          }`}
        >
          <tr>
            <th className="px-4 py-3 text-sm font-semibold">Prop</th>
            <th className="px-4 py-3 text-sm font-semibold">Type</th>
            <th className="px-4 py-3 text-sm font-semibold">Default</th>
            <th className="px-4 py-3 text-sm font-semibold">Description</th>
          </tr>
        </thead>
        <tbody
          className={`divide-y ${
            isDark ? "divide-zinc-800" : "divide-gray-200"
          }`}
        >
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors ${
                isDark ? "hover:bg-zinc-800/40" : "hover:bg-gray-50"
              }`}
            >
              <td
                className={`px-4 py-3 text-sm font-mono font-medium ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {row.prop}
              </td>
              <td
                className={`px-4 py-3 text-sm font-mono ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {row.type}
              </td>
              <td
                className={`px-4 py-3 text-sm font-mono ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {row.default}
              </td>
              <td
                className={`px-4 py-3 text-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
