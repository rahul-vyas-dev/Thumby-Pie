import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/ui/Footer";
// import Home from "./pages/Home";
// import Blog from "./pages/Blog";
import { SidebarDemo } from "./components/ui/sideBarDemo";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Header />
      {/* <Home/> */}
      {/* <Blog/> */}
      <SidebarDemo/>
      
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
