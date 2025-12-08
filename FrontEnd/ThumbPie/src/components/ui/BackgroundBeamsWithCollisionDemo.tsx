import { Quote } from "lucide-react";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";
import { motion } from 'framer-motion';
export function BackgroundBeamsWithCollisionDemo() {
  return (
    <motion.section
      initial={{ opacity: 0.9, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="mt-7 border rounded-3xl"
    >
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Let Ideas Take Shape.{" "}
          <div className="relative mx-auto inline-block w-max filter-[drop-shadow(0px_1px_3px_rgba(27,37,80,0.14))]">
            <div className="absolute left-0 top-px bg-clip-text bg-no-repeat text-transparent bg-linear-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="flex">
                <Quote className="dark:fill-fuchsia-600 rotate-180" /> One
                Prompt, Endless Possibilities
                <Quote className="dark:fill-fuchsia-600" />
              </span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="flex">
                <Quote className="dark:fill-fuchsia-600 rotate-180" />
                One Prompt, Endless Possibilities
                <Quote className="dark:fill-fuchsia-600" />
              </span>
            </div>
          </div>
        </h2>
      </BackgroundBeamsWithCollision>
    </motion.section>
  );
}
