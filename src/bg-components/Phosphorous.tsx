"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const Scene1 = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        varying vec2 vUv;

        void main() {
            vec2 I = vUv * iResolution.xy;
            vec4 O = vec4(0.0);
            
            // Animation time
            float t = iTime;
            // Raymarch depth
            float z = 0.0;
            // Step distance
            float d = 0.0;
            // Signed distance
            float s = 0.0;
            // Raymarch iterator
            float i = 0.0;
            
            // Clear fragColor and raymarch 80 steps
            for(O *= i; i < 80.0; i += 1.0) {
                // Sample point (from ray direction)
                vec3 p = z * normalize(vec3(I + I, 0.0) - iResolution.xyy);
                // Rotation axis
                vec3 a = normalize(cos(vec3(1.0, 2.0, 0.0) + t - d * 8.0));
                // Move camera back 5 units
                p.z += 5.0;
                // Rotated coordinates
                a = a * dot(a, p) - cross(a, p);
                
                // Turbulence loop
                for(float j = 1.0; j < 9.0; j += 1.0) {
                    a += sin(a * j + t).yzx / j;
                }
                
                // Distance to rings
                s = a.y;
                d = 0.1 * abs(length(p) - 3.0) + 0.04 * abs(s);
                z += d;
                
                // Coloring and brightness
                O += (cos(s + vec4(0.0, 1.0, 2.0, 0.0)) + 1.0) / d * z;
            }
            
            // Tanh tonemap
            O = tanh(O / 30000.0);
            gl_FragColor = O;
        }
      `,
    });
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
      shaderMaterial.uniforms.iResolution.value.set(size.width, size.height);
    }
  });

  return (
    <>
      {/* Background shader plane */}
      <mesh ref={meshRef} material={shaderMaterial} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
      </mesh>
    </>
  );
};

export default function Phosphor({ width, height }: { width: string; height: string }) {
  return (
    <div
      className=" text-white bg-black relative"
      style={{
        width: width,
        minHeight: height,
      }}
    >
      <Canvas
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <Scene1 />
      </Canvas>
    </div>
  );
}
