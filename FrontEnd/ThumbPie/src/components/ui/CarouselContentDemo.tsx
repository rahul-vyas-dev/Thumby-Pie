import { NavLink } from "react-router-dom";
import { Button } from "./Button";
import { Card, CardDescription, CardTitle } from "./card-hover-effect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <main className="w-full flex justify-center items-center">
      <Carousel className="w-full max-w-xs flex justify-center items-center">
        <CarouselContent>
          {pricingPlans.map((plan, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Card className="bg-neutral-900 border-neutral-800 rounded-3xl hover:border-neutral-700 transition">
                  {/* Title with image */}
                  <CardTitle image={plan.image}>{plan.title}</CardTitle>

                  {/* Pricing */}
                  <p className="text-white text-4xl font-bold mt-4 tracking-tight">
                    {plan.price}
                  </p>

                  {/* Description */}
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>

                  {/* CTA Button */}
                  <NavLink to={"/pricing"}>
                    <Button className="mt-6 w-full py-2 bg-white text-black rounded-xl font-semibold hover:opacity-90 transition">
                      Choose Plan
                    </Button>
                  </NavLink>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}

const pricingPlans = [
  {
    title: "Starter",
    price: "₹99/mo",
    image: "https://i.pravatar.cc/150?img=1",
    description:
      "Perfect for beginners. Generate 50 thumbnails per month with fast processing speed.",
  },
  {
    title: "Pro",
    price: "₹199/mo",
    image: "https://i.pravatar.cc/150?img=2",
    description:
      "Best for creators. Unlimited generation, priority queue & HD enhancement.",
  },
  {
    title: "Creator",
    price: "₹299/mo",
    image: "https://i.pravatar.cc/150?img=3",
    description:
      "Optimized for professionals. Super-fast generation + premium filters.",
  },
  {
    title: "Business",
    price: "₹499/mo",
    image: "https://i.pravatar.cc/150?img=4",
    description:
      "Team-level access, API integration, instant generation & analytics.",
  },
  {
    title: "Enterprise",
    price: "Custom",
    image: "https://i.pravatar.cc/150?img=5",
    description:
      "For large agencies. Custom features, custom limits & dedicated support.",
  },
];
