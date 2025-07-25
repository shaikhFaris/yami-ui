const bgs = [
  {
    slug: "metallic-waves",
    name: "Metallic Waves",
    path: "/backgrounds/metallic-waves",
    filename: "MetallicWaves.tsx",
    fullCode: `

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
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      \`,
      fragmentShader: \`
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
      \`,
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
    
    `,
    dependenciesInstallation: "npm i @react-three/fiber three",
    import: `import MetallicWaves from "MetallicWaves.tsx"`,
  },
  {
    slug: "black-hole",
    name: "Black Hole",
    path: "/backgrounds/black-hole",
    filename: "BlackHole.tsx",
    fullCode: `

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
          vertexShader: \`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          \`,
    fragmentShader: \`
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
          \`,
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
    
    `,
    dependenciesInstallation: "npm i @react-three/fiber three",
    import: `import BlackHole from "BlackHole.tsx"`,
  },
  {
    slug: "shader-art",
    name: "Shader Art",
    path: "/backgrounds/shader-art",
    filename: "ShaderArt.tsx",
    fullCode: `

    "use client";
    import { Canvas, useFrame } from "@react-three/fiber";
    import { useThree } from "@react-three/fiber";
    import * as THREE from "three";
    import { useMemo, useRef } from "react";
    
    const Scene1 = () => {
      const meshRef = useRef<THREE.Mesh>(null);
      const { size, viewport } = useThree();
    
      const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3() },
          },
          vertexShader: \`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          \`,
          fragmentShader: \`
            uniform float iTime;
            uniform vec3 iResolution;
            varying vec2 vUv;
    
            // Palette function from iquilezles.org/articles/palettes/
            vec3 palette(float t) {
              vec3 a = vec3(0.5, 0.5, 0.5);
              vec3 b = vec3(0.5, 0.5, 0.5);
              vec3 c = vec3(1.0, 1.0, 1.0);
              vec3 d = vec3(0.263, 0.416, 0.557);
              return a + b * cos(6.28318 * (c * t + d));
            }
    
            void main() {
              vec2 fragCoord = vUv * iResolution.xy;
              vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
              vec2 uv0 = uv;
              vec3 finalColor = vec3(0.0);
              
              for (float i = 0.0; i < 4.0; i++) {
                uv = fract(uv * 1.5) - 0.5;
                float d = length(uv) * exp(-length(uv0));
                vec3 col = palette(length(uv0) + i * 0.4 + iTime * 0.4);
                d = sin(d * 8.0 + iTime) / 8.0;
                d = abs(d);
                d = pow(0.01 / d, 1.2);
                finalColor += col * d;
              }
              
              gl_FragColor = vec4(finalColor, 1.0);
            }
          \`,
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
    
    function ShaderArt({ width, height }: { width: string; height: string }) {
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
    
    export default ShaderArt;
    
    `,
    dependenciesInstallation: "npm i @react-three/fiber three",
    import: `import ShaderArt from "ShaderArt.tsx"`,
  },
  {
    slug: "light-tunnel",
    name: "Light Tunnel",
    path: "/backgrounds/light-tunnel",
    filename: "LightTunnel.tsx",
    fullCode: `

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
         vertexShader: \`
           varying vec2 vUv;
           void main() {
             vUv = uv;
             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
           }
         \`,
         fragmentShader:\`
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
         \`,
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
   
    
    `,
    dependenciesInstallation: "npm i @react-three/fiber three",
    import: `import LightTunnel from "LightTunnel.tsx"`,
  },
  {
    slug: "phosphorous",
    name: "Phosphorous",
    path: "/backgrounds/phosphorous",
    filename: "Phosphorous.tsx",
    fullCode: `

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
         vertexShader: \`
           varying vec2 vUv;
           void main() {
             vUv = uv;
             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
           }
         \`,
         fragmentShader: \`
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
         \`,
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
   
   
    
    `,
    dependenciesInstallation: "npm i @react-three/fiber three",
    import: `import LightTunnel from "LightTunnel.tsx"`,
  },
];
export default bgs;
