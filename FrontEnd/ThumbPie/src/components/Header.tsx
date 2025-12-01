import ATG from "@/assets/images/ATG.png";
import { useUserStore, selectIsAuthenticated } from "@/store/useUserStore";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/Button";
import { LogIn } from "lucide-react";

function Header() {
  const User = useUserStore((state) => state);
  const isAuthenticated = selectIsAuthenticated(User);
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-card text-foreground shadow-lg dark:shadow-gray-800 rounded-b-3xl">
        <div>
          <img
            src={ATG}
            alt="ATG Logo"
            className="w-11 h-11 rounded-2xl bg-transparent outline-8 hover:translate-x-0.5 hover:translate-y-0.5 blur-out ml-2 dark:invert outline-gray-300"
          />
        </div>
        <div className="bg-card w-1/3 h-full rounded-3xl  flex items-center justify-center px-4 py-2 shadow-lg dark:shadow-gray-700 hover:translate-x-0.5 hover:translate-y-0.5">
          <span className="flex gap-3.5 w-1/3 justify-center text-black dark:text-white">
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "text-red-900" : "")}
            >
              <b className="">Home</b>
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => (isActive ? "text-red-900" : "")}
            >
              <b>Pricing</b>
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "text-red-900" : "")}
            >
              <b>Blog</b>
            </NavLink>
          </span>
        </div>
        <div className="flex items-center">
          <ModeToggle />
          <div>
            {isAuthenticated ? (
              <NavLink to="/dashboard">
                <Button className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800">
                  <b> Generate Your Thoughts</b>
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Button className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800 hidden  md:block">
                  <b>Login</b>
                </Button>
                <LogIn className="ml-4 inline-block md:hidden" />
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
