import * as THREE from "three";

type MeshBasicMaterialProps = JSX.IntrinsicElements["meshBasicMaterial"];
type PlaneGeometryProps = JSX.IntrinsicElements["planeGeometry"];

interface MeshSineMaterialProps extends MeshBasicMaterialProps {
  time?: { value: number };
}

interface BentPlaneGeometryProps extends PlaneGeometryProps {
  radius?: number; // your custom radius argument
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshSineMaterial: MeshSineMaterialProps;
      bentPlaneGeometry: BentPlaneGeometryProps;
    }
  }
}
