import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';

function DataParticles() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const t = (state.clock.elapsedTime * 0.32 + index * 0.075) % 1;
      child.position.x = -1.45 + t * 2.9;
      child.position.y = -0.1 + Math.sin(t * Math.PI) * 0.45 + (index % 3) * 0.04;
      child.position.z = 0.45 - t * 0.16;
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
    <group ref={phone} position={[1.45, -0.13, 0.02]} rotation={[0.02, -0.25, 0.02]}>
      <RoundedBox args={[1.03, 2.08, 0.14]} radius={0.18} smoothness={10}>
        <meshStandardMaterial color="#02050a" roughness={0.24} metalness={0.68} />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0.085]} args={[0.9, 1.9, 0.035]} radius={0.14} smoothness={10}>
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
      <PerspectiveCamera makeDefault position={[0, 0.25, 4.9]} fov={38} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[2.5, 4.5, 3.8]} intensity={2.5} />
      <pointLight position={[-1.5, 0.2, 2.2]} intensity={2.7} color="#15c77a" />
      <Float speed={0.85} rotationIntensity={0.03} floatIntensity={0.12}>
        <DataParticles />
        <PhoneModel />
      </Float>
      <OrbitControls enabled={false} />
    </>
  );
}

function VectorMeal() {
  return (
    <svg className="vector-meal" viewBox="0 0 760 500" role="img" aria-label="premium illustrated healthy meal bowl">
      <defs>
        <radialGradient id="plateGlow" cx="50%" cy="42%" r="58%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#e6eee7" />
          <stop offset="1" stopColor="#a5b4aa" />
        </radialGradient>
        <radialGradient id="bowlInside" cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#1e352a" />
          <stop offset="1" stopColor="#07110d" />
        </radialGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="24" stdDeviation="22" floodColor="#000000" floodOpacity="0.55" />
        </filter>
        <filter id="foodShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#000000" floodOpacity="0.26" />
        </filter>
      </defs>
      <ellipse cx="342" cy="288" rx="292" ry="112" fill="url(#plateGlow)" filter="url(#softShadow)" />
      <ellipse cx="342" cy="252" rx="240" ry="88" fill="url(#bowlInside)" opacity="0.97" />
      <path d="M116 252c36 98 410 98 452 0" fill="none" stroke="#f4f0df" strokeWidth="56" strokeLinecap="round" opacity="0.92" />

      <g filter="url(#foodShadow)">
        <path d="M174 214c44-62 132-64 174-4-28 35-124 47-174 4z" fill="#f4dfb7" />
        <g fill="#fff1d1">
          <ellipse cx="220" cy="214" rx="13" ry="8" /><ellipse cx="246" cy="199" rx="12" ry="8" /><ellipse cx="276" cy="213" rx="12" ry="8" /><ellipse cx="303" cy="198" rx="11" ry="8" /><ellipse cx="330" cy="213" rx="12" ry="8" />
        </g>
        <path d="M365 195c63-34 127-20 151 34-52 23-124 24-151-34z" fill="#54d177" />
        <path d="M394 201c38-14 81-4 99 22-41 13-84 10-99-22z" fill="#8ee35d" opacity="0.9" />
        <path d="M264 270c24-74 76-103 137-75-16 76-73 104-137 75z" fill="#76d847" />
        <path d="M296 261c19-48 55-67 91-52-17 48-48 67-91 52z" fill="#b4ee79" opacity="0.85" />
        <g>
          <ellipse cx="207" cy="175" rx="28" ry="28" fill="#ef4637" />
          <ellipse cx="265" cy="160" rx="30" ry="30" fill="#ff5a43" />
          <ellipse cx="319" cy="178" rx="28" ry="28" fill="#e93e32" />
          <path d="M190 148c38-23 101-16 151 15" stroke="#6bd873" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M248 129c10 28 12 60 4 98" stroke="#41b85b" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        <g>
          <rect x="424" y="245" width="62" height="44" rx="13" fill="#d88b4a" />
          <rect x="498" y="227" width="74" height="48" rx="15" fill="#c5793d" />
          <rect x="444" y="203" width="70" height="48" rx="15" fill="#e0a45b" />
          <path d="M438 239c54 20 92 18 130-10" stroke="#9d5b30" strokeWidth="4" opacity="0.35" />
        </g>
        <g>
          <path d="M548 170c42 6 72 35 83 78-44 15-83 0-107-41z" fill="#69d46d" />
          <path d="M558 186c32 7 53 27 63 53-31 8-61-1-80-29z" fill="#b7f084" opacity="0.75" />
          <path d="M582 160c37-3 70 17 86 50-35 20-77 6-94-22z" fill="#2bbf6b" />
        </g>
        <g fill="#914bd8" opacity="0.95">
          <path d="M518 303c26-45 68-52 111-30-29 41-74 54-111 30z" />
          <path d="M554 312c25-24 55-28 91-12-29 22-59 29-91 12z" fill="#b869ef" />
        </g>
      </g>
      <ellipse className="meal-scan-ring" cx="344" cy="252" rx="282" ry="94" fill="none" stroke="#20d884" strokeWidth="6" opacity="0.9" />
      <line className="meal-scan-line" x1="350" y1="112" x2="350" y2="375" stroke="#20d884" strokeWidth="6" strokeLinecap="round" opacity="0.78" />
    </svg>
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
      <VectorMeal />
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
