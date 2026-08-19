"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#a91ee4";
const ACCENT_SOFT = "#c86bf0";

const TEETH = [
  { x: 0.28, y: -1.1, w: 0.22, h: 0.16 },
  { x: 0.34, y: -1.32, w: 0.3, h: 0.16 },
  { x: 0.26, y: -1.54, w: 0.18, h: 0.16 },
  { x: 0.32, y: -1.76, w: 0.26, h: 0.16 },
];

function KeyParts({ material }: { material: React.ReactNode }) {
  return (
    <>
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.55, 0.17, 32, 64]} />
        {material}
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 2.3, 32]} />
        {material}
      </mesh>
      {TEETH.map((tooth, i) => (
        <mesh key={i} position={[tooth.x, tooth.y, 0]}>
          <boxGeometry args={[tooth.w, tooth.h, 0.34]} />
          {material}
        </mesh>
      ))}
    </>
  );
}

function KeyModel() {
  const group = useRef<THREE.Group>(null);
  const wireGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !wireGroup.current) return;
    group.current.rotation.y += delta * 0.35;
    wireGroup.current.rotation.y = group.current.rotation.y;

    const targetX = state.pointer.y * 0.18;
    const targetZ = -state.pointer.x * 0.18;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetZ, 4, delta);
    wireGroup.current.rotation.x = group.current.rotation.x;
    wireGroup.current.rotation.z = group.current.rotation.z;
  });

  return (
    <>
      <group ref={group}>
        <KeyParts
          material={
            <meshPhysicalMaterial
              color={ACCENT}
              metalness={0.92}
              roughness={0.22}
              clearcoat={0.7}
              clearcoatRoughness={0.18}
              emissive={ACCENT}
              emissiveIntensity={0.08}
            />
          }
        />
      </group>
      <group ref={wireGroup} scale={1.09}>
        <KeyParts material={<meshBasicMaterial color={ACCENT_SOFT} wireframe transparent opacity={0.22} />} />
      </group>
    </>
  );
}

function ScanPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(ACCENT) },
    }),
    []
  );

  useFrame((_, delta) => {
    if (ref.current) ref.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 0, -2.6]}>
      <planeGeometry args={[9, 9, 1, 1]} />
      <shaderMaterial
        ref={ref}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;
          void main() {
            vec2 centered = vUv - 0.5;
            float dist = length(centered);
            float vignette = smoothstep(0.75, 0.05, dist);

            float grid = 0.0;
            grid += step(0.985, fract(vUv.x * 24.0));
            grid += step(0.985, fract(vUv.y * 24.0));
            grid = clamp(grid, 0.0, 1.0) * 0.12;

            float scan = sin((vUv.y * 60.0) - uTime * 1.4) * 0.5 + 0.5;
            scan = pow(scan, 8.0) * 0.35;

            float alpha = (grid + scan) * vignette;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.3, 4, 0.016);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.15, 4, 0.016);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function KeyScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={40} color={ACCENT_SOFT} />
      <pointLight position={[-4, -2, -3]} intensity={25} color={ACCENT} />
      <spotLight position={[0, 5, 2]} intensity={30} color="#ffffff" angle={0.5} penumbra={1} />

      <KeyModel />
      <Sparkles count={70} scale={[4.5, 4.5, 4.5]} size={2.2} speed={0.25} color={ACCENT_SOFT} opacity={0.6} />
      <Rig />
    </Canvas>
  );
}
