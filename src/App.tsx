import AppRouter from "./router/AppRouter";
import { ToastProvider } from "./components/Toast/Toast";

type Props = {};

function App({}: Props) {
  return (
    <ToastProvider position="top-right">
      <div className="min-h-screen w-full">
        <AppRouter />
      </div>
    </ToastProvider>
  );
}

export default App;
