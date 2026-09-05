import ComponentDemo from "@/pages/ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { useToast } from "@/components/Toast/Toast";
import { useSelector } from "react-redux";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

const ToastPage = () => {
  const { mode } = useSelector(
    (state: { theme: { mode: "light" | "dark" } }) => state.theme
  );
  const isDark = mode === "dark";
  const { toast } = useToast();

  const toastCode = `import { useToast } from "dev-ease-ui";

export default function Example() {
  const { toast } = useToast();

  return (
    <div className="flex gap-2">
      <button onClick={() => toast.success("Changes Saved!", "Your profile has been updated.")}>
        Success Toast
      </button>
      <button onClick={() => toast.error("Connection Failed", "Unable to reach server.")}>
        Error Toast
      </button>
    </div>
  );
}`;

  const propsData = [
    {
      prop: "toast.success(title, description?)",
      type: "function",
      default: "-",
      description: "Triggers a green success notification toast",
    },
    {
      prop: "toast.error(title, description?)",
      type: "function",
      default: "-",
      description: "Triggers a red error notification toast",
    },
    {
      prop: "toast.warning(title, description?)",
      type: "function",
      default: "-",
      description: "Triggers an amber warning notification toast",
    },
    {
      prop: "toast.info(title, description?)",
      type: "function",
      default: "-",
      description: "Triggers an indigo info notification toast",
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
          Toast Notification System
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Floating toast notification system with auto-dismiss timers, GSAP entry/exit transitions, and global context hook.
        </p>
      </div>

      <section className="space-y-4 flex flex-col gap-10">
        <h2
          className={`text-2xl font-semibold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Interactive Toast Triggers
        </h2>

        {/* Live Triggers */}
        <div className="space-y-2">
          <h3
            className={`text-lg font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Click to Trigger Live Toast Notifications
          </h3>
          <ComponentDemo code={toastCode}>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  toast.success(
                    "Changes Saved Successfully!",
                    "Your user settings have been updated in the cloud."
                  )
                }
                className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                Success Toast
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.error(
                    "Payment Authorization Failed",
                    "Invalid card details. Please check your billing info."
                  )
                }
                className="px-4 py-2 bg-rose-600 text-white rounded-md font-medium text-sm hover:bg-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <AlertCircle size={16} />
                Error Toast
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.warning(
                    "Storage Quota Reached",
                    "You have used 92% of your monthly allotted bandwidth."
                  )
                }
                className="px-4 py-2 bg-amber-600 text-white rounded-md font-medium text-sm hover:bg-amber-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle size={16} />
                Warning Toast
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "New Update Available",
                    "EaseUI v1.0.6 is ready to install."
                  )
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Info size={16} />
                Info Toast
              </button>
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

export default ToastPage;
