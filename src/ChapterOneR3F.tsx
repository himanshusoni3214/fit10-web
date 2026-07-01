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
      child.position.x = -1.7 + t * 3.15;
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
  const grains = Array.from({ length: 52 }).map((_, i) => {
    const x = 190 + (i % 11) * 18 + (i % 2) * 5;
    const y = 222 + Math.floor(i / 11) * 15 + (i % 3) * 3;
    return <ellipse key={i} cx={x} cy={y} rx="7.5" ry="4" fill="#fff2d6" opacity="0.94" transform={`rotate(${(i * 27) % 120} ${x} ${y})`} />;
  });

  return (
    <svg className="vector-meal" viewBox="0 0 840 560" role="img" aria-label="premium vector healthy meal bowl">
      <defs>
        <radialGradient id="plateOuter" cx="43%" cy="38%" r="62%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.58" stopColor="#eef5ed" />
          <stop offset="1" stopColor="#a4b5aa" />
        </radialGradient>
        <radialGradient id="darkBowl" cx="48%" cy="38%" r="65%">
          <stop offset="0" stopColor="#20382c" />
          <stop offset="0.6" stopColor="#102119" />
          <stop offset="1" stopColor="#050d0a" />
        </radialGradient>
        <linearGradient id="salmon" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ffb26f" /><stop offset="1" stopColor="#d75d3d" /></linearGradient>
        <linearGradient id="avo" x1="0" x2="1"><stop offset="0" stopColor="#e6fb9b" /><stop offset="1" stopColor="#55c746" /></linearGradient>
        <linearGradient id="leaf" x1="0" x2="1"><stop offset="0" stopColor="#b7f689" /><stop offset="1" stopColor="#22aa63" /></linearGradient>
        <filter id="mealShadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="26" stdDeviation="20" floodColor="#000" floodOpacity="0.58" /></filter>
        <filter id="ingredientShadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#000" floodOpacity="0.24" /></filter>
        <clipPath id="mealClip"><ellipse cx="368" cy="286" rx="292" ry="164" /></clipPath>
      </defs>

      <ellipse cx="368" cy="308" rx="334" ry="184" fill="url(#plateOuter)" filter="url(#mealShadow)" />
      <ellipse cx="368" cy="286" rx="292" ry="154" fill="url(#darkBowl)" />
      <g clipPath="url(#mealClip)" filter="url(#ingredientShadow)">
        <path d="M116 270 C178 178 327 158 434 230 C371 320 226 345 116 270Z" fill="#f4dfb7" />
        <g>{grains}</g>

        <g>
          <path d="M420 180 C494 132 602 153 663 231 C579 282 470 270 420 180Z" fill="url(#leaf)" />
          <path d="M449 196 C509 164 583 181 624 232 C560 256 495 247 449 196Z" fill="#b7f084" opacity="0.78" />
          <path d="M470 208 C515 192 565 202 602 229" fill="none" stroke="#168a49" strokeWidth="7" opacity="0.42" />
        </g>

        <g>
          <path d="M288 350 C302 270 360 219 442 226 C430 322 366 376 288 350Z" fill="url(#avo)" />
          <path d="M319 333 C336 279 373 251 424 251 C405 309 370 338 319 333Z" fill="#f1f0a2" opacity="0.6" />
          <path d="M331 345 C355 295 384 260 428 234" stroke="#39a948" strokeWidth="7" fill="none" opacity="0.5" />
          <path d="M245 360 C259 291 302 242 370 236 C362 320 310 371 245 360Z" fill="#70d94a" opacity=".95" />
        </g>

        <g>
          <ellipse cx="228" cy="178" rx="34" ry="34" fill="#f04437" />
          <ellipse cx="288" cy="158" rx="38" ry="38" fill="#ff5a43" />
          <ellipse cx="352" cy="182" rx="34" ry="34" fill="#e93e32" />
          <ellipse cx="295" cy="211" rx="25" ry="25" fill="#ff624d" />
          <path d="M212 137 C265 109 346 119 404 164" stroke="#65d870" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M297 111 C312 158 308 213 288 255" stroke="#36aa56" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="280" cy="148" r="8" fill="#ffb8a9" opacity="0.65" />
        </g>

        <g>
          <path d="M475 245 C525 199 609 208 658 265 C609 330 520 327 475 245Z" fill="url(#salmon)" />
          <path d="M504 237 C548 224 607 238 634 271" stroke="#fae1bb" strokeWidth="11" opacity="0.78" fill="none" />
          <path d="M493 279 C540 304 600 297 643 263" stroke="#9e3e2f" strokeWidth="5" opacity="0.35" fill="none" />
          <circle cx="530" cy="260" r="5" fill="#2b1b12" opacity=".35" /><circle cx="569" cy="281" r="4" fill="#2b1b12" opacity=".32" /><circle cx="600" cy="252" r="4" fill="#2b1b12" opacity=".32" />
        </g>

        <g>
          <path d="M612 152 C670 157 714 196 731 256 C670 278 614 250 584 196Z" fill="#62d36b" />
          <path d="M631 176 C672 184 701 211 715 245 C673 255 633 236 608 205Z" fill="#bcf08b" opacity="0.75" />
          <path d="M667 141 C720 134 765 161 790 211 C739 242 681 214 657 177Z" fill="#29bf6a" />
          <path d="M639 188 C670 203 698 224 714 252 M677 160 C716 177 750 194 781 215" stroke="#168a49" strokeWidth="6" opacity="0.38" fill="none" />
        </g>

        <g>
          <path d="M548 370 C580 312 648 295 725 328 C678 389 608 406 548 370Z" fill="#914bd8" />
          <path d="M594 382 C628 346 678 337 738 360 C691 397 638 408 594 382Z" fill="#b869ef" />
          <path d="M575 358 C627 347 678 348 725 356" stroke="#6c32a7" strokeWidth="5" opacity="0.45" />
        </g>
      </g>

      <ellipse cx="368" cy="286" rx="308" ry="174" fill="none" stroke="rgba(255,255,255,.34)" strokeWidth="14" opacity="0.75" />
      <ellipse className="meal-scan-ring" cx="368" cy="286" rx="322" ry="132" fill="none" stroke="#20d884" strokeWidth="6" opacity="0.95" />
      <line className="meal-scan-line" x1="368" y1="112" x2="368" y2="455" stroke="#20d884" strokeWidth="6" strokeLinecap="round" opacity="0.78" />
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
      <h3>Salmon Avocado Bowl</h3>
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
