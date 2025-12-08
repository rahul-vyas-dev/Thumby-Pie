import { ThemeProvider } from "@/components/ThemeProvider";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/ui/Footer";
// import Home from "./pages/Home";
// import Blog from "./pages/Blog";
// import { SidebarDemo } from "./components/ui/sideBarDemo";
import Upload from "./pages/Upload";
import { Toaster } from "./components/ui/sonner";
import CodeVerification from "./pages/CodeVerification";
import SignIn from "./pages/Sign-In";
import SignUp from "./pages/Sign-Up";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Header />
      {/* <Home/> */}
      {/* <Blog/> */}
      {/* <Upload/> */}
      
      {/* <Footer /> */}
      <CodeVerification/>
      {/* <SignUp/> */}
    </ThemeProvider>
  );
}

export default App;
