import { pricingPlans } from "@/data/pricingPlans";
import PricingCompo from "@/components/ui/PricingCompo";
function Pricing() {
  return (
    <>
      <section className="mt-32 text-center border-2 p-4 rounded-2xl">
        <div>
          <h2 className="text-4xl font-extrabold">
            AI-Generated Thumbnails Made Simple{" "}
          </h2>
          <b>
            Create stunning, professional thumbnails in seconds — no design
            skills needed.
          </b>
        </div>{" "}
        <h2>
          <b>Need custom styles or a complete branding workflow?</b>
        </h2>
        <div className="mt-16 text-chart-3 text-3xl font-bold mb-8">
          <h3>Transparent pricing, no surprises</h3>
        </div>{" "}
      </section>
      <div className=" w-full dark:bg-slate-900 grid grid-cols-1 gap-6 bg-white rounded-lg text-center p-7 border border-amber-300 xl:grid-cols-2 2xl:grid-cols-3 mt-7">
        {pricingPlans.map((data) => {
          return (
            <main id={data.title}>
              <PricingCompo data={data} />
            </main>
          );
        })}
      </div>
    </>
  );
}

export default Pricing;
