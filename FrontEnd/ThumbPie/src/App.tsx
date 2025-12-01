import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./components/Header";
import "./app.css";
import LampEffect from "./components/ui/lampCompo";
import { Text } from "./components/3D/Text";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <LampEffect />
      {/* <Text /> */}

    </ThemeProvider>
  );
}

export default App;
