import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

const chapters = [
  { number: '01', title: 'Scan breakfast', text: 'A real meal becomes calories, protein, fiber, and guidance in seconds.', label: 'AI Meal Scan', result: 'Protein +42g', note: 'Breakfast logged', chips: ['Calories', 'Protein', 'Fiber'] },
  { number: '02', title: 'Order lunch', text: 'Restaurant meals arrive with nutrition already attached. No manual entry.', label: 'Restaurant Order', result: 'Lunch logged', note: 'Menu nutrition synced', chips: ['Restaurant', 'POS', 'Nutrition'] },
  { number: '03', title: 'Choose dinner', text: 'A recipe becomes a grocery list, pantry update, cooking guide, and nutrition log.', label: 'Recipe Builder', result: 'Cart ready', note: '6 ingredients added', chips: ['Recipe', 'Cart', 'Pantry'] },
  { number: '04', title: 'Shop smarter', text: 'A barcode scan reveals ingredients, warnings, and cleaner alternatives.', label: 'Barcode Scan', result: 'Better option found', note: 'Lower sugar swap', chips: ['Barcode', 'Compare', 'Swap'] },
  { number: '05', title: 'Share progress', text: 'Dietitians, employers, and partners can support healthier choices.', label: 'Care Progress', result: 'Goal improving', note: 'Shared with care team', chips: ['Dietitian', 'Employer', 'Progress'] },
];

const flow = [
  ['Recipe', 'Create meals with nutrition, cost, macros, and grocery needs.'],
  ['Grocery', 'Turn recipes into smart lists and better product choices.'],
  ['Pantry', 'Track what exists at home, what is missing, and what expires soon.'],
  ['Cooking', 'Log nutrition automatically when meals are prepared.'],
  ['Restaurant', 'Restaurant orders update nutrition without manual entry.'],
  ['Health', 'Progress can support dietitians, employers, and care programs.'],
];

function HeroWorld() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial color="#16c784" roughness={0.34} metalness={0.06} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.52, 0.026, 12, 80]} />
        <meshStandardMaterial color="#b9f47a" roughness={0.35} />
      </mesh>
      {['Recipe', 'Cart', 'Menu', 'Scan', 'Care', 'AI'].map((item, index) => {
        const angle = (index / 6) * Math.PI * 2;
        return (
          <group key={item} position={[Math.cos(angle) * 2.45, Math.sin(angle * 1.25) * 0.68, Math.sin(angle) * 1.15]}>
            <mesh>
              <boxGeometry args={[0.44, 0.44, 0.13]} />
              <meshStandardMaterial color={index % 2 ? '#07111f' : '#ffffff'} roughness={0.45} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0.15, 5.8], fov: 39 }}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 4]} intensity={2} />
      <pointLight position={[-3, -2, 5]} color="#8eea65" intensity={2} />
      <HeroWorld />
    </Canvas>
  );
}

function App() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(Number(visible.target.getAttribute('data-index') || 0));
      },
      { threshold: 0.55, rootMargin: '-10% 0px -20% 0px' },
    );
    chapterRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[active];

  return (
    <main>
      <nav className="topbar">
        <a className="logo" href="#top"><span>F</span>Fit10X</a>
        <div className="navlinks"><a href="#journey">Journey</a><a href="#ecosystem">Ecosystem</a><a href="#partners">Partners</a><a href="#contact">Contact</a></div>
      </nav>

      <section id="top" className="cinema-hero">
        <div className="hero-grid">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="kicker">3D nutrition intelligence</p>
            <h1>Every meal connected.</h1>
            <p>Recipes, groceries, restaurants, scans, and health goals working together in one Fit10X ecosystem.</p>
            <a href="#journey" className="hero-cta">Enter the story <ArrowDown size={18} /></a>
          </motion.div>
          <div className="visual-panel">
            <div className="scene-wrap"><HeroCanvas /></div>
            <div className="orbit-label label-a">Recipes</div><div className="orbit-label label-b">Grocery</div><div className="orbit-label label-c">Restaurants</div><div className="orbit-label label-d">Health</div>
          </div>
        </div>
      </section>

      <section className="manifesto"><p>Nutrition should not live in five separate apps.</p><h2>One connected journey from food planning to health progress.</h2></section>

      <section id="journey" className="scroll-story">
        <div className="sticky-visual">
          <div className="phone-shell">
            <motion.div className="phone-screen" key={activeChapter.title} initial={{ opacity: 0.7, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="phone-orb" />
              <span>{activeChapter.label}</span>
              <strong>{activeChapter.result}</strong>
              <small>{activeChapter.note}</small>
              <div className="phone-chips">{activeChapter.chips.map((chip) => <b key={chip}>{chip}</b>)}</div>
            </motion.div>
          </div>
        </div>
        <div className="story-copy">
          {chapters.map((chapter, index) => (
            <motion.article ref={(node) => { chapterRefs.current[index] = node; }} data-index={index} key={chapter.title} className="chapter" initial={{ opacity: 0.2, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.55 }}>
              <div className="chapter-copy"><span>{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.text}</p></div>
              <div className="phone-state"><small>{chapter.label}</small><strong>{chapter.result}</strong><em>{chapter.note}</em></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="ecosystem">
        <div className="ecosystem-intro"><p className="kicker">The ecosystem</p><h2>From recipe idea to measurable health progress.</h2></div>
        <div className="flow-map">
          {flow.map(([title, text], index) => <article className="flow-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="partners" className="partner-phase">
        <p className="kicker">Next phases</p>
        <h2>Built for consumers first. Valuable for partners next.</h2>
        <div className="phase-grid"><article><span>Restaurants</span><h3>Menus become nutrition-aware ordering experiences.</h3></article><article><span>Grocers</span><h3>Recipes turn into smart carts and healthier substitutions.</h3></article><article><span>Healthcare</span><h3>Dietitians see real progress instead of incomplete food diaries.</h3></article></div>
      </section>

      <section id="contact" className="contact-v2"><p className="kicker">Fit10X</p><h2>Build the future of nutrition with us.</h2><div className="contact-actions"><a href="mailto:info@fit10x.ca"><Mail size={18} /> info@fit10x.ca</a><a href="tel:+16479169693"><Phone size={18} /> 647-916-9693</a></div></section>
    </main>
  );
}

export default App;
