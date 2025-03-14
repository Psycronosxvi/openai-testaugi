import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, GradientTexture, OrbitControls, Stars } from '@react-three/drei';
import { ShootingStar } from './ShootingStar';
import * as THREE from 'three';

function SpaceBackground() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function HyperSphere({ isResponding }: { isResponding: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [colorPhase, setColorPhase] = useState(0);
  const [isUnderAttack, setIsUnderAttack] = useState(false);
  const [defenseActive, setDefenseActive] = useState(false);
  
  const colors = useMemo(() => [
    new THREE.Color('#FF1B6B'),
    new THREE.Color('#00E5FF'),
    new THREE.Color('#A742FF'),
    new THREE.Color('#FFB800')
  ], []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.3;
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.2;

      const scale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);

      setColorPhase((prev) => (prev + 0.005) % 1);
    }
  });

  const currentColor = useMemo(() => {
    const colorIndex = Math.floor(colorPhase * colors.length);
    const nextColorIndex = (colorIndex + 1) % colors.length;
    const t = (colorPhase * colors.length) % 1;
    
    const color = new THREE.Color();
    color.lerpColors(colors[colorIndex], colors[nextColorIndex], t);
    return color;
  }, [colorPhase, colors]);

  useEffect(() => {
    // Simulate being under attack
    setTimeout(() => {
      setIsUnderAttack(true);
      
      // Activate defense after 2 seconds
      setTimeout(() => {
        setDefenseActive(true);
        setIsUnderAttack(false);
        
        // Return to normal state after defense
        setTimeout(() => {
          setDefenseActive(false);
        }, 2000);
      }, 2000);
    }, 1000);

  }, []);

  const sphereColor = useMemo(() => {
    if (isUnderAttack) return new THREE.Color('#FF1B6B');
    if (defenseActive) return new THREE.Color('#00FF00');
    return currentColor;
  }, [isUnderAttack, defenseActive, currentColor]);

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        color={sphereColor}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.2}
        roughness={0.3}
        distort={isUnderAttack ? 0.6 : defenseActive ? 0.4 : 0.2}
        speed={isUnderAttack ? 6 : defenseActive ? 4 : 2}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#FF1B6B', '#00E5FF', '#A742FF']}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
}

function Grid() {
  return (
    <gridHelper
      args={[30, 30, '#FF1B6B', '#FF1B6B']}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export function AugiVisual() {
  const [isResponding, setIsResponding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsResponding(true);
      setTimeout(() => setIsResponding(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-black rounded-lg overflow-hidden relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2.5}
            castShadow
          />
          <SpaceBackground />
          <Grid />
          <ShootingStar />
          <HyperSphere isResponding={isResponding} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#2A2B3F] px-3 py-1 rounded-full">
          <div className={`w-2 h-2 rounded-full ${isResponding ? 'bg-[#FF1B6B] animate-pulse' : 'bg-[#00E5FF]'}`} />
          <span className="text-sm text-white">{isResponding ? 'Processing' : 'Ready'}</span>
        </div>
      </div>
    </div>
  );
}