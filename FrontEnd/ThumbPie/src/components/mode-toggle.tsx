import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Button variant="outline" size="icon">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only" onClick={handleToggle}>
        Toggle theme
      </span>
    </Button>
  );
}
