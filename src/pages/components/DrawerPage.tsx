import { useState } from "react";
import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Drawer } from "@/components/Drawer/Drawer";
import { useSelector } from "react-redux";
import { Layout, ShoppingBag, PanelRight } from "lucide-react";

const DrawerPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const drawerCode = `import { useState } from "react";
import { Drawer } from "dev-ease-ui";

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Filter Drawer</button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        title="Filter Results"
        description="Refine catalog results by price and category."
      >
        <div>Drawer Body Content</div>
      </Drawer>
    </>
  );
}`;

  const propsData = [
    {
      prop: "isOpen",
      type: "boolean",
      default: "false",
      description: "Controls drawer slide-over visibility",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "undefined",
      description: "Callback function fired on backdrop click or close X button",
    },
    {
      prop: "position",
      type: '"left" | "right" | "top" | "bottom"',
      default: '"right"',
      description: "Screen edge side from which the panel slides in",
    },
    {
      prop: "title",
      type: "string",
      default: "undefined",
      description: "Header panel title string",
    },
    {
      prop: "description",
      type: "string",
      default: "undefined",
      description: "Secondary header subtext string",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "full"',
      default: '"md"',
      description: "Panel width/height dimensions",
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
          Drawer / Slide-Over Sheet
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Slide-over side panels with GSAP entrance motion, backdrop blur, keyboard dismissal, and body scroll lock.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Interactive Triggers
        </h2>

        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Slide Positions (Right, Left, Bottom)
          </h3>
          <ComponentDemo code={drawerCode}>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setRightOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PanelRight size={16} />
                Right Drawer (Filter)
              </button>

              <button
                type="button"
                onClick={() => setLeftOpen(true)}
                className="px-4 py-2 bg-zinc-800 text-white rounded-md font-medium text-sm hover:bg-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Layout size={16} />
                Left Drawer (Sidebar)
              </button>

              <button
                type="button"
                onClick={() => setBottomOpen(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag size={16} />
                Bottom Sheet (Cart)
              </button>
            </div>
          </ComponentDemo>
        </div>
      </section>

      {/* Right Drawer Modal */}
      <Drawer
        isOpen={rightOpen}
        onClose={() => setRightOpen(false)}
        position="right"
        title="Filter & Refine"
        description="Filter products by price, brand, and ratings."
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize search criteria and parameters in this slide-over inspector.
          </p>
          <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex gap-2">
            <button
              onClick={() => setRightOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Drawer>

      {/* Left Drawer Modal */}
      <Drawer
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        position="left"
        title="Navigation Menu"
        description="Quick access links and settings."
      >
        <ul className="space-y-2 text-sm font-medium">
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded cursor-pointer">
            Analytics
          </li>
          <li className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded cursor-pointer">
            Team Settings
          </li>
        </ul>
      </Drawer>

      {/* Bottom Sheet Modal */}
      <Drawer
        isOpen={bottomOpen}
        onClose={() => setBottomOpen(false)}
        position="bottom"
        title="Shopping Cart Summary"
        description="Review items before proceeding to checkout."
      >
        <div className="text-sm space-y-2">
          <p>3 Items in your cart. Subtotal: $249.00</p>
          <button
            onClick={() => setBottomOpen(false)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium"
          >
            Checkout Now
          </button>
        </div>
      </Drawer>

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

export default DrawerPage;
