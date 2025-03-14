import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Sphere, Html, OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Region {
  name: string;
  position: [number, number, number];
  color: string;
}

const brainDefinitions = {
  Cortex: 'The outer layer responsible for higher functions like perception, reasoning, and decision-making.',
  'Prefrontal Cortex': 'Associated with planning, personality, and decision-making.',
  Hippocampus: 'Critical for memory formation and spatial navigation.',
  Amygdala: 'Part of the limbic system, responsible for emotion and memory processing.',
  Cerebellum: 'Coordinates voluntary movements and balance.',
  Thalamus: 'The brain\'s relay station, sending sensory signals to correct areas.',
  'Medulla Oblongata': 'Responsible for autonomic functions like breathing and heart rate.',
  'Basal Ganglia': 'Involved in habit formation, motor control, and reward processing.',
  'Optic Nerve': 'Carries visual information from the eyes to the brain.',
  'Corpus Callosum': 'The bridge between hemispheres, enabling communication.'
};

const brainRegions = [
  { name: 'Cortex', position: [0, 3, 0], color: '#FFF000' },
  { name: 'Prefrontal Cortex', position: [3, 2, 0], color: '#FF00FF' },
  { name: 'Hippocampus', position: [-3, 1, 0], color: '#00FFFF' },
  { name: 'Amygdala', position: [0, -2, 0], color: '#FF6B6B' },
  { name: 'Cerebellum', position: [0, 0, 2], color: '#4DFF4D' },
  { name: 'Thalamus', position: [3, -2, 0], color: '#B4A7FF' },
  { name: 'Medulla Oblongata', position: [-3, -3, 0], color: '#FFB74D' },
  { name: 'Basal Ganglia', position: [2, 0, -3], color: '#FF4DFF' },
  { name: 'Optic Nerve', position: [-2, 2, -3], color: '#4DFFFF' },
  { name: 'Corpus Callosum', position: [0, 2, -3], color: '#FF4DFF' }
];

function NeuralConnections({ regions }: { regions: Region[] }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const time = clock.getElapsedTime();
      materialRef.current.opacity = (Math.sin(time) + 1) / 4 + 0.25;
    }
  });

  // This approach doesn't use refs for the lines
  return (
    <group>
      {regions.map((region, i) => 
        regions.slice(i + 1).map((otherRegion, j) => (
          <Line
            key={`${i}-${j}`}
            points={[
              new THREE.Vector3(...region.position),
              new THREE.Vector3(...otherRegion.position)
            ]}
          >
            <lineBasicMaterial 
              ref={materialRef}
              attach="material"
              color="#00E5FF"
              transparent={true}
              opacity={0.4}
              linewidth={1}
            />
          </Line>
        ))
      )}
    </group>
  );
}

function BrainRegion({ 
  position, 
  color, 
  name, 
  isSelected, 
  onClick 
}: { 
  position: [number, number, number];
  color: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const { scale, intensity } = useSpring({
    scale: isSelected ? 1.2 : 1,
    intensity: isSelected ? 2 : 1,
    config: { tension: 300, friction: 10 }
  });

  const pulseSpring = useSpring({
    scale: isSelected ? [1, 1.2, 1] : [1, 1, 1],
    loop: isSelected,
    config: { duration: 1000 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
    }
  });

  return (
    <animated.mesh
      position={position}
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      scale={scale}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setShowTooltip(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setShowTooltip(false);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <Sphere args={[0.3, 32, 32]}>
        <animated.meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          transparent
          opacity={0.8}
        />
        <animated.meshPhongMaterial
          color={color}
          transparent
          opacity={0.2}
          scale={pulseSpring.scale}
        />
      </Sphere>
      <Html position={[0, 0.8, 0]} center distanceFactor={10}>
        {(showTooltip || isSelected) && (
          <div className="bg-[#232438]/95 text-white p-3 rounded-lg shadow-lg max-w-xs border border-[#00E5FF]/20">
            <div className="font-bold mb-1">{name}</div>
            <div className="text-sm text-gray-200">{brainDefinitions[name]}</div>
          </div>
        )}
      </Html>
    </animated.mesh>
  );
}

export function BrainVisualization({ 
  selectedRegion,
  onRegionSelect 
}: { 
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}) {
  const cameraRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={2.5} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <fog attach="fog" args={['#1A1B2E', 5, 20]} />
      <NeuralConnections regions={brainRegions} />
      <OrbitControls enableZoom={true} maxDistance={15} minDistance={5} />
      <group>
        {brainRegions.map((region) => (
          <BrainRegion
            key={region.name}
            position={region.position}
            color={region.color}
            name={region.name}
            isSelected={selectedRegion === region.name}
            onClick={() => onRegionSelect(region.name)}
          />
        ))}
      </group>
    </Canvas>
  );
}
