import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { useSelector } from "react-redux";

const SkeletonPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const basicCode = `import { Skeleton } from "dev-ease-ui";

export default function Example() {
  return (
    <div className="space-y-3">
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="rectangular" height={120} />
    </div>
  );
}`;

  const cardCode = `import { Skeleton } from "dev-ease-ui";

export default function ExampleCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "variant",
      type: '"text" | "circular" | "rectangular" | "card"',
      default: '"text"',
      description: "Shape preset for skeleton loader element",
    },
    {
      prop: "animation",
      type: '"pulse" | "wave" | "none"',
      default: '"wave"',
      description: "Shimmer loading animation style effect",
    },
    {
      prop: "lines",
      type: "number",
      default: "1",
      description: "Number of text skeleton rows when variant is set to text",
    },
    {
      prop: "width",
      type: "string | number",
      default: "100%",
      description: "Width dimension styling override",
    },
    {
      prop: "height",
      type: "string | number",
      default: "1rem",
      description: "Height dimension styling override",
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
          Skeleton Loader
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Shimmer wave loading placeholders for cards, avatars, and text blocks while asynchronous data is fetching.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Examples
        </h2>

        {/* Text, Circle & Rect Skeletons */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Basic Skeleton Shapes & Shimmer Animations
          </h3>
          <ComponentDemo code={basicCode}>
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
              <Skeleton variant="text" lines={3} />
              <Skeleton variant="rectangular" height={100} />
            </div>
          </ComponentDemo>
        </div>

        {/* Card Skeleton Preset */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Card Skeleton Preset
          </h3>
          <ComponentDemo code={cardCode}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <Skeleton variant="card" />
              <Skeleton variant="card" />
            </div>
          </ComponentDemo>
        </div>
      </section>

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

export default SkeletonPage;
