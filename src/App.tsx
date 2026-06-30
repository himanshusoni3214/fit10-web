import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail, Phone } from 'lucide-react';
import { useRef } from 'react';
import type { Group } from 'three';

const chapters = [
  ['01', 'Scan breakfast', 'A real meal becomes calories, protein, fiber, and health guidance in seconds.'],
  ['02', 'Order lunch', 'Restaurant meals arrive with nutrition already attached. No manual logging.'],
  ['03', 'Choose dinner', 'A recipe becomes a grocery list, pantry update, cooking guide, and nutrition log.'],
  ['04', 'Shop smarter', 'Packaged food scans reveal ingredients, warnings, and cleaner alternatives.'],
  ['05', 'Share progress', 'Dietitians, employers, and partners can support healthier decisions.'],
];

const modules = [
  'Recipes',
  'Groceries',
  'Pantry',
  'Restaurants',
  'Barcode',
  'Healthcare',
  'Corporate Wellness',
  'AI Coach',
];

function OrbitingFoodWorld() {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
    if (inner.current) {
      inner.current.rotation.x = Math.sin(clock.elapsedTime * 0.42) * 0.24;
      inner.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshStandardMaterial color="#16c784" roughness={0.22} metalness={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.62, 0.025, 24, 160]} />
          <meshStandardMaterial color="#dfffea" roughness={0.16} metalness={0.1} />
        </mesh>
        <mesh rotation={[0.55, 0.2, 0.4]}>
          <torusGeometry args={[1.98, 0.018, 24, 180]} />
          <meshStandardMaterial color="#8eea65" roughness={0.22} />
        </mesh>
      </group>

      {modules.map((label, index) => {
        const angle = (index / modules.length) * Math.PI * 2;
        const radius = index % 2 ? 2.65 : 3.25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 1.7) * 0.85;
        return (
          <Float key={label} speed={1 + index * 0.08} floatIntensity={0.6} rotationIntensity={0.4}>
            <group position={[x, y, z]}>
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.18]} />
                <meshStandardMaterial color={index % 2 ? '#07111f' : '#ffffff'} roughness={0.26} metalness={0.08} />
              </mesh>
              <mesh position={[0, 0, 0.13]}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshStandardMaterial color={index % 2 ? '#8eea65' : '#16c784'} />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function CinematicScene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 7], fov: 42 }}>
      <color attach="background" args={["#f7fbf8"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 4]} intensity={2.6} />
      <pointLight position={[-3, -2, 5]} color="#8eea65" intensity={4} />
      <OrbitingFoodWorld />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
    </Canvas>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], ['0%', '-18%']);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.18]);

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
        <motion.div className="scene-wrap" style={{ scale: sceneScale }}>
          <CinematicScene />
        </motion.div>
        <motion.div className="hero-content" style={{ y: heroY }}>
          <p className="kicker">3D nutrition intelligence</p>
          <h1>One platform for every meal you plan, buy, cook, and eat.</h1>
          <p>
            Fit10X connects recipes, groceries, restaurants, barcode scans, and health goals into one AI-powered nutrition story.
          </p>
          <a href="#journey" className="hero-cta">Enter the story <ArrowDown size={18} /></a>
        </motion.div>
        <div className="orbit-label label-a">Recipes</div>
        <div className="orbit-label label-b">Grocery</div>
        <div className="orbit-label label-c">Restaurants</div>
        <div className="orbit-label label-d">Health</div>
      </section>

      <section className="manifesto">
        <p>Nutrition should not live in five separate apps.</p>
        <h2>Fit10X turns the full food journey into one connected experience.</h2>
      </section>

      <section id="journey" className="scroll-story">
        <div className="sticky-visual">
          <div className="phone-shell">
            <div className="phone-screen">
              <div className="scan-ring" />
              <span>AI Meal Scan</span>
              <strong>Protein +42g</strong>
              <small>Logged automatically</small>
            </div>
          </div>
          <div className="floating-card recipe-card">Recipe → Grocery List</div>
          <div className="floating-card cart-card">Cart → Pantry</div>
          <div className="floating-card health-card">Progress → Care</div>
        </div>
        <div className="story-copy">
          {chapters.map(([number, title, text]) => (
            <motion.article key={title} className="chapter" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.45 }}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="ecosystem">
        <p className="kicker">The ecosystem</p>
        <h2>Recipe → grocery → pantry → cooking → restaurant → health.</h2>
        <div className="ecosystem-track">
          {['Recipe', 'Grocery', 'Pantry', 'Cooking', 'Restaurant', 'Barcode', 'Dietitian', 'Employer'].map((item) => (
            <div className="eco-node" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="roadmap-v2">
        <div>
          <p className="kicker">Credible phasing</p>
          <h2>Beautiful vision. Clear build order.</h2>
        </div>
        <div className="phase-grid">
          <article><span>Now</span><h3>Consumer, recipes, grocery intelligence, restaurant nutrition.</h3></article>
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
