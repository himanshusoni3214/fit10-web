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

function MealLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <g className="meal-callout">
      <circle cx={x} cy={y} r="22" fill="rgba(3,12,10,.72)" stroke="#b8f7cd" strokeWidth="2" />
      <text x={x} y={y + 7} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="900">{children}</text>
    </g>
  );
}

function VectorMeal() {
  const quinoa = Array.from({ length: 70 }).map((_, i) => {
    const x = 390 + (i % 10) * 16 + (i % 2) * 4;
    const y = 540 + Math.floor(i / 10) * 13 + (i % 3) * 3;
    return <circle key={i} cx={x} cy={y} r={(i % 3) + 2.1} fill={i % 4 === 0 ? '#9d392f' : '#f2dfb6'} opacity="0.9" />;
  });

  return (
    <svg className="vector-meal reference-meal" viewBox="0 0 820 820" role="img" aria-label="transparent illustrated nutrition bowl">
      <defs>
        <radialGradient id="plate" cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.72" stopColor="#eef2f2" />
          <stop offset="1" stopColor="#b7bec8" />
        </radialGradient>
        <linearGradient id="chickenSlice" x1="0" x2="1"><stop offset="0" stopColor="#ffbe83" /><stop offset="1" stopColor="#e27a3d" /></linearGradient>
        <linearGradient id="potato" x1="0" x2="1"><stop offset="0" stopColor="#ff9d2f" /><stop offset="1" stopColor="#ce5f26" /></linearGradient>
        <linearGradient id="avoSlice" x1="0" x2="1"><stop offset="0" stopColor="#e7f878" /><stop offset="0.5" stopColor="#8ed94b" /><stop offset="1" stopColor="#287f37" /></linearGradient>
        <filter id="mealDrop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="28" stdDeviation="22" floodColor="#000" floodOpacity="0.55" /></filter>
        <filter id="foodDrop" x="-35%" y="-35%" width="170%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="4" floodColor="#000" floodOpacity="0.22" /></filter>
        <clipPath id="plateClip"><circle cx="410" cy="410" r="335" /></clipPath>
      </defs>

      <g filter="url(#mealDrop)">
        <circle cx="410" cy="410" r="352" fill="url(#plate)" />
        <circle cx="410" cy="410" r="326" fill="#f8fafb" stroke="#d6dce4" strokeWidth="10" />
        <g clipPath="url(#plateClip)" filter="url(#foodDrop)">
          <path d="M188 272 C243 198 317 180 392 218 C363 287 260 326 188 272Z" fill="#ffe6c8" />
          {[0,1,2,3,4,5].map((i) => (
            <g key={i} transform={`translate(${186 + i * 38} ${250 - i * 12}) rotate(${i * 3 - 12})`}>
              <path d="M0 0 C24-36 72-24 82 20 C48 44 13 35 0 0Z" fill="url(#chickenSlice)" stroke="#9b4d2c" strokeWidth="3" />
              <path d="M16 8 C34 0 54 2 70 14" fill="none" stroke="#ffdfbd" strokeWidth="5" opacity=".75" />
              <circle cx="31" cy="12" r="3" fill="#8b3c22" opacity=".55" />
            </g>
          ))}

          <g>
            {[0,1,2].map((i) => (
              <g key={i} transform={`translate(${372 + i * 72} ${146 + (i % 2) * 28}) rotate(${i * 10 - 8})`}>
                <ellipse cx="0" cy="0" rx="38" ry="64" fill="#fff8df" stroke="#c9b986" strokeWidth="4" />
                <ellipse cx="0" cy="10" rx="22" ry="30" fill="#ffc53d" />
              </g>
            ))}
            {[0,1].map((i) => (
              <g key={`half-${i}`} transform={`translate(${320 + i * 82} 352) rotate(${i ? -15 : 18})`}>
                <ellipse cx="0" cy="0" rx="42" ry="64" fill="#fff8df" stroke="#c9b986" strokeWidth="4" />
                <ellipse cx="0" cy="12" rx="24" ry="30" fill="#ffc53d" />
              </g>
            ))}
          </g>

          <g>
            {[0,1,2,3,4,5,6,7,8,9].map((i) => {
              const col = i % 3 === 0 ? '#8b4c85' : 'url(#potato)';
              return <rect key={i} x={535 + (i % 4) * 56} y={170 + Math.floor(i / 4) * 54} width="52" height="52" rx="10" fill={col} stroke="#8f3f22" strokeWidth="3" transform={`rotate(${i * 11} ${560 + (i % 4) * 56} ${196 + Math.floor(i / 4) * 54})`} />;
            })}
          </g>

          <g>
            {[0,1,2,3,4].map((i) => (
              <path key={i} d="M0 0 C34-82 90-112 132-72 C99 7 52 45 0 0Z" fill="url(#avoSlice)" stroke="#2a7b36" strokeWidth="4" transform={`translate(${184 + i * 38} ${590 - i * 18}) rotate(${i * 7 - 18})`} />
            ))}
          </g>

          <g>
            <path d="M360 365 C414 292 500 306 536 382 C478 436 400 431 360 365Z" fill="#1f7a37" />
            <path d="M430 345 C500 285 590 330 592 420 C520 465 452 430 430 345Z" fill="#4f9d3a" />
            <path d="M340 392 C398 326 472 348 495 428 C430 472 360 452 340 392Z" fill="#72be57" />
            <path d="M412 330 L452 460 M365 390 C418 380 468 382 520 405 M438 354 C477 344 530 358 570 398" stroke="#a6d782" strokeWidth="5" fill="none" opacity=".7" />
          </g>

          <g>
            {[0,1,2,3].map((i) => <circle key={i} cx={592 + (i % 2) * 62} cy={476 + Math.floor(i / 2) * 58} r="26" fill="#ef3f2e" stroke="#9e2e22" strokeWidth="4" />)}
            <path d="M585 452 C642 430 696 458 724 506" stroke="#298a3e" strokeWidth="5" fill="none" />
          </g>

          <g>
            {[0,1,2,3,4].map((i) => (
              <g key={i} transform={`translate(${622 + (i % 2) * 70} ${375 + Math.floor(i / 2) * 55}) rotate(${i * 18})`}>
                <path d="M0 0 C8-43 54-57 78-22 C68 24 18 38 0 0Z" fill="#5bbd43" />
                <circle cx="22" cy="-14" r="18" fill="#76d856" /><circle cx="46" cy="-16" r="17" fill="#65c94d" /><circle cx="57" cy="4" r="16" fill="#4faf3e" />
              </g>
            ))}
          </g>

          <path d="M360 545 C440 494 530 520 575 612 C486 674 384 651 360 545Z" fill="#f0e0bb" />
          <g>{quinoa}</g>
          <g fill="#b4763e">
            {[0,1,2,3,4,5,6,7,8].map((i) => <path key={i} d="M0 0 C16-14 38-6 38 12 C24 28 3 23 0 0Z" transform={`translate(${390 + (i % 4) * 50} ${578 + Math.floor(i / 4) * 34}) rotate(${i * 27})`} />)}
          </g>
        </g>
        <circle cx="410" cy="410" r="352" fill="none" stroke="#eef4ff" strokeWidth="16" opacity=".88" />
      </g>

      <ellipse className="meal-scan-ring" cx="410" cy="410" rx="350" ry="126" fill="none" stroke="#20d884" strokeWidth="7" opacity="0.95" />
      <line className="meal-scan-line" x1="410" y1="105" x2="410" y2="725" stroke="#20d884" strokeWidth="7" strokeLinecap="round" opacity="0.76" />
      <MealLabel x={248} y={286}>P</MealLabel>
      <MealLabel x={310} y={590}>F</MealLabel>
      <MealLabel x={610} y={265}>C</MealLabel>
      <g className="meal-callout"><rect x="640" y="455" width="112" height="42" rx="18" fill="rgba(3,12,10,.72)" stroke="#b8f7cd" strokeWidth="2" /><text x="696" y="483" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="900">Veggies</text></g>
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
      <h3>Performance Bowl</h3>
      <div className="scan-ui-kcal">620 <small>kcal</small></div>
      <div className="scan-ui-row"><b>Protein</b><strong>38g</strong></div>
      <div className="scan-ui-row"><b>Fiber</b><strong>11g</strong></div>
      <div className="scan-ui-row"><b>Ingredients</b><strong>11 found</strong></div>
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
