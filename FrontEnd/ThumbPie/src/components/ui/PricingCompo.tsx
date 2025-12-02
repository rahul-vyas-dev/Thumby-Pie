import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { Button } from "./Button";
interface priceData {
  data: {
    title: string;
    price: string;
    description: string;
    features: string[];
  };
}

function PricingCompo({ data }: priceData) {
  return (
    <>
      <motion.main
        className="border p-3 rounded-3xl border-gray-500 shadow-md dark:shadow-gray-700 hover:translate-x-0.5 hover:translate-y-0.5"
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "100%" }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
      >
        <h1 className="text-xl text-fuchsia-600">
          <b>{data.title}</b>
        </h1>
        <h2 className="text-4xl mt-4.5">
          <b>{data.price}</b>
        </h2>
        <div className="mt-4 font-medium dark:text-gray-400">
          {data.description}
        </div>
        <div className="mt-16">
          {data.features.map((features) => {
            return (
              <div className="flex mt-2">
                <span className="flex gap-2 justify-center font-medium">
                  <CircleCheck fill="green" stroke="black" />
                  {features}
                </span>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => {
            alert("Sorry!! This plan is not available😔😔😔");
          }}
        >
          <b>Buy Now </b>
        </Button>
        <span className="flex mt-4 underline">
          <b>
            Contact us on <a href="mailto:rahulvyas.5100@gmail.com">Mail</a>{" "}
          </b>
        </span>
      </motion.main>
    </>
  );
}

export default PricingCompo;
