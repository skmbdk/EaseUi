import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Input } from "@/components";
import { PasswordInput } from "@/components/Input/PasswordInput";
import {
  AnimatedInput,
  FloatingLabelInput,
  InputWithIcon,
  NumberInput,
} from "@/components/Input";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const InputPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const variantsCode = `<div className="flex flex-col gap-4">
  <Input label="Full Name" placeholder="Enter your name" size="sm" />
  <Input label="Email" type="email" placeholder="Enter your email" size="md" />
  <Input label="Work Email" type="email" placeholder="Enter your work email" size="lg" />
</div>`;

  const sizesCode = `<div className="flex flex-col gap-4">
  <AnimatedInput label="Animated" placeholder="Focus me" />
  <FloatingLabelInput label="Floating" placeholder="" />
  <InputWithIcon label="Search" icon={<Search />} />
  <PasswordInput label="Password" />
  <NumberInput label="Age" onChange={(v) => console.log(v)} />
</div>`;

  const propsData = [
    {
      prop: "placeholder",
      type: "string",
      default: "undefined",
      description: "Placeholder text inside the input",
    },
    {
      prop: "type",
      type: "string",
      default: `"text"`,
      description: "Input type (text, password, email, etc.)",
    },
    {
      prop: "label",
      type: "string",
      default: "undefined",
      description: "Label text rendered above the input",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Controls the padding and text size of the input",
    },
    {
      prop: "error",
      type: "string",
      default: "undefined",
      description: "Error message string displayed in red below the input",
    },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-4 space-y-12 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="space-y-2">
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Input
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Input component for user forms with standard styling and easy customization.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Examples
        </h2>

        <div className="space-y-2">
          <h3 className={`text-lg font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Standard Inputs
          </h3>
          <ComponentDemo code={variantsCode}>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                size="sm"
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                size="md"
              />
              <Input
                label="Work Email"
                type="email"
                placeholder="Enter your work email"
                size="lg"
              />
            </div>
          </ComponentDemo>
        </div>

        <div className="space-y-2">
          <h3 className={`text-lg font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Interactive Input Types
          </h3>
          <ComponentDemo code={sizesCode}>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <AnimatedInput label="Animated" placeholder="Focus me" />
              <FloatingLabelInput label="Floating" placeholder="" />
              <InputWithIcon label="Search" icon={<Search />} />
              <PasswordInput label="Password" />
              <NumberInput label="Age" onChange={(v) => console.log(v)} />
            </div>
          </ComponentDemo>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          API Reference
        </h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default InputPage;
