import * as THREE from 'three';

export interface ColorConfig {
  baseColor: string;
  accentColor: string;
  intensity: number;
}

export function createGradientMaterial(config: ColorConfig): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(config.baseColor) },
      accentColor: { value: new THREE.Color(config.accentColor) },
      intensity: { value: config.intensity }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 baseColor;
      uniform vec3 accentColor;
      uniform float intensity;
      varying vec2 vUv;
      
      void main() {
        vec3 color = mix(baseColor, accentColor, vUv.y * intensity);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true
  });
}

export function interpolateColors(
  value: number,
  min: number,
  max: number,
  colors: string[]
): string {
  const normalizedValue = (value - min) / (max - min);
  const index = Math.floor(normalizedValue * (colors.length - 1));
  const remainder = normalizedValue * (colors.length - 1) - index;
  
  if (index >= colors.length - 1) return colors[colors.length - 1];
  
  const color1 = new THREE.Color(colors[index]);
  const color2 = new THREE.Color(colors[index + 1]);
  
  color1.lerp(color2, remainder);
  
  return `#${color1.getHexString()}`;
}