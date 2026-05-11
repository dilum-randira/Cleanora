import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function FloatingSparkles({ reducedMotion = false, count = 42 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 5.2;
      values[index * 3 + 1] = Math.random() * 3.2 - 0.6;
      values[index * 3 + 2] = (Math.random() - 0.5) * 3.8;
    }

    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x = Math.sin(pointsRef.current.rotation.y) * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#2ec4b6"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

export default FloatingSparkles;
