import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { useSelector } from "react-redux";

const ButtonPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const basicUsageCode = `
import { Button } from "@/components/Button/Button"

<Button variant="primary" animation="scaleIn" hoverAnimation="jiggle" size="sm">Jiggle</Button>
<Button variant="secondary" animation="slideUp" hoverAnimation="bounce" size="lg">Bounce</Button>
<Button variant="outline" animation="fadeIn" hoverAnimation="scale" size="xl">Scale</Button>
<Button variant="dark" animation="bounceIn" hoverAnimation="none" size="sm">Dark</Button>`;

  const propsData = [
    {
      prop: "variant",
      type: '"primary" | "secondary" | "outline" | "destructive" | "ghost" | "dark" | "ok" | "link"',
      default: '"primary"',
      description: "The visual style variant of the button",
    },
    {
      prop: "size",
      type: '"sm" | "lg" | "xl" | "icon" | "auto" | "full"',
      default: '"lg"',
      description: "The size of the button",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"none"',
      description: "Animation when mounting",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "hovering on element animation",
    },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-12 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <header className="space-y-2">
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Button
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Displays a button or a component that looks like a button.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Usage
        </h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Button
              animation="scaleIn"
              variant="primary"
              hoverAnimation="jiggle"
              size="sm"
            >
              Jiggle
            </Button>
            <Button
              animation="slideUp"
              variant="secondary"
              hoverAnimation="bounce"
              size="lg"
            >
              Bounce
            </Button>
            <Button
              animation="fadeIn"
              variant="outline"
              hoverAnimation="scale"
              size="xl"
            >
              Scale
            </Button>
            <Button
              animation="bounceIn"
              hoverAnimation="none"
              variant="dark"
              size="sm"
            >
              Dark
            </Button>
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

export default ButtonPage;
