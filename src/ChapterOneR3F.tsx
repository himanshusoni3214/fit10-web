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
  const grains = Array.from({ length: 38 }).map((_, i) => {
    const x = 224 + (i % 9) * 18 + (i % 2) * 4;
    const y = 242 + Math.floor(i / 9) * 16 + (i % 3) * 3;
    return <ellipse key={i} cx={x} cy={y} rx="8" ry="4" fill="#fff0ce" opacity="0.92" transform={`rotate(${(i * 23) % 90} ${x} ${y})`} />;
  });

  return (
    <svg className="vector-meal" viewBox="0 0 820 560" role="img" aria-label="detailed vector healthy meal bowl">
      <defs>
        <radialGradient id="plateOuter" cx="46%" cy="38%" r="62%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.58" stopColor="#edf3ec" />
          <stop offset="1" stopColor="#9aa89d" />
        </radialGradient>
        <radialGradient id="darkBowl" cx="48%" cy="38%" r="64%">
          <stop offset="0" stopColor="#243b30" />
          <stop offset="0.62" stopColor="#12231b" />
          <stop offset="1" stopColor="#050d0a" />
        </radialGradient>
        <linearGradient id="chicken" x1="0" x2="1">
          <stop offset="0" stopColor="#f1b46c" />
          <stop offset="1" stopColor="#b86b34" />
        </linearGradient>
        <linearGradient id="avo" x1="0" x2="1">
          <stop offset="0" stopColor="#d9f58a" />
          <stop offset="1" stopColor="#55c746" />
        </linearGradient>
        <filter id="mealShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="26" stdDeviation="20" floodColor="#000" floodOpacity="0.58" />
        </filter>
        <filter id="ingredientShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#000" floodOpacity="0.24" />
        </filter>
        <clipPath id="mealClip"><ellipse cx="365" cy="286" rx="285" ry="165" /></clipPath>
      </defs>

      <ellipse cx="365" cy="304" rx="326" ry="182" fill="url(#plateOuter)" filter="url(#mealShadow)" />
      <ellipse cx="365" cy="286" rx="285" ry="154" fill="url(#darkBowl)" />
      <g clipPath="url(#mealClip)" filter="url(#ingredientShadow)">
        <path d="M124 270 C186 178 322 163 416 230 C359 312 222 338 124 270Z" fill="#f4dfb7" />
        <g>{grains}</g>

        <g>
          <path d="M400 190 C487 140 591 168 638 249 C548 282 449 263 400 190Z" fill="#41bf68" />
          <path d="M426 202 C493 170 570 188 610 242 C548 262 471 250 426 202Z" fill="#9fe86c" opacity="0.8" />
          <path d="M452 210 C500 192 552 204 582 236" fill="none" stroke="#218c4d" strokeWidth="8" opacity="0.45" />
        </g>

        <g>
          <path d="M286 347 C301 266 360 215 443 225 C431 322 366 373 286 347Z" fill="url(#avo)" />
          <path d="M320 330 C336 278 372 250 423 250 C404 307 370 337 320 330Z" fill="#f4ef9f" opacity="0.55" />
          <path d="M330 344 C353 293 384 259 429 232" stroke="#3fa84a" strokeWidth="7" fill="none" opacity="0.5" />
        </g>

        <g>
          <ellipse cx="236" cy="182" rx="34" ry="34" fill="#f04437" />
          <ellipse cx="296" cy="160" rx="38" ry="38" fill="#ff5a43" />
          <ellipse cx="360" cy="184" rx="34" ry="34" fill="#e93e32" />
          <ellipse cx="302" cy="209" rx="25" ry="25" fill="#ff624d" />
          <path d="M220 139 C268 111 350 121 406 164" stroke="#65d870" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M303 114 C315 158 312 214 292 255" stroke="#36aa56" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="285" cy="149" r="8" fill="#ffb8a9" opacity="0.65" />
        </g>

        <g>
          <rect x="480" y="268" width="78" height="54" rx="16" fill="url(#chicken)" />
          <rect x="568" y="245" width="88" height="58" rx="18" fill="#c7793d" />
          <rect x="520" y="204" width="82" height="58" rx="17" fill="#e0a45b" />
          <path d="M494 294 C532 313 601 302 648 270" stroke="#8f4f2a" strokeWidth="6" opacity="0.32" fill="none" />
          <path d="M536 225 L586 253 M498 286 L548 306 M585 264 L642 286" stroke="#6f3e25" strokeWidth="4" opacity="0.45" />
        </g>

        <g>
          <path d="M594 156 C645 160 686 197 704 252 C648 270 599 247 570 196Z" fill="#68d46d" />
          <path d="M610 178 C648 185 676 210 688 243 C648 252 614 236 590 204Z" fill="#bcf08b" opacity="0.75" />
          <path d="M650 144 C698 136 742 161 765 207 C718 236 664 214 641 177Z" fill="#2abf6b" />
          <path d="M620 188 C650 202 674 224 686 250 M660 162 C697 178 728 194 756 214" stroke="#168a49" strokeWidth="6" opacity="0.38" fill="none" />
        </g>

        <g>
          <path d="M566 360 C596 307 654 293 722 324 C678 379 616 395 566 360Z" fill="#914bd8" />
          <path d="M604 374 C632 342 677 333 732 356 C690 388 646 400 604 374Z" fill="#b869ef" />
          <path d="M590 354 C632 344 676 343 720 351" stroke="#6c32a7" strokeWidth="5" opacity="0.45" />
        </g>
      </g>

      <ellipse cx="365" cy="286" rx="302" ry="174" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="14" opacity="0.75" />
      <ellipse className="meal-scan-ring" cx="365" cy="286" rx="316" ry="132" fill="none" stroke="#20d884" strokeWidth="6" opacity="0.95" />
      <line className="meal-scan-line" x1="365" y1="112" x2="365" y2="455" stroke="#20d884" strokeWidth="6" strokeLinecap="round" opacity="0.78" />
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
