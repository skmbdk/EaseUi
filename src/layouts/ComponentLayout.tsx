import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Tooltip",
    "Dropdown",
    "Tabs",
    "Accordion",
    "Badge",
    "Avatar",
    "Toast",
    "Skeleton",
    "Switch",
    "Drawer",
  ];

  return (
    <div
      className={`flex min-h-[calc(100vh-4rem)] transition-colors duration-200 ${
        isDark ? "bg-zinc-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <aside
        className={`
          w-64 p-6 flex flex-col
          border-r transition-colors duration-200
          ${
            isDark
              ? "bg-zinc-950 border-zinc-800 text-gray-100"
              : "bg-white border-gray-200 text-gray-900"
          }
          fixed md:static top-16 left-0 h-[calc(100vh-4rem)] z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
      >
        <h2
          className={`text-md font-bold mb-6 ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Components
        </h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => {
            const isActive =
              location.pathname === `/components/${item.toLowerCase()}`;
            return (
              <li
                onClick={() => {
                  navigate(item.toLowerCase());
                  setSidebarOpen(false);
                }}
                key={item}
                className={`cursor-pointer text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${
                  isActive
                    ? isDark
                      ? "text-indigo-400 font-semibold"
                      : "text-indigo-600 font-semibold"
                    : isDark
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </aside>

      <div
        className={`flex-1 overflow-y-auto p-6 md:p-10 transition-colors duration-200 ${
          isDark ? "bg-zinc-950 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <button
          className={`md:hidden mb-4 p-2 rounded-md border flex items-center gap-2 text-sm font-medium ${
            isDark
              ? "border-zinc-800 text-gray-200 bg-zinc-900"
              : "border-gray-200 text-gray-700 bg-gray-50"
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={18} />
          <span>Components Menu</span>
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
