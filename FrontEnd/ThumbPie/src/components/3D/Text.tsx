// https://cydstumpel.nl/

import * as THREE from "three";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import "./utils";
import image from "@/assets/images/img1.jpg";
import image2 from "@/assets/images/work_.png";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";
export const Text = () => {
  const { theme } = useTheme();
  return (
    <motion.section
      initial={{ opacity: 0.9, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="h-[50vh]"
    >
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#a79", 8.5, 12]} />
        <ScrollControls
          pages={4}
          infinite
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
        {theme === "light" && (
          <Environment preset="sunset" background blur={0.5} />
        )}
      </Canvas>
    </motion.section>
  );
};

function Rig(props: { children: Element; rotation: number[] }) {
  const ref = useRef(0);
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents

    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
      10000
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel() {
  const [radius, setRadius] = useState(window.innerWidth < 1200 ? 1.8 : 2.9);
  const [count, setCount] = useState(window.innerWidth < 1200 ? 9: 15);
  console.log('radusisds', radius);
useEffect(() => {
  const handleResize = () => {
    setRadius(window.innerWidth < 1200 ? 2 : 2.9);
    setCount(window.innerWidth < 1200 ? 9 : 15);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={image}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0.1]}
    />
  ));
}

function Card({ url, ...props }) {
  const ref = useRef("");
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, "zoom", hovered ? 2 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props: [number]) {
  const ref = useRef<Mesh>(null!);
  const texture = useTexture(image2);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
