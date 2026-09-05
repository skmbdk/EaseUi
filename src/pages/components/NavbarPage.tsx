import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/Button/Button";
import { useSelector } from "react-redux";

const NavbarPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const defaultUsageCode = `import { Navbar } from "@/components/navbar/Navbar";

<Navbar variant="light" size="default" />`;

  const variantUsageCode = `import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/Button/Button";

<Navbar
  variant="dark"
  logo="MyBrand"
  links={[
    { label: "Dashboard", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
  ]}
  action={<Button variant="primary" size="sm">Sign In</Button>}
/>`;

  const glassUsageCode = `import { Navbar } from "@/components/navbar/Navbar";

<Navbar variant="primary" size="lg" />`;

  const propsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "primary" | "glass"',
      default: '"light"',
      description: "Visual style variant of the navigation bar",
    },
    {
      prop: "size",
      type: '"default" | "sm" | "lg" | "xl"',
      default: '"default"',
      description: "Controls the height and padding of the navigation bar",
    },
    {
      prop: "logo",
      type: "ReactNode | string",
      default: '"EaseUI"',
      description: "Brand logo text or component displayed on the left",
    },
    {
      prop: "links",
      type: "{ label: string; href: string }[]",
      default: "Default links array",
      description: "Navigation links rendered in the center",
    },
    {
      prop: "action",
      type: "ReactNode",
      default: "<Button>Get Started</Button>",
      description: "Action button or custom element displayed on the right",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "Custom children content to completely override default layout",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders the component as a Radix Slot child element",
    },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-4 space-y-12 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="space-y-4">
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Navbar
        </h1>
        <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          The Navbar component provides top-level navigation, branding, and quick actions for your web application.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Default Navbar
        </h2>
        <ComponentDemo code={defaultUsageCode}>
          <div className="w-full">
            <Navbar variant={isDark ? "dark" : "light"} size="default" />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Dark Variant & Custom Props
        </h2>
        <ComponentDemo code={variantUsageCode}>
          <div className="w-full">
            <Navbar
              variant="dark"
              logo="MyBrand"
              links={[
                { label: "Dashboard", href: "#" },
                { label: "Features", href: "#" },
                { label: "Pricing", href: "#" },
              ]}
              action={
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              }
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Primary Theme Variant
        </h2>
        <ComponentDemo code={glassUsageCode}>
          <div className="w-full">
            <Navbar variant="primary" size="lg" />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          API Reference
        </h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default NavbarPage;
