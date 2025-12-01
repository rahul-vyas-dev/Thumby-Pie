import { LampContainer } from "./lamp";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
const LampEffect = () => (
  <motion.div
    className="flex w-full flex-col items-center justify-center"
    initial={{ opacity: 0.9, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.2,
      duration: 0.3,
      ease: "easeInOut",
    }}
  >
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent md:text-7xl outline-1 rounded-3xl p-2.5 shadow-lg shadow-gray-600"
      >
        <span className="flex mb-4 text-center">
          <Quote fill="white" className="rotate-180"/> Art born from your ideas.{" "}
          <Quote fill="white" />
        </span>
        So
        <br />
        <span className="flex">
          Imagine it, prompt it, create it.
        </span>
      </motion.h1>
    </LampContainer>
  </motion.div>
);
export default LampEffect;
