import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group, Mesh } from 'three';

function Leaf({ x, z, r = 0 }: { x: number; z: number; r?: number }) {
  return (
    <mesh position={[x, 0.22, z]} rotation={[-0.95, 0, r]} scale={[0.22, 0.035, 0.09]}>
      <sphereGeometry args={[1, 24, 12]} />
      <meshStandardMaterial color="#54d66f" roughness={0.62} />
    </mesh>
  );
}

function Tomato({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.29, z]} scale={0.13}>
      <sphereGeometry args={[1, 28, 18]} />
      <meshStandardMaterial color="#e94332" roughness={0.45} />
    </mesh>
  );
}

function Chicken({ x, z, r = 0 }: { x: number; z: number; r?: number }) {
  return (
    <RoundedBox position={[x, 0.26, z]} rotation={[0.12, r, -0.08]} args={[0.34, 0.14, 0.22]} radius={0.035} smoothness={4}>
      <meshStandardMaterial color="#d58a4d" roughness={0.72} />
    </RoundedBox>
  );
}

function Avocado({ x, z, r = 0 }: { x: number; z: number; r?: number }) {
  return (
    <mesh position={[x, 0.27, z]} rotation={[-0.75, 0, r]} scale={[0.18, 0.04, 0.32]}>
      <sphereGeometry args={[1, 32, 14]} />
      <meshStandardMaterial color="#7bd84d" roughness={0.58} />
    </mesh>
  );
}

function RiceBed() {
  return (
    <group>
      <mesh position={[-0.46, 0.21, 0.08]} scale={[0.75, 0.11, 0.43]}>
        <sphereGeometry args={[1, 42, 18]} />
        <meshStandardMaterial color="#f2e5c8" roughness={0.9} />
      </mesh>
      {Array.from({ length: 26 }).map((_, i) => {
        const x = -0.92 + (i % 7) * 0.14;
        const z = -0.1 + Math.floor(i / 7) * 0.12;
        return (
          <mesh key={i} position={[x, 0.32 + (i % 3) * 0.006, z]} rotation={[0.4, i * 0.4, 0]} scale={[0.035, 0.018, 0.018]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color="#fff2d3" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

function MealBowl() {
  const bowl = useRef<Group>(null);
  const scan = useRef<Mesh>(null);

  useFrame((state) => {
    if (bowl.current) {
      bowl.current.rotation.y = -0.42 + Math.sin(state.clock.elapsedTime * 0.34) * 0.08;
      bowl.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.04;
    }
    if (scan.current) scan.current.rotation.z = state.clock.elapsedTime * 0.48;
  });

  return (
    <group ref={bowl} position={[-1.35, -0.42, 0]} rotation={[0.2, -0.42, -0.02]}>
      <mesh position={[0, -0.18, 0]} scale={[1.75, 0.28, 1.16]}>
        <sphereGeometry args={[1, 80, 28]} />
        <meshStandardMaterial color="#ede7d5" roughness={0.5} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.03, 0]} scale={[1.44, 0.08, 0.9]}>
        <sphereGeometry args={[1, 80, 18]} />
        <meshStandardMaterial color="#14201b" roughness={0.88} />
      </mesh>
      <RiceBed />
      <Chicken x={0.42} z={0.05} r={0.18} />
      <Chicken x={0.68} z={-0.16} r={-0.24} />
      <Chicken x={0.27} z={-0.22} r={0.75} />
      <Tomato x={-0.24} z={-0.34} />
      <Tomato x={-0.46} z={-0.28} />
      <Tomato x={-0.04} z={-0.38} />
      <Avocado x={-0.35} z={0.45} r={-0.35} />
      <Avocado x={-0.14} z={0.47} r={-0.12} />
      <Avocado x={0.08} z={0.44} r={0.15} />
      <Leaf x={0.55} z={0.36} r={0.4} />
      <Leaf x={0.73} z={0.24} r={0.1} />
      <Leaf x={0.88} z={0.39} r={-0.45} />
      <Leaf x={0.58} z={-0.38} r={-0.3} />
      <Leaf x={0.78} z={-0.36} r={0.18} />
      <mesh ref={scan} position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[2.0, 1.15, 1]}>
        <torusGeometry args={[0.78, 0.012, 16, 160]} />
        <meshBasicMaterial color="#15c77a" transparent opacity={0.88} />
      </mesh>
    </group>
  );
}

function DataParticles() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const t = (state.clock.elapsedTime * 0.32 + index * 0.075) % 1;
      child.position.x = -0.82 + t * 2.15;
      child.position.y = -0.02 + Math.sin(t * Math.PI) * 0.5 + (index % 3) * 0.035;
      child.position.z = 0.5 - t * 0.16;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: 18 }).map((_, index) => (
        <mesh key={index} position={[-0.1, 0.3, 0.4]} scale={index % 4 === 0 ? 0.055 : 0.034}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={index % 4 === 0 ? '#9cff5e' : '#28e98b'} transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneModel() {
  const phone = useRef<Group>(null);
  useFrame((state) => {
    if (phone.current) phone.current.position.y = Math.sin(state.clock.elapsedTime * 0.62) * 0.045;
  });
  return (
    <group ref={phone} position={[1.48, -0.12, 0.02]} rotation={[0.02, -0.28, 0.02]}>
      <RoundedBox args={[1.06, 2.12, 0.14]} radius={0.18} smoothness={10}>
        <meshStandardMaterial color="#02050a" roughness={0.24} metalness={0.68} />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0.085]} args={[0.92, 1.92, 0.035]} radius={0.14} smoothness={10}>
        <meshBasicMaterial color="#06101b" />
      </RoundedBox>
      <RoundedBox position={[0, 0.88, 0.115]} args={[0.33, 0.07, 0.035]} radius={0.04} smoothness={6}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.28, 4.65]} fov={38} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[2.5, 4.5, 3.8]} intensity={2.7} />
      <pointLight position={[-1.5, 0.2, 2.2]} intensity={2.7} color="#15c77a" />
      <pointLight position={[2, 1, 1.4]} intensity={0.9} color="#ffffff" />
      <Float speed={0.85} rotationIntensity={0.04} floatIntensity={0.14}>
        <MealBowl />
        <DataParticles />
        <PhoneModel />
      </Float>
      <OrbitControls enabled={false} />
    </>
  );
}

function PhoneOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.scan-ui-row'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.16, repeat: -1, repeatDelay: 2.2, yoyo: true });
  }, []);
  return (
    <div className="r3f-phone-ui" ref={ref}>
      <span>Lunch detected</span>
      <h3>Chicken Power Bowl</h3>
      <div className="scan-ui-kcal">620 <small>kcal</small></div>
      <div className="scan-ui-row"><b>Protein</b><strong>38g</strong></div>
      <div className="scan-ui-row"><b>Fiber</b><strong>11g</strong></div>
      <div className="scan-ui-row"><b>Ingredients</b><strong>8 found</strong></div>
      <div className="scan-warning">Not connected to recipes, grocery, or health history</div>
    </div>
  );
}

export default function ChapterOneR3F() {
  return (
    <div className="r3f-hero-stage">
      <div className="r3f-canvas-wrap">
        <Canvas dpr={[1, 1.65]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Scene />
        </Canvas>
      </div>
      <div className="r3f-scan-badge">AI scanning</div>
      <PhoneOverlay />
      <div className="r3f-flow"><span>You eat</span><i /> <span>AI understands</span><i /> <span>Not connected</span><i /> <span>Progress disappears</span></div>
    </div>
  );
}
