import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createNoise2D } from 'simplex-noise'; 
import * as THREE from 'three';
import { useControls } from 'leva';

const noise2D = createNoise2D();

export function Grid3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { gridSize, amplitude, frequency, speed } = useControls('Grid', {
    gridSize: { value: 50, min: 10, max: 100, step: 1 },
    amplitude: { value: 2, min: 0, max: 5, step: 0.1 },
    frequency: { value: 0.1, min: 0.01, max: 0.5, step: 0.01 },
    speed: { value: 0.5, min: 0, max: 2, step: 0.1 },
  });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, gridSize, gridSize);
    return geo;
  }, [gridSize]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime() * speed;
    const position = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      const z = noise2D(x * frequency + time, y * frequency + time) * amplitude;
      position.setZ(i, z);
    }
    
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#00F5D4"
        wireframe
        side={THREE.DoubleSide}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}