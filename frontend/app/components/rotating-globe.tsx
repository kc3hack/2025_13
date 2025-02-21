import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  BufferGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Matrix4,
  SphereGeometry,
  Vector3,
} from "three";

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 8, 4], fov: 30 }}>
      <ambientLight intensity={0.5} />
      <WireframeGlobe />
      {/* <OrbitControls /> */}
      {/**    */} {/** マウス操作可能 */}
    </Canvas>
  );
}

function WireframeGlobe() {
  const meshReference = useRef<LineSegments | null>(null);
  const { camera } = useThree();
  const geometryRefrence = useRef<BufferGeometry | null>(null);

  useEffect(() => {
    // ワイヤーフレームの球体を作成
    const geometry = new SphereGeometry(3.6, 32, 32); // 半径2、32x32分割
    const edges = new EdgesGeometry(geometry);

    const material = new LineBasicMaterial({ color: 0x80_00_80, linewidth: 1 });

    geometryRefrence.current = new BufferGeometry().copy(edges);

    if (meshReference.current) {
      meshReference.current.geometry = geometryRefrence.current;
      meshReference.current.material = material;
    }

    camera.position.set(0, 8, 4);
    camera.lookAt(0, 0, 0);
  }, []);

  useFrame(() => {
    if (meshReference.current && geometryRefrence.current) {
      // 🔹 回転速度を適正化
      meshReference.current.rotation.y += 0.000_01;
      // meshReference.current.rotation.y -= 0.001;

      const positionAttribute = geometryRefrence.current.attributes.position;
      const filteredVertices: number[] = [];

      for (let index = 0; index < positionAttribute.count; index += 2) {
        const v1 = new Vector3(
          positionAttribute.getX(index),
          positionAttribute.getY(index),
          positionAttribute.getZ(index),
        );
        const v2 = new Vector3(
          positionAttribute.getX(index + 1),
          positionAttribute.getY(index + 1),
          positionAttribute.getZ(index + 1),
        );

        // 現在の回転を適用
        const rotationMatrix = new Matrix4();
        rotationMatrix.makeRotationY(meshReference.current.rotation.y);
        v1.applyMatrix4(rotationMatrix);
        v2.applyMatrix4(rotationMatrix);

        // 裏側のエッジを除外
        const normal = v1.clone().normalize();
        const cameraDir = camera.position.clone().normalize();
        const dot = normal.dot(cameraDir);

        if (dot >= 0) {
          filteredVertices.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        }
      }

      geometryRefrence.current.setAttribute("position", new Float32BufferAttribute(filteredVertices, 3));
      geometryRefrence.current.attributes.position.needsUpdate = true;
    }
  });
  return <lineSegments ref={meshReference} />;
}
