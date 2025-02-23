import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/Addons.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";

export default function Globe() {
  return (
    <Canvas camera={{ fov: 50, near: 1, far: 100 }}>
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const { camera } = useThree();
  const meshReference = useRef<THREE.Mesh>(null);
  const geometryReference = useRef<THREE.BufferGeometry>(null);
  const wireframeReference = useRef<LineSegments2>(null);
  const material = new LineMaterial({ color: 0x88_91_F3, linewidth: 3 });
  const sphereGeometry = useSphereMesh();

  useEffect(() => {
    geometryReference.current = new THREE.BufferGeometry().copy(new THREE.EdgesGeometry());

    if (meshReference.current) {
      meshReference.current.geometry = geometryReference.current;
      meshReference.current.material = material;
    }

    camera.position.set(0, 13, 4);
    camera.lookAt(0, 8.5, 0);
  }, []);

  useFrame(() => {
    if (wireframeReference.current) {
      wireframeReference.current.rotation.y += 0.0025;
    }
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[9.95, 32, 32]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <lineSegments geometry={sphereGeometry} ref={wireframeReference}>
        <lineBasicMaterial color="slateblue" />
      </lineSegments>
    </>
  );
}

function useSphereMesh() {
  return useMemo(() => {
    const geometry = new THREE.SphereGeometry(10, 32, 32);

    const p = (geometry as any).parameters;
    if (!p) return;

    const segmentsX = p.widthSegments;
    const segmentsY = p.heightSegments - 2;
    const mainShift = segmentsX + 1;
    const indices: number[] = [];

    for (let index = 0; index < segmentsY + 1; index++) {
      let index11 = 0;
      let index12 = 0;
      for (let index_ = 0; index_ < segmentsX; index_++) {
        index11 = (segmentsX + 1) * index + index_;
        index12 = index11 + 1;
        const index21 = index11;
        const index22 = index11 + (segmentsX + 1);
        indices.push(index11 + mainShift, index12 + mainShift);
        if (index22 < (segmentsX + 1) * (segmentsY + 1) - 1) {
          indices.push(index21 + mainShift, index22 + mainShift);
        }
      }
      if (index12 + segmentsX + 1 <= (segmentsX + 1) * (segmentsY + 1) - 1) {
        indices.push(index12 + mainShift, index12 + segmentsX + 1 + mainShift);
      }
    }

    const lastIndex = indices.at(-1) + 2;

    for (let index = 0; index < segmentsX; index++) {
      indices.push(index, index + mainShift, index, index + mainShift + 1);

      const index_ = lastIndex + index;
      const backShift = mainShift + 1;
      indices.push(index_, index_ - backShift, index_, index_ - backShift + 1);
    }

    geometry.setIndex(indices);

    return geometry;
  }, []);
}
