import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create a subtle drifting particle field to represent data points
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  for(let i=0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 40;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4338ca" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export const Environment3D = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#000000', 10, 30]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#5eead4" />
        
        <Grid 
          position={[0, -2, 0]} 
          args={[40, 40]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#1e1e2f" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#312e81" 
          fadeDistance={30} 
          fadeStrength={1}
        />
        
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI/2 - 0.1}/>
      </Canvas>
      
      {/* Overlay gradient to blend UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 pointer-events-none" />
    </div>
  );
};
