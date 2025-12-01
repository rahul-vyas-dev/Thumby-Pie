import { NavLink } from "react-router-dom";
import { ThreeDMarquee } from "./3d-marquee";
import { Button } from "./Button";
import { motion } from "framer-motion";
export function ThreeDMarqueeDemoSecond() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];
  return (
    <motion.main
      initial={{ opacity: 0.9, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full h-screen"
    >
      <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
        <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
          Less Price,{" "}
          <span className="relative z-20 inline-block rounded-xl text-center bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-16 bg-backdrop-blur-sm">
            Less Effort
          </span>
        </h2>
        <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base font-medium ">
          Experience the simplest way to turn your ideas into stunning
          thumbnails. Our platform is built for creators who want high-quality
          results without spending hours designing. Just write a single prompt,
          and the system instantly transforms your concept into a
          professional-grade thumbnail tailored to your style. Designed for
          speed and affordability, the app delivers some of the fastest
          generation times in its category — all at the lowest price. No
          complicated settings, no design skills needed, and no wasted effort.
          Whether you're a YouTuber, marketer, or content creator, this tool
          helps you produce eye-catching visuals effortlessly, allowing you to
          focus more on creating and less on editing.
        </p>
        <p className="relative z-20 mx-auto max-w-2xl text-center text-sm text-neutral-200 md:text-base">
          <b>Trusted by </b>
          <b className=" relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[3px] underline-offset-16 backdrop-blur-sm">
            1100+
          </b>{" "}
          <b>Creators & Brands</b>
        </p>
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
          <NavLink to={"/pricing"}>
            <Button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none hover:translate-x-0.5 hover:translate-y-0.5">
              <b>Join the club</b>
            </Button>
          </NavLink>
          <NavLink to={"/blog"}>
            <Button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none hover:translate-x-0.5 hover:translate-y-0.5">
              <b>Read more</b>
            </Button>
          </NavLink>
        </div>

        {/* overlay */}
        <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
        <ThreeDMarquee
          className="pointer-events-none absolute inset-0 h-full w-full"
          images={images}
        />
      </div>
    </motion.main>
  );
}
