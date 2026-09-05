import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import { useSelector } from "react-redux";

const ModalPage = () => {
  const [lightModal, setLightModal] = useState(false);
  const [darkModal, setDarkModal] = useState(false);
  const [outlineModal, setOutlineModal] = useState(false);
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";

  const usageCode = `import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";

const [lightModal, setLightModal] = useState(false);
const [darkModal, setDarkModal] = useState(false);
const [outlineModal, setOutlineModal] = useState(false);

<Button className="mr-4" variant="primary" onClick={() => setLightModal(true)}>Light Modal</Button>
<Modal variant="light" size="sm" isOpen={lightModal} onClose={() => setLightModal(false)}>
  <h2 className="text-lg font-semibold">Modal Title</h2>
  <p>This is modal content.</p>
</Modal>

<Button className="mr-4" variant="dark" onClick={() => setDarkModal(true)}>Dark Modal</Button>
<Modal variant="dark" size="sm" isOpen={darkModal} onClose={() => setDarkModal(false)}>
  <h2 className="text-lg font-semibold">Modal Title</h2>
  <p>This is modal content.</p>
</Modal>

<Button variant="outline" onClick={() => setOutlineModal(true)}>Outline Modal</Button>
<Modal variant="outline" size="sm" isOpen={outlineModal} onClose={() => setOutlineModal(false)}>
  <h2 className="text-lg font-semibold">Modal Title</h2>
  <p>This is modal content.</p>
</Modal>`;

  const propsData = [
    {
      prop: "isOpen",
      type: "boolean",
      default: "false",
      description: "Controls modal visibility",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the Modal",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "-",
      description: "Callback when modal closes",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "Content inside the modal",
    },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-4 space-y-12 transition-colors duration-200 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
      <div className="space-y-4">
        <h1 className={`text-4xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Modal
        </h1>
        <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          The Modal component is used to display content in an overlay.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className={`text-2xl font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          Usage
        </h2>
        <ComponentDemo code={usageCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Button
              variant="primary"
              onClick={() => setLightModal(true)}
            >
              Light Modal
            </Button>
            <Modal
              variant="light"
              size="sm"
              isOpen={lightModal}
              onClose={() => setLightModal(false)}
            >
              <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
              <p className="text-sm text-gray-600">This is light modal content.</p>
            </Modal>

            <Button
              variant="dark"
              onClick={() => setDarkModal(true)}
            >
              Dark Modal
            </Button>
            <Modal
              variant="dark"
              size="md"
              isOpen={darkModal}
              onClose={() => setDarkModal(false)}
            >
              <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
              <p className="text-sm text-gray-300">This is dark modal content.</p>
            </Modal>

            <Button variant="outline" onClick={() => setOutlineModal(true)}>
              Outline Modal
            </Button>
            <Modal
              variant="outline"
              size="sm"
              isOpen={outlineModal}
              onClose={() => setOutlineModal(false)}
            >
              <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
              <p className="text-sm">This is outline modal content.</p>
            </Modal>
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

export default ModalPage;
