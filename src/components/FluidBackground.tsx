'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';
import { useInView } from 'react-intersection-observer';

function AnimatedSphere({ isVisible }: { isVisible: boolean }) {
  const sphereRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!isVisible) return; // Пропускаем если не виден

    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={0.8}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={3}>
        <MeshDistortMaterial
          color="#2e1065"
          distort={0.7}
          speed={2.5}
          roughness={0.1}
          metalness={0.2}
          envMapIntensity={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function FluidBackground() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[#060814]">
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }} frameloop={inView ? 'always' : 'demand'}>
        <ambientLight intensity={0.8} />
        <pointLight position={[-3, 2, 2]} intensity={100} color="#7C3AED" distance={14} />
        <pointLight position={[3, -2, 2]} intensity={100} color="#3B82F6" distance={14} />
        <pointLight position={[0, 4, 3]} intensity={80} color="#A78BFA" distance={12} />
        <pointLight position={[0, -3, -2]} intensity={50} color="#22d3ee" distance={11} />
        <pointLight position={[2, 2, 4]} intensity={60} color="#EC4899" distance={10} />
        <AnimatedSphere isVisible={inView} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[#060814]/10 backdrop-blur-[16px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#060814]/15 to-[#060814]" />
    </div>
  );
}
