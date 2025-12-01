import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleToggle = () => {
    console.log("Current theme:", theme);
    setTheme(theme == "light" ? "dark" : "light");
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle Theme"
      
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 fill-black"/>
    </Button>
  );
}
