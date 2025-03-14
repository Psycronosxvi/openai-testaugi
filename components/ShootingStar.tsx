import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ShootingStar() {
  const starRef = useRef<THREE.Points>(null);
  const trailRef = useRef<THREE.Points>(null);

  // Create star geometry
  const starGeometry = new THREE.BufferGeometry();
  const starPosition = new Float32Array([
    Math.random() * 100 - 50, // x
    30,                       // y
    Math.random() * 50 - 25   // z
  ]);
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPosition, 3));

  // Create trail geometry
  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(30); // 10 points * 3 coordinates
  for (let i = 0; i < 10; i++) {
    trailPositions[i * 3] = starPosition[0];     // x
    trailPositions[i * 3 + 1] = starPosition[1]; // y
    trailPositions[i * 3 + 2] = starPosition[2]; // z
  }
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));

  useFrame(() => {
    if (!starRef.current || !trailRef.current) return;

    const speed = 0.5;
    
    // Update star position
    const position = starRef.current.geometry.attributes.position;
    const posArray = position.array as Float32Array;
    posArray[0] -= speed; // Move left
    posArray[1] -= speed; // Move down
    position.needsUpdate = true;

    // Update trail
    const trailPosition = trailRef.current.geometry.attributes.position;
    const trailArray = trailPosition.array as Float32Array;
    
    // Shift trail positions
    for (let i = trailPosition.count - 1; i > 0; i--) {
      trailArray[i * 3] = trailArray[(i - 1) * 3];
      trailArray[i * 3 + 1] = trailArray[(i - 1) * 3 + 1];
      trailArray[i * 3 + 2] = trailArray[(i - 1) * 3 + 2];
    }
    
    // Update first trail point to current star position
    trailArray[0] = posArray[0];
    trailArray[1] = posArray[1];
    trailArray[2] = posArray[2];
    trailPosition.needsUpdate = true;

    // Reset position when off screen
    if (posArray[0] < -50 || posArray[1] < -30) {
      // Reset star
      posArray[0] = Math.random() * 100 - 50;
      posArray[1] = 30;
      posArray[2] = Math.random() * 50 - 25;
      position.needsUpdate = true;

      // Reset trail
      for (let i = 0; i < trailPosition.count; i++) {
        trailArray[i * 3] = posArray[0];
        trailArray[i * 3 + 1] = posArray[1];
        trailArray[i * 3 + 2] = posArray[2];
      }
      trailPosition.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={starRef} geometry={starGeometry}>
        <pointsMaterial
          size={0.5}
          color="#00E5FF"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <points ref={trailRef} geometry={trailGeometry}>
        <pointsMaterial
          size={0.3}
          color="#ffffff"
          transparent
          opacity={0.2}
          sizeAttenuation
        />
      </points>
    </group>
  );
}