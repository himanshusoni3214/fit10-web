import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone } from 'lucide-react';
import { useRef } from 'react';
import type { Group } from 'three';

const chapters = [
  {
    number: '01',
    title: 'Scan breakfast',
    text: 'A real meal becomes calories, protein, fiber, and guidance in seconds.',
    label: 'AI Meal Scan',
    result: 'Protein +42g',
    note: 'Breakfast logged',
  },
  {
    number: '02',
    title: 'Order lunch',
    text: 'Restaurant meals arrive with nutrition already attached. No manual entry.',
    label: 'Restaurant Order',
    result: 'Lunch logged',
    note: 'Menu nutrition synced',
  },
  {
    number: '03',
    title: 'Choose dinner',
    text: 'A recipe becomes a grocery list, pantry update, cooking guide, and nutrition log.',
    label: 'Recipe Builder',
    result: 'Cart ready',
    note: '6 ingredients added',
  },
  {
    number: '04',
    title: 'Shop smarter',
    text: 'A barcode scan reveals ingredients, warnings, and cleaner alternatives.',
    label: 'Barcode Scan',
    result: 'Better option found',
    note: 'Lower sugar swap',
  },
  {
    number: '05',
    title: 'Share progress',
    text: 'Dietitians, employers, and partners can support healthier choices.',
    label: 'Care Progress',
    result: 'Goal improving',
    note: 'Shared with care team',
  },
];

const modules = ['Recipe', 'Grocery', 'Pantry', 'Cooking', 'Restaurant', 'Barcode', 'Dietitian', 'Employer'];

function HeroWorld() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.12, 36, 36]} />
        <meshStandardMaterial color="#16c784" roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.026, 12, 96]} />
        <meshStandardMaterial color="#b9f47a" roughness={0.3} />
      </mesh>
      {modules.slice(0, 6).map((item, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 2.8;
        const z = Math.sin(angle) * 1.25;
        const y = Math.sin(angle * 1.4) * 0.75;
        return (
          <group key={item} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[0.48, 0.48, 0.14]} />
              <meshStandardMaterial color={index % 2 ? '#07111f' : '#ffffff'} roughness={0.42} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.35]} frameloop="always" camera={{ position: [0, 0.2, 6.2], fov: 40 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 4]} intensity={2.1} />
      <pointLight position={[-3, -2, 5]} color="#8eea65" intensity={2.3} />
      <HeroWorld />
    </Canvas>
  );
}

function App() {
  return (
    <main>
      <nav className="topbar">
        <a className="logo" href="#top"><span>F</span>Fit10X</a>
        <div className="navlinks">
          <a href="#journey">Journey</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="cinema-hero">
        <div className="scene-wrap"><HeroCanvas /></div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="kicker">3D nutrition intelligence</p>
          <h1>Every meal connected.</h1>
          <p>Fit10X connects recipes, groceries, restaurants, scans, and health goals into one nutrition platform.</p>
          <a href="#journey" className="hero-cta">Enter the story <ArrowDown size={18} /></a>
        </motion.div>
        <div className="orbit-label label-a">Recipes</div>
        <div className="orbit-label label-b">Grocery</div>
        <div className="orbit-label label-c">Restaurants</div>
        <div className="orbit-label label-d">Health</div>
      </section>

      <section className="manifesto">
        <p>Nutrition should not live in five separate apps.</p>
        <h2>One connected journey from food planning to health progress.</h2>
      </section>

      <section id="journey" className="scroll-story">
        <div className="sticky-visual">
          <div className="phone-shell">
            <div className="phone-screen">
              <div className="phone-orb" />
              <span>Live Fit10X Demo</span>
              <strong>Watch the flow</strong>
              <small>The phone updates as the story scrolls.</small>
            </div>
          </div>
        </div>
        <div className="story-copy">
          {chapters.map((chapter) => (
            <motion.article key={chapter.title} className="chapter" initial={{ opacity: 0.2, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.55 }}>
              <div className="chapter-copy">
                <span>{chapter.number}</span>
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </div>
              <div className="phone-state">
                <small>{chapter.label}</small>
                <strong>{chapter.result}</strong>
                <em>{chapter.note}</em>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="ecosystem">
        <p className="kicker">The ecosystem</p>
        <h2>Recipe to grocery to pantry to cooking to restaurant to health.</h2>
        <div className="ecosystem-track">
          {modules.map((item) => <div className="eco-node" key={item}>{item}</div>)}
        </div>
      </section>

      <section id="roadmap" className="roadmap-v2">
        <div>
          <p className="kicker">Build order</p>
          <h2>Vision with clear phases.</h2>
        </div>
        <div className="phase-grid">
          <article><span>Now</span><h3>Consumer nutrition, recipes, grocery intelligence, restaurant menus.</h3></article>
          <article><span>Next</span><h3>Corporate wellness, dietitian tools, retail partnerships.</h3></article>
          <article><span>Future</span><h3>Insurance, enterprise integrations, developer APIs.</h3></article>
        </div>
      </section>

      <section id="contact" className="contact-v2">
        <p className="kicker">Fit10X</p>
        <h2>Build the future of nutrition with us.</h2>
        <div className="contact-actions">
          <a href="mailto:info@fit10x.ca"><Mail size={18} /> info@fit10x.ca</a>
          <a href="tel:+16479169693"><Phone size={18} /> 647-916-9693</a>
        </div>
      </section>
    </main>
  );
}

export default App;
