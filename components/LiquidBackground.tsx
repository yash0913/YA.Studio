"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LiquidMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#F0EBE0") }, // Denser off-white
      uColorB: { value: new THREE.Color("#DED6C1") }, // Denser champagne
      uColorC: { value: new THREE.Color("#C9BEA2") }, // Denser gold/tan
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // Organic liquid movement logic
        float n = 0.0;
        vec2 p = uv * 2.0;
        n += 0.5 * sin(p.x * 2.0 + uTime * 0.4);
        n += 0.3 * sin(p.y * 3.0 + uTime * 0.3);
        n += 0.2 * sin((p.x + p.y) * 1.5 + uTime * 0.5);
        
        // Luxury color blending
        vec3 color = mix(uColorA, uColorB, n * 0.5 + 0.5);
        color = mix(color, uColorC, clamp(sin(uTime * 0.1 + uv.x * 3.0) * 0.5 + 0.5, 0.0, 1.0) * 0.2);
        
        // Soft glossy refraction highlights
        float shine = smoothstep(0.48, 0.5, sin(uv.x * 8.0 + uv.y * 4.0 + uTime * 0.8));
        color += shine * 0.08;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={shaderData.vertexShader}
      fragmentShader={shaderData.fragmentShader}
      uniforms={shaderData.uniforms}
    />
  );
};

export const LiquidBackground = () => {
  useEffect(() => {
    console.log("🚀 WebGL Liquid Background Initialized & Rendering");
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#FAFAFA] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <mesh scale={[10, 10, 1]}>
          <planeGeometry args={[1, 1, 1, 1]} />
          <LiquidMaterial />
        </mesh>
      </Canvas>
      
      {/* Subtle Grain Overlay for Premium Feel */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
    </div>
  );
};
