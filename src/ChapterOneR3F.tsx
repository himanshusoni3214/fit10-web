import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';

function DataParticles() {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const t = (state.clock.elapsedTime * 0.34 + index * 0.07) % 1;
      child.position.x = -1.75 + t * 3.1;
      child.position.y = -0.14 + Math.sin(t * Math.PI) * 0.48 + (index % 3) * 0.04;
      child.position.z = 0.46 - t * 0.16;
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

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.25, 4.9]} fov={38} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[2.5, 4.5, 3.8]} intensity={2.5} />
      <pointLight position={[-1.5, 0.2, 2.2]} intensity={2.7} color="#15c77a" />
      <Float speed={0.85} rotationIntensity={0.03} floatIntensity={0.12}>
        <DataParticles />
      </Float>
      <OrbitControls enabled={false} />
    </>
  );
}

function VectorMeal() {
  return (
    <div className="vector-meal photo-meal" aria-label="realistic healthy meal bowl being scanned">
      <div className="photo-meal-shadow" />
      <div className="photo-meal-plate">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=92"
          alt="Healthy meal bowl with vegetables, grains, avocado, and protein"
        />
      </div>
      <div className="photo-meal-rim" />
      <div className="photo-meal-scan-ring" />
      <div className="photo-meal-scan-line" />
      <div className="photo-meal-label protein">Protein</div>
      <div className="photo-meal-label fiber">Fiber</div>
      <div className="photo-meal-label micronutrients">Micros</div>
    </div>
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
      <h3>Healthy Power Bowl</h3>
      <div className="scan-ui-kcal">620 <small>kcal</small></div>
      <div className="scan-ui-row"><b>Protein</b><strong>38g</strong></div>
      <div className="scan-ui-row"><b>Fiber</b><strong>11g</strong></div>
      <div className="scan-ui-row"><b>Ingredients</b><strong>9 found</strong></div>
      <div className="scan-warning">Not connected to recipes, grocery, or health history</div>
    </div>
  );
}

function PhoneDevice() {
  return (
    <div className="r3f-phone-device" aria-label="Fit10X nutrition scan phone UI">
      <div className="r3f-phone-notch" />
      <PhoneOverlay />
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
      <PhoneDevice />
      <div className="r3f-flow"><span>You eat</span><i /> <span>AI understands</span><i /> <span>Not connected</span><i /> <span>Progress disappears</span></div>
    </div>
  );
}
