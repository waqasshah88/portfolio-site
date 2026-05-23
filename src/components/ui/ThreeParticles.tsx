"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** @deprecated use ParticleCanvasProps instead — left for reference */
export type OldParticleCanvasProps = ParticleCanvasProps;

interface ParticleCanvasProps {
  isAnimatingCurrently?: boolean;
}

function Particles({ isAnimatingCurrently = true }: ParticleCanvasProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1800;

  // pre-calculate coordinates to form a planetary sphere with gravitational orbital rings
  const { originalPositions, tempObject } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const temp = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      let px = 0;
      let py = 0;
      let pz = 0;
      
      // Partition particles: Sphere (75%), Orbital Ring (25%)
      const segment = Math.random();
      if (segment < 0.75) {
        // Planetary Sphere: distributed on a sphere surface with slight depth/thickness
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        
        // Sphere radius between 1.1 and 1.3 for organic visual layering
        const radius = 1.1 + Math.random() * 0.2;

        px = radius * Math.sin(phi) * Math.cos(theta);
        py = radius * Math.sin(phi) * Math.sin(theta);
        pz = radius * Math.cos(phi);
      } else {
        // Orbital Ring: distributed on a flat XZ ring with slight tilt and spread
        const theta = Math.random() * Math.PI * 2;
        const radius = 2.1 + Math.random() * 0.4;
        
        // Flat ring with minor vertical variance
        px = Math.cos(theta) * radius;
        py = (Math.random() - 0.5) * 0.15;
        pz = Math.sin(theta) * radius;
        
        // Tilt the orbital ring slightly on the Z axis (about 15 degrees)
        const tiltAngle = Math.PI / 12;
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);
        const newY = py * cosT - px * sinT;
        const newX = py * sinT + px * cosT;
        px = newX;
        py = newY;
      }

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
    }

    return { originalPositions: positions, tempObject: temp };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !isAnimatingCurrently) return;

    // fetch coordinates relative to pointer
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    const time = state.clock.getElapsedTime();
    // rotate the bottle shape slowly on the Y axis
    const rotationY = time * 0.18;
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // apply rotation transformation matrix
      const rx = ox * cosY - oz * sinY;
      const rz = ox * sinY + oz * cosY;

      const dx = rx - mouseX;
      const dy = oy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let px = rx;
      let py = oy;
      let pz = rz;

      // mouse proximity push effect
      const rippleRadius = 2.4;
      if (dist < rippleRadius) {
        const force = (rippleRadius - dist) * 0.5;
        const angle = Math.atan2(dy, dx);
        
        px += Math.cos(angle) * force;
        py += Math.sin(angle) * force;
        pz += force * 0.85; // push towards the camera
      }

      tempObject.position.set(px, py, pz);
      
      // subtle scale scaling based on proximity
      const scale = dist < rippleRadius ? 1.0 + (rippleRadius - dist) * 0.22 : 1.0;
      tempObject.scale.set(scale, scale, scale);
      
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Fetch Accent Color from CSS Variable lookup
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#c8ff00';

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.008, 0]} />
      {/* Swapped flat basic material for standard metallic material with roughness to react to lights */}
      <meshStandardMaterial 
        color={accentColor} 
        roughness={0.1} 
        metalness={0.9} 
        emissive={accentColor}
        emissiveIntensity={0.3}
        transparent 
        opacity={0.45} 
        depthWrite={false} 
      />
    </instancedMesh>
  );
}

export default function ThreeParticles() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-90 will-change-transform">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Added ambient and directional lights to illuminate the crystal meshes */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 2]} intensity={2.0} />
        <pointLight position={[-3, -3, 2]} intensity={2.5} color="#c8ff00" />
        <Particles />
      </Canvas>
    </div>
  );
}
