import { motion } from "framer-motion";
import ATG from "@/assets/images/ATG.png";
import { NavLink } from "react-router-dom";
import { useUserStore, selectIsAuthenticated } from "@/store/useUserStore";
import { Button } from "./Button";
import { LogIn } from "lucide-react";

function Footer() {
  const userstore = useUserStore((state) => state);
  const clearUser = useUserStore((state) => state.clearUser);
  const user = selectIsAuthenticated(userstore);
  const handleSignout = () => {
    clearUser();
  };

  return (
    <motion.footer>
      <div className="border"></div>
      <footer className="p-5 flex justify-between">
        <section>
          <div className="flex gap-8">
            <img
              src={ATG}
              alt="ATG Logo"
              className="w-11 h-11 rounded-2xl bg-transparent outline-8 hover:translate-x-0.5 hover:translate-y-0.5 blur-out ml-2 dark:invert outline-gray-300"
            />
            <NavLink to={"/home"}>
              <span className="font-bold text-4xl text-black dark:text-gray-500 hover:translate-x-0.5 hover:translate-y-0.5">
                ATG
              </span>
            </NavLink>
          </div>
          <div className="flex flex-col mt-6 gap-1 text-xl">
            <b>
              A product by{" "}
              <a
                className="underline "
                href="https://www.linkedin.com/in/rahul-vyas-a60b83370/"
              >
                Rahul
              </a>
            </b>
            <b>
              <a
                href="https://github.com/rahul-vyas-dev/Thumby-Pie"
                className="underline"
              >
                Open source Open Code
              </a>
            </b>
          </div>
        </section>
        <section className="flex flex-col">
          <main className="mb-5">
            {user ? (
              <NavLink to="/dashboard">
                <Button
                  className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800 hover:translate-x-0.5 hover:translate-y-0.5"
                  onClick={handleSignout}
                >
                  <b> Sign Out</b>
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Button className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800 hidden  md:block hover:translate-x-0.5 hover:translate-y-0.5">
                  <b>Login</b>
                </Button>
                <LogIn className="ml-4 inline-block md:hidden" />
              </NavLink>
            )}
          </main>
          <main>
            <section className="grid gap-15 grid-cols-1  lg:grid-cols-3 sm:grid-cols-2">
              <div>
                <h1 className="font-bold text-xl mb-5">Page Link</h1>
                <span className="flex flex-col gap-3.5 w-1/3 text-black dark:text-white">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? "text-red-900" : ""
                    }
                  >
                    <b className="">Home</b>
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                      isActive ? "text-red-900" : ""
                    }
                  >
                    <b>Pricing</b>
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      isActive ? "text-red-900" : ""
                    }
                  >
                    <b>Blog</b>
                  </NavLink>
                </span>
              </div>
              <div>
                <h1 className="font-bold text-xl mb-5">Social Media</h1>
                <span className="flex flex-col gap-3.5 w-1/3 text-black dark:text-white">
                  <a
                    href="https://github.com/rahul-vyas-dev/"
                    className="font-bold underline"
                  >
                    Github
                  </a>
                  <a
                    href="https://x.com/RahulVyas496824"
                    className="font-bold underline"
                  >
                    X
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rahul-vyas-a60b83370/"
                    className="font-bold underline"
                  >
                    Linked&nbsp;In
                  </a>
                  <a
                    href="mailto:rahulvyas.5100@gmail.com"
                    className="font-bold underline"
                  >
                    ATG
                  </a>
                </span>
              </div>
              <div>
                {user ? (
                  <NavLink to="/dashboard">
                    <Button className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800 hover:translate-x-0.5 hover:translate-y-0.5">
                      <b> Generate Your Thoughts</b>
                    </Button>
                  </NavLink>
                ) : (
                  <NavLink to="/login">
                    <Button className="ml-4 px-4 py-2 bg-white text-black rounded-lg dark:text-white dark:bg-black border-2  hover:bg-gray-200 dark:hover:bg-gray-800 hidden  md:block hover:translate-x-0.5 hover:translate-y-0.5">
                      <b>Login</b>
                    </Button>
                    <LogIn className="ml-4 inline-block md:hidden" />
                  </NavLink>
                )}
              </div>
            </section>
          </main>
        </section>
      </footer>
    </motion.footer>
  );
}

export default Footer;
