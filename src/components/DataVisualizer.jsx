import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#a855f7'];
const VALUES  = [72, 85, 78, 91, 88, 95, 90, 97];
const LABELS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];

function Bar({ position, height, color, label, index }) {
  const meshRef = useRef();
  const targetH = height;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const cur = meshRef.current.scale.y;
    meshRef.current.scale.y = THREE.MathUtils.lerp(cur, targetH, delta * 3);
    meshRef.current.position.y = meshRef.current.scale.y / 2 - 0.05;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} scale={[1, 0.01, 1]} castShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <Text
        position={[0, -0.35, 0.3]}
        fontSize={0.22}
        color="#1e1b4b"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {label}
      </Text>
    </group>
  );
}

function WavePlane() {
  const meshRef = useRef();
  const geo = useMemo(() => new THREE.PlaneGeometry(12, 3, 80, 20), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.8 + t * 1.5) * 0.18 +
        Math.sin(x * 1.5 + t * 2.0) * 0.10 +
        Math.sin(y * 1.2 + t * 1.2) * 0.08;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <meshStandardMaterial
        color="#6366f1"
        emissive="#818cf8"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <WavePlane />
      {VALUES.map((val, i) => (
        <Bar
          key={i}
          index={i}
          position={[(i - 3.5) * 0.85, 0, 0]}
          height={(val / 100) * 2.5}
          color={COLORS[i % COLORS.length]}
          label={LABELS[i]}
        />
      ))}
    </group>
  );
}

export default function DataVisualizer() {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-xs tracking-widest uppercase font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          Model Performance — 3D View
        </span>
        <span className="text-indigo-400 font-mono text-xs animate-pulse">● LIVE</span>
      </div>

      {/* 3D Canvas */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-indigo-200/40 shadow-lg shadow-indigo-200/20"
        style={{ height: '280px', background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #ecfeff 100%)' }}
      >
        <Canvas
          camera={{ position: [0, 3.5, 7], fov: 45 }}
          shadows
          gl={{ antialias: true }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <pointLight position={[-4, 4, 4]} color="#6366f1" intensity={1.5} />
          <pointLight position={[4, 4, -4]} color="#06b6d4" intensity={1.0} />
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Accuracy', value: '97.2%', color: 'from-indigo-500 to-violet-500' },
          { label: 'F1 Score', value: '0.963', color: 'from-cyan-500 to-blue-500' },
          { label: 'AUC-ROC', value: '0.991', color: 'from-violet-500 to-pink-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-indigo-100 bg-white/80 backdrop-blur-sm p-3 text-center shadow-sm">
            <p className={`font-mono font-bold text-base bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
            <p className="text-slate-400 font-mono text-[10px] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
