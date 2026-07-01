import * as THREE from 'three';

export interface GridConfig {
  size: number;
  resolution: number;
  height: number;
}

export function generateGridGeometry(config: GridConfig): THREE.BufferGeometry {
  const { size, resolution, height } = config;
  
  const geometry = new THREE.PlaneGeometry(
    size,
    size,
    resolution - 1,
    resolution - 1
  );
  
  const position = geometry.attributes.position;
  
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * height;
    position.setZ(i, z);
  }
  
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  
  return geometry;
}

export function updateGridHeight(
  geometry: THREE.BufferGeometry,
  time: number,
  config: GridConfig
): void {
  const position = geometry.attributes.position;
  
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * config.height;
    position.setZ(i, z);
  }
  
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}