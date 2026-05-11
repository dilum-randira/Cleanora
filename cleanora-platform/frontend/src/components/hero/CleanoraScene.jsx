import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import FloatingSparkles from './FloatingSparkles.jsx';

function SprayBottle({ reducedMotion }) {
  const bottleRef = useRef();

  useFrame((state, delta) => {
    if (!bottleRef.current || reducedMotion) {
      return;
    }

    bottleRef.current.rotation.y += delta * 0.32;
    bottleRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
  });

  return (
    <group ref={bottleRef} position={[0.25, 0.15, 0]} rotation={[0.02, -0.45, 0.02]}>
      <mesh castShadow receiveShadow position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.34, 0.42, 1.45, 32]} />
        <meshStandardMaterial color="#eef8f7" roughness={0.38} metalness={0.04} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.36, 24]} />
        <meshStandardMaterial color="#2ec4b6" roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0.18, 0.82, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.76, 0.18, 0.22]} />
        <meshStandardMaterial color="#14213d" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0.58, 0.78, 0]}>
        <boxGeometry args={[0.22, 0.1, 0.16]} />
        <meshStandardMaterial color="#3a86ff" roughness={0.35} />
      </mesh>
      <mesh castShadow position={[-0.04, 0.1, 0.345]}>
        <boxGeometry args={[0.48, 0.62, 0.035]} />
        <meshStandardMaterial color="#ffffff" roughness={0.28} />
      </mesh>
      <mesh position={[-0.04, 0.1, 0.37]}>
        <boxGeometry args={[0.34, 0.12, 0.02]} />
        <meshStandardMaterial color="#2ec4b6" roughness={0.3} />
      </mesh>
    </group>
  );
}

function BubbleCluster({ reducedMotion }) {
  const clusterRef = useRef();

  const bubbles = useMemo(
    () => [
      [-1.25, 0.18, 0.3, 0.22],
      [-1.55, 0.65, -0.2, 0.15],
      [-0.95, 0.95, -0.35, 0.18],
      [1.35, 0.35, 0.25, 0.2],
      [1.6, 0.85, -0.3, 0.14],
      [0.95, 1.15, 0.4, 0.16],
      [0.1, 1.55, -0.45, 0.12],
      [-0.45, 1.28, 0.45, 0.11]
    ],
    []
  );

  useFrame((state) => {
    if (!clusterRef.current || reducedMotion) {
      return;
    }

    clusterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <group ref={clusterRef}>
      {bubbles.map(([x, y, z, radius], index) => (
        <Float
          key={`${x}-${y}-${index}`}
          speed={reducedMotion ? 0 : 1.1 + index * 0.08}
          rotationIntensity={reducedMotion ? 0 : 0.25}
          floatIntensity={reducedMotion ? 0 : 0.28}
        >
          <mesh position={[x, y, z]} castShadow>
            <sphereGeometry args={[radius, 20, 20]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#dff8f5' : '#ffffff'}
              transparent
              opacity={0.72}
              roughness={0.12}
              metalness={0.02}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CleanoraScene({ reducedMotion = false }) {
  const platformRef = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    state.camera.position.x += (Math.sin(state.clock.elapsedTime * 0.22) * 0.18 - state.camera.position.x) * delta;
    state.camera.lookAt(0, 0.18, 0);

    if (platformRef.current) {
      platformRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.025;
    }
  });

  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight
        castShadow
        position={[3.5, 5, 4]}
        intensity={2.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 2.5, 2]} intensity={0.7} color="#2ec4b6" />

      <group ref={platformRef}>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
          <planeGeometry args={[7, 5.4]} />
          <meshStandardMaterial color="#f8fbfb" roughness={0.78} />
        </mesh>
        <mesh receiveShadow position={[0, -0.96, -1.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[4.6, 0.08, 1.4]} />
          <meshStandardMaterial color="#eef8f7" roughness={0.7} />
        </mesh>
        <mesh receiveShadow position={[-1.8, -0.64, -0.85]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[1.1, 0.12, 0.55]} />
          <meshStandardMaterial color="#ffffff" roughness={0.45} />
        </mesh>
      </group>

      <SprayBottle reducedMotion={reducedMotion} />
      <BubbleCluster reducedMotion={reducedMotion} />
      <FloatingSparkles reducedMotion={reducedMotion} count={reducedMotion ? 18 : 42} />
      <ContactShadows position={[0, -1.02, 0]} opacity={0.28} scale={6} blur={2.4} far={2.6} />
    </>
  );
}

export default CleanoraScene;
