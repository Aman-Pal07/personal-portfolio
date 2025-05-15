import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface SceneProps {
  className?: string;
}

function Scene({ className = "" }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create three.js scene
    const container = containerRef.current;
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Add enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    // Add vibrant blue themed lights
    const mainBlueLight = new THREE.PointLight(0x00ffff, 5, 15);
    mainBlueLight.position.set(2, 2, 2);
    scene.add(mainBlueLight);

    const brightBlueLight = new THREE.PointLight(0x00bfff, 4, 12);
    brightBlueLight.position.set(-2, 1, -1);
    scene.add(brightBlueLight);

    const accentLight = new THREE.PointLight(0x0088ff, 3, 10);
    accentLight.position.set(0, -2, 2);
    scene.add(accentLight);

    // Add bloom effect light
    const bloomLight = new THREE.PointLight(0x00ffff, 3, 8);
    bloomLight.position.set(1, 1, 1);
    scene.add(bloomLight);

    // Add emissive parts to glow
    const bloomPass = {
      threshold: 0,
      strength: 1.5,
      radius: 0.7,
      exposure: 1,
    };

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Load 3D model
    const loader = new GLTFLoader();
    // Log the attempted path
    console.log(
      "Attempting to load model from:",
      "/models/sci-fi_computer.glb"
    );

    loader.load(
      "/models/sci-fi_computer.glb",
      (gltf) => {
        const model = gltf.scene;
        console.log("Model loaded successfully:", model);

        // Scale and position the model
        model.scale.set(0.8, 0.8, 0.8);
        model.position.set(0, -0.5, 0);
        model.rotation.set(0, Math.PI / 4, 0);

        // Create canvas for screen texture with custom text
        const canvas = document.createElement("canvas");
        canvas.width = 1024; // Increased resolution
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Fill background with dark color
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Add subtle grid effect

          // Add green text with enhanced glow effect
          ctx.shadowColor = "#39FF14";

          // Title - made smaller and moved up
          ctx.font = "bold 56px monospace";
          ctx.textAlign = "center";
          ctx.fillText("Full Stack Developer", canvas.width / 2, 120);

          // Code section - adjusted for better fit
          ctx.font = "28px monospace";
          ctx.textAlign = "left";
          const startX = 80;
          let currentY = 500;
          const lineHeight = 40;

          const drawCodeLine = (text: string, indent = 0) => {
            // Add text shadow for better visibility
            ctx.shadowBlur = 8;
            ctx.fillText(text, startX + indent * 25, currentY);
            currentY += lineHeight;
          };

          // Draw main content with compact spacing
          drawCodeLine("def init():");
          drawCodeLine("self.skills = {", 1);
          drawCodeLine('"frontend": ["React", "TypeScript", "ThreeJS"],', 2);
          drawCodeLine('"backend": ["Node", "Express", "Python"],', 2);
          drawCodeLine('"database": ["SQL", "MongoDB", "PostgreSQL"]', 2);
          drawCodeLine("}", 1);
          currentY += lineHeight / 3; // Reduced spacing
          drawCodeLine("self.experience = 5  # years", 1);
          drawCodeLine("return self.connect()", 1);
          currentY += lineHeight / 3;

          // Portfolio link with slightly larger font
          ctx.font = "30px monospace";
          drawCodeLine("# Portfolio: github.com/developer");
        }

        // Create texture from canvas
        const screenTexture = new THREE.CanvasTexture(canvas);

        // Apply materials if needed
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            console.log("Found mesh:", child.name);

            // Apply screen texture to any screen-like part
            if (
              child.name.includes("screen") ||
              child.name.includes("Screen") ||
              child.name.includes("monitor") ||
              child.name.includes("display")
            ) {
              // Create material for screen with our custom texture
              const screenMaterial = new THREE.MeshStandardMaterial({
                map: screenTexture,
                emissive: new THREE.Color(0x39ff14), // Green emissive glow
                emissiveIntensity: 0.8,
                emissiveMap: screenTexture,
              });

              // Replace the material
              if (Array.isArray(child.material)) {
                child.material.forEach((_, index) => {
                  child.material[index] = screenMaterial;
                });
              } else {
                child.material = screenMaterial;
              }
            }
            // Enhance other materials
            else if (child.material) {
              if (
                child.name.includes("computer") ||
                child.name.includes("body") ||
                child.name.includes("base")
              ) {
                if (Array.isArray(child.material)) {
                  child.material.forEach((mat) => {
                    mat.metalness = 0.8;
                    mat.roughness = 0.2;
                  });
                } else {
                  child.material.metalness = 0.8;
                  child.material.roughness = 0.2;
                }
              }
            }

            // Ensure materials update
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  mat.needsUpdate = true;
                });
              } else {
                child.material.needsUpdate = true;
              }
            }
          }
        });

        scene.add(model);
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        // Error handling
        console.error("An error happened loading the model:", error);

        // Create a fallback model if loading fails
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: 0x00ffff,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x0088ff,
          emissiveIntensity: 0.5,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        scene.add(cube);
        console.log("Created fallback cube model due to loading error");
      }
    );

    // Create animated particle system for background effects
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Position particles in a sphere around the center
      particlePositions[i3] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Random sizes
      particleSizes[i] = Math.random() * 0.2 + 0.1;

      // Random colors between green and purple
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0.22; // R
        colors[i3 + 1] = 1.0; // G
        colors[i3 + 2] = 0.078; // B
      } else {
        colors[i3] = 0.54; // R
        colors[i3 + 1] = 0.17; // G
        colors[i3 + 2] = 0.89; // B
      }
    }
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSizes, 1)
    );

    // Create particle texture from SVG
    const particleTexture = new THREE.TextureLoader().load("/circle.svg");

    // Create shader material for particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Handle window resize
    const handleResize = () => {
      if (!container) return;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles slowly
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Update orbital controls
      controls.update();

      // Render scene
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} relative`}
      style={{
        background:
          "radial-gradient(circle at center, #121212 0%, #080808 70%)",
      }}
    >
      {/* Particles will be added by Three.js */}

      {/* Add additional 2D elements/gradients */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#39FF14] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#8A2BE2] opacity-5 blur-3xl"></div>
    </div>
  );
}

export default Scene;
