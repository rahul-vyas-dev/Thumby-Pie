import { Text } from "@/components/3D/Text";
import { BackgroundBeamsWithCollisionDemo } from "@/components/ui/BackgroundBeamsWithCollisionDemo";
import { CardHoverEffectDemo } from "@/components/ui/CardHoverEffectDemo";
import { CarouselDemo } from "@/components/ui/CarouselContentDemo";
import LampEffect from "@/components/ui/lampCompo";
import { ThreeDMarqueeDemoSecond } from "@/components/ui/ThreeDMarqueeDemoSecond";

function Home() {
  return (
    <main>
      <LampEffect />
      <Text />
      <BackgroundBeamsWithCollisionDemo />
      <ThreeDMarqueeDemoSecond />
      <CardHoverEffectDemo />
      <CarouselDemo />
    </main>
  );
}

export default Home;
