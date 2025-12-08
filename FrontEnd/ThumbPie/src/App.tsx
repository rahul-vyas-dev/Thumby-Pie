import { ThemeProvider } from "@/components/ThemeProvider";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
