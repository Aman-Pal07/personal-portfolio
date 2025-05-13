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

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add cyberpunk colored point lights
    const greenPointLight = new THREE.PointLight(0x39ff14, 3, 10);
    greenPointLight.position.set(2, 2, 2);
    scene.add(greenPointLight);

    const purplePointLight = new THREE.PointLight(0x8a2be2, 2, 10);
    purplePointLight.position.set(-2, 1, -1);
    scene.add(purplePointLight);

    const bluePointLight = new THREE.PointLight(0x00bfff, 1, 10);
    bluePointLight.position.set(0, -2, 2);
    scene.add(bluePointLight);

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
    loader.load(
      "/models/scene.gltf", // Path relatives to the public folder
      (gltf) => {
        const model = gltf.scene;

        // Scale and position the model
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, -1, 0);
        model.rotation.set(0, Math.PI / 4, 0);

        // Apply materials if needed
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Make screen emissive
            if (child.name.includes("screen")) {
              child.material.emissive = new THREE.Color(0x39ff14);
              child.material.emissiveIntensity = 0.8;
            }

            // Add reflections
            if (child.material) {
              child.material.needsUpdate = true;
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

        // Fallback: Create a simple placeholder cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: 0x39ff14,
          emissive: 0x39ff14,
          emissiveIntensity: 0.2,
          metalness: 0.7,
          roughness: 0.2,
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
      }
    );

    // Create animated particle system for background effects
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Position particles in a sphere around the center
      particlePositions[i3] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Random sizes
      particleSizes[i] = Math.random() * 0.1 + 0.05;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSizes, 1)
    );

    // Create shader material for particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      color: 0x39ff14,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
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
