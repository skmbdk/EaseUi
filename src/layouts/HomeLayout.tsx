import { Outlet } from "react-router";
import Navbar from "../components/Personal/Navbar";
import { useSelector } from "react-redux";

type Props = {};

const HomeLayout = ({}: Props) => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? "bg-zinc-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
