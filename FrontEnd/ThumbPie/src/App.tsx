import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/ui/Footer";
import Home from "./pages/Home";
import "./app.css";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Home/>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
