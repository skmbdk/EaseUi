import { useState } from "react";
import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );

  const isDark = mode === "dark";

  const availableComponents = [
    "button",
    "card",
    "modal",
    "input",
    "navbar",
    "tooltip",
    "dropdown",
    "tabs",
    "accordion",
    "badge",
    "avatar",
    "toast",
    "skeleton",
    "switch",
    "drawer",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const matched = availableComponents.find((comp) => comp.includes(query));
    if (matched) {
      navigate(`/components/${matched}`);
      setSearchQuery("");
    } else {
      navigate("/components/button");
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`h-16 w-full flex items-center justify-between px-4 sm:px-8 border-b transition-colors duration-200 sticky top-0 z-30 ${
        isDark
          ? "bg-zinc-950 border-zinc-800 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-6 sm:gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer tracking-tight"
        >
          EaseUi
        </h1>

        <form
          onSubmit={handleSearchSubmit}
          className={`hidden sm:flex items-center rounded-md px-3 py-1.5 border transition-colors ${
            isDark
              ? "bg-zinc-900 border-zinc-700 text-zinc-100"
              : "bg-white border-zinc-300 text-zinc-900 shadow-sm"
          }`}
        >
          <Search
            size={18}
            className={isDark ? "text-zinc-400" : "text-zinc-500"}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components... (e.g. tooltip, button)"
            className={`ml-2 bg-transparent outline-none text-sm w-56 lg:w-64 ${
              isDark
                ? "text-zinc-100 placeholder:text-zinc-500"
                : "text-zinc-900 placeholder:text-zinc-400"
            }`}
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
          <li
            onClick={() => navigate("/components/button")}
            className={`cursor-pointer transition-colors ${
              location.pathname.startsWith("/components")
                ? isDark
                  ? "text-indigo-400 font-semibold"
                  : "text-indigo-600 font-semibold"
                : isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Components
          </li>
          <li
            onClick={() => navigate("/documentation")}
            className={`cursor-pointer transition-colors ${
              location.pathname === "/documentation"
                ? isDark
                  ? "text-indigo-400 font-semibold"
                  : "text-indigo-600 font-semibold"
                : isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Documentation
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "hover:bg-zinc-800 text-yellow-400"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          aria-label="Toggle Theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-700" />
          )}
        </button>

        {/* Mobile Components Link */}
        <button
          onClick={() => navigate("/components/button")}
          className="md:hidden px-3 py-1.5 text-xs bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors"
        >
          Components
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
