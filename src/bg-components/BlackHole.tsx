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
        iResolution: { value: new THREE.Vector3() },
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
        uniform vec3 iResolution;
        varying vec2 vUv;

        void main() {
          vec2 I = vUv * iResolution.xy;
          vec4 O = vec4(0.0);
          
          // Raymarch depth
          float z = 0.0;
          // Step distance
          float d = 0.0;
          // Raymarch iterator
          float i = 0.0;
          
          // Clear fragColor and raymarch 20 steps
          for(i = 0.0; i < 20.0; i += 1.0) {
            // Sample point (from ray direction)
            vec3 p = z * normalize(vec3(I + I, 0.0) - iResolution.xyx) + 0.1;
            
            // Polar coordinates and additional transformations
            p = vec3(atan(p.y, p.x * 0.2) * 2.0, p.z / 3.0, length(p.xy) - 5.0 - z * 0.2);
            
            // Apply turbulence and refraction effect
            for(float j = 1.0; j <= 7.0; j += 1.0) {
              p += sin(p.yzx * j + iTime + 0.3 * i) / j;
            }
            
            // Distance to cylinder and waves with refraction
            d = length(vec4(0.4 * cos(p) - 0.4, p.z));
            z += d;
            
            // Coloring and brightness
            O += (1.0 + cos(p.x + i * 0.4 + z + vec4(6.0, 1.0, 2.0, 0.0))) / d;
          }
          
          // Tanh tonemap
          O = tanh(O * O / 400.0);
          
          gl_FragColor = O;
        }
      `,
    });
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
      shaderMaterial.uniforms.iResolution.value.set(size.width, size.height, 1);
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

export default function BlackHole({ width, height }: { width: string; height: string }) {
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
