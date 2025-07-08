"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { extend } from "@react-three/fiber";

extend({ ShaderMaterial: THREE.ShaderMaterial });

const MyShaderMaterial = {
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
    precision mediump float;
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    float ltime;

    float noise(vec2 p)
    {
      return sin(p.x*10.) * sin(p.y*(3. + sin(ltime/11.))) + .2; 
    }

    mat2 rotate(float angle)
    {
      return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    }

    float fbm(vec2 p)
    {
      p *= 1.1;
      float f = 0.;
      float amp = .5;
      for( int i = 0; i < 3; i++) {
        mat2 modify = rotate(ltime/50. * float(i*i));
        f += amp*noise(p);
        p = modify * p;
        p *= 2.;
        amp /= 2.2;
      }
      return f;
    }

    float pattern(vec2 p, out vec2 q, out vec2 r) {
      q = vec2( fbm(p + vec2(1.)),
                fbm(rotate(.1*ltime)*p + vec2(3.)));
      r = vec2( fbm(rotate(.2)*q + vec2(0.)),
                fbm(q + vec2(0.)));
      return fbm(p + 1.*r);
    }

    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution;
      vec2 p = fragCoord.xy / iResolution.xy;
      ltime = iTime;
      float ctime = iTime + fbm(p/8.)*40.;
      float ftime = fract(ctime/6.);
      ltime = floor(ctime/6.) + (1.-cos(ftime*3.1415)/2.);
      ltime = ltime*6.;
      vec2 q;
      vec2 r;
      float f = pattern(p, q, r);
      // vec3 col = hsv2rgb(vec3(q.x/10. + ltime/100. + .4, abs(r.y)*3. + .1, r.x + f));
      vec3 col = vec3(1.0) * (r.x + f); // blue intensity
      float vig = 1. - pow(4.*(p.x - .5)*(p.x - .5), 10.);
      vig *= 1. - pow(4.*(p.y - .5)*(p.y - .5), 10.);
      gl_FragColor = vec4(col*vig,1.);
    }
  `,
};

function ShaderPlane() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  useFrame(({ clock, size }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.iResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial ref={shaderRef} args={[MyShaderMaterial]} />
    </mesh>
  );
}

export default function MetallicWaves({
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
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
