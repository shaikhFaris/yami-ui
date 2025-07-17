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

        float sdf(in vec3 pos){
            pos = mod(pos, 10.0);
            return length(pos - vec3(5.0)) - 1.0;
        }

        void main() {
            vec2 fragCoord = vUv * iResolution.xy;
            vec2 uv = (fragCoord * 2.0 - iResolution.xy) / max(iResolution.x, iResolution.y);
            
            // Move and rotate camera over time
            vec3 origin = vec3(0.0, 5.0, 0.0) * iTime;
            float angle = radians(iTime * 3.0);
            mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            uv = rotation * uv;
            
            // Use spherical projection for ray direction
            vec3 ray_dir = vec3(sin(uv.x), cos(uv.x) * cos(uv.y), sin(uv.y));
            vec3 ray_pos = vec3(origin);
            
            float ray_length = 0.0;
            
            for(float i = 0.0; i < 7.0; i++){
                float dist = sdf(ray_pos);
                ray_length += dist;
                ray_pos += ray_dir * dist;
                // Push rays outward with increasing distance
                ray_dir = normalize(ray_dir + vec3(uv.x, 0.0, uv.y) * dist * 0.3);
            }
            
            vec3 o = vec3(sdf(ray_pos));
            o = cos(o + vec3(6.0, 0.0, 0.5));
            o *= smoothstep(38.0, 20.0, ray_length);
            gl_FragColor = vec4(o, 1.0);
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
      {/*bsckground shader plane */}
      <mesh ref={meshRef} material={shaderMaterial} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
      </mesh>
    </>
  );
};

export default function LightTunnel({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
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
