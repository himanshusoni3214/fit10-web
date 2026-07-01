import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Mesh, Group } from 'three';

function MealBowl() {
  const bowl = useRef<Group>(null);
  const scan = useRef<Mesh>(null);

  useFrame((state) => {
    if (bowl.current) {
      bowl.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
      bowl.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
    }
    if (scan.current) {
      scan.current.rotation.z = state.clock.elapsedTime * 0.55;
    }
  });

  return (
    <group ref={bowl} position={[-1.15, -0.25, 0]} rotation={[0.06, -0.25, 0]}>
      <mesh position={[0, -0.34, 0]} scale={[2.55, 0.42, 1.55]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshStandardMaterial color="#d8d1bd" roughness={0.58} metalness={0.06} />
      </mesh>
      <mesh position={[0, -0.12, 0]} scale={[2.15, 0.18, 1.18]}>
        <sphereGeometry args={[1, 64, 16]} />
        <meshStandardMaterial color="#0b1612" roughness={0.8} />
      </mesh>
      <mesh position={[-0.72, 0.08, -0.05]} scale={[0.78, 0.12, 0.46]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#eadcb8" roughness={0.72} />
      </mesh>
      <mesh position={[0.55, 0.12, -0.05]} rotation={[0.05, 0.15, -0.1]} scale={[0.72, 0.14, 0.52]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c57d42" roughness={0.62} />
      </mesh>
      <mesh position={[0.18, 0.28, -0.38]} scale={[0.34, 0.34, 0.34]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#32c675" roughness={0.5} />
      </mesh>
      <mesh position={[0.7, 0.2, -0.35]} scale={[0.28, 0.28, 0.28]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#85d952" roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.22, -0.4]} scale={[0.26, 0.26, 0.26]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#e74738" roughness={0.5} />
      </mesh>
      <mesh ref={scan} position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[2.65, 1.45, 1]}>
        <torusGeometry args={[0.72, 0.012, 16, 160]} />
        <meshBasicMaterial color="#15c77a" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

function DataParticles() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const t = (state.clock.elapsedTime * 0.42 + index * 0.16) % 1;
      child.position.x = -0.2 + t * 2.35;
      child.position.y = 0.3 + Math.sin(t * Math.PI) * 0.4 + index * 0.025;
      child.position.z = 0.55 - t * 0.3;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: 13 }).map((_, index) => (
        <mesh key={index} position={[-0.1, 0.3, 0.4]} scale={0.045}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#28e98b" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneModel() {
  const phone = useRef<Group>(null);
  useFrame((state) => {
    if (phone.current) phone.current.position.y = Math.sin(state.clock.elapsedTime * 0.75) * 0.055;
  });
  return (
    <group ref={phone} position={[1.65, -0.05, 0.08]} rotation={[0.03, -0.32, 0.04]}>
      <RoundedBox args={[1.18, 2.34, 0.12]} radius={0.15} smoothness={8}>
        <meshStandardMaterial color="#050910" roughness={0.35} metalness={0.4} />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0.075]} args={[1.03, 2.15, 0.035]} radius={0.12} smoothness={8}>
        <meshBasicMaterial color="#07101a" />
      </RoundedBox>
      <RoundedBox position={[0, 0.98, 0.1]} args={[0.36, 0.08, 0.035]} radius={0.04} smoothness={6}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, 5.2]} fov={42} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 5]} intensity={2.6} />
      <pointLight position={[0, 0.7, 2]} intensity={3} color="#15c77a" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
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
    gsap.fromTo(ref.current.querySelectorAll('.scan-ui-row'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, repeat: -1, repeatDelay: 2.4, yoyo: true });
  }, []);
  return (
    <div className="r3f-phone-ui" ref={ref}>
      <span>Lunch detected</span>
      <h3>Chicken Bowl</h3>
      <div className="scan-ui-kcal">620 <small>kcal</small></div>
      <div className="scan-ui-row"><b>Protein</b><strong>38g</strong></div>
      <div className="scan-ui-row"><b>Fiber</b><strong>11g</strong></div>
      <div className="scan-ui-row"><b>Ingredients</b><strong>7</strong></div>
      <div className="scan-warning">Not connected to your history</div>
    </div>
  );
}

export default function ChapterOneR3F() {
  return (
    <div className="r3f-hero-stage">
      <div className="r3f-canvas-wrap">
        <Canvas dpr={[1, 1.7]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Scene />
        </Canvas>
      </div>
      <div className="r3f-scan-badge">AI scanning</div>
      <PhoneOverlay />
      <div className="r3f-flow"><span>You eat</span><i /> <span>AI understands</span><i /> <span>Not connected</span><i /> <span>Progress disappears</span></div>
    </div>
  );
}
