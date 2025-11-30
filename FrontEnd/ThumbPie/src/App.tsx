import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
    </ThemeProvider>
  );
}

export default App;
