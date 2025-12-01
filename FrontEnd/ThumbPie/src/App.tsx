import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./components/Header";
import "./app.css";
import LampEffect from "./components/ui/lampCompo";
import { Text } from "./components/3D/Text";
import { BackgroundBeamsWithCollisionDemo } from "./components/ui/BackgroundBeamsWithCollisionDemo";
import { ThreeDMarqueeDemoSecond } from "./components/ui/ThreeDMarqueeDemoSecond";
import { CardHoverEffectDemo } from "./components/ui/CardHoverEffectDemo";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <LampEffect />
      <Text />
      <BackgroundBeamsWithCollisionDemo />
      <ThreeDMarqueeDemoSecond />
      <CardHoverEffectDemo/>
    </ThemeProvider>
  );
}

export default App;
