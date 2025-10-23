
"use client";

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    THREE: any
  }
}

function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: any
    scene: any
    renderer: any
    uniforms: any
    animationId: number | null
  }>({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"
    script.async = true
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS()
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      if (sceneRef.current.renderer) {
         if (containerRef.current && containerRef.current.contains(sceneRef.current.renderer.domElement)) {
            containerRef.current.removeChild(sceneRef.current.renderer.domElement);
         }
        sceneRef.current.renderer.dispose()
      }
      try {
        document.head.removeChild(script)
      } catch (e) {
        // script might have been removed by other means
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return

    const THREE = window.THREE
    const container = containerRef.current

    // Clear any existing content
    container.innerHTML = ""

    // Initialize camera
    const camera = new THREE.Camera()
    camera.position.z = 1

    // Initialize scene
    const scene = new THREE.Scene()

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    // Define uniforms
    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader for light yellow lines
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      
      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256.0, 256.0);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        float intensity = 0.0;
        for(int i=0; i < 5; i++){
            intensity += lineWidth*float(i*i) / abs(fract(t + float(i)*0.01)*1.0 - length(uv));        
        }

        // Light yellow color: (R=1.0, G=1.0, B=0.8)
        vec3 color = vec3(1.0, 1.0, 0.8) * intensity;

        gl_FragColor = vec4(color,1.0);
      }
    `

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    }

    // Handle resize
    const onWindowResize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      if (!sceneRef.current.renderer) return;
      sceneRef.current.animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }

    animate()
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0" 
    />
  )
}


export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <ShaderAnimation />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                   Work Made Simple.
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                   Opportunities Made Instant.
                </h1>
                 <p className="text-lg md:text-xl text-yellow-100/80 max-w-2xl mx-auto mt-6">
                    TempHub connects you with temporary jobs and reliable workers in an instant. Find your next gig or your next great hire today.
                </p>
                <div className="mt-10">
                     <Button 
                        size="lg"
                        onClick={() => router.push('/login')}
                        className="bg-primary/90 text-primary-foreground hover:bg-primary text-lg px-8 py-6 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
                     >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}
