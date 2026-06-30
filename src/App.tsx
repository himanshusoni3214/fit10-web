import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Text3D, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Barcode, Building2, CalendarCheck, HeartPulse, Mail, MapPin, Phone, Salad, ShoppingCart, Stethoscope, Utensils } from 'lucide-react';
import { useRef } from 'react';
import type { Group } from 'three';

const green = '#14b86a';
const navy = '#07111f';

function NutritionWorld() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
  });

  const nodes = [
    { label: 'Recipes', position: [2.5, 0.9, 0] as [number, number, number], color: '#14b86a' },
    { label: 'Grocery', position: [-2.2, 0.7, 0.8] as [number, number, number], color: '#8bdc5f' },
    { label: 'Dining', position: [1.7, -1.2, -1.2] as [number, number, number], color: '#10a37f' },
    { label: 'Health', position: [-2, -1.1, -0.6] as [number, number, number], color: '#2dd4bf' },
    { label: 'Barcode', position: [0, 1.9, -1.3] as [number, number, number], color: '#a3e635' },
  ];

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.45}>
        <Sphere args={[1, 48, 48]}>
          <meshStandardMaterial color={green} roughness={0.28} metalness={0.18} />
        </Sphere>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.035, 16, 120]} />
          <meshStandardMaterial color="#d8f9e7" roughness={0.2} />
        </mesh>
      </Float>
      {nodes.map((node) => (
        <Float key={node.label} speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
          <group position={node.position}>
            <Sphere args={[0.22, 32, 32]}>
              <meshStandardMaterial color={node.color} roughness={0.25} metalness={0.05} />
            </Sphere>
          </group>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <pointLight position={[-4, -2, 4]} intensity={1.2} color="#9be66f" />
      <NutritionWorld />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
    </Canvas>
  );
}

const sections = [
  { id: 'story', label: 'Story' },
  { id: 'platform', label: 'Platform' },
  { id: 'partners', label: 'Partners' },
  { id: 'investors', label: 'Investors' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
];

const modules = [
  { icon: Salad, title: 'Consumer App', text: 'Track meals, recipes, groceries, restaurant orders, and health goals without manual calorie counting.' },
  { icon: CalendarCheck, title: 'Recipe Intelligence', text: 'Turn recipes into nutrition, grocery lists, ingredient swaps, meal plans, and automatic tracking.' },
  { icon: ShoppingCart, title: 'Grocery Intelligence', text: 'Barcode scanning, smart shopping lists, pantry tracking, expiry reminders, and healthier alternatives.' },
  { icon: Utensils, title: 'Restaurant Platform', text: 'Restaurants publish nutrition-aware menus and orders automatically update customer nutrition.' },
  { icon: Stethoscope, title: 'Healthcare', text: 'Dietitians and doctors can help users follow nutrition plans with better visibility.' },
  { icon: Building2, title: 'Corporate Wellness', text: 'Employers support healthier teams with simple challenges, dashboards, and rewards.' },
];

const daySteps = [
  ['Morning', 'Breakfast is scanned. Fit10X calculates calories, protein, carbs, fat, fiber, and micronutrients.'],
  ['Lunch', 'A restaurant order is logged automatically because the menu already contains nutrition data.'],
  ['Evening', 'A recipe becomes a grocery list, pantry update, cooking guide, and nutrition log.'],
  ['Shopping', 'A barcode scan compares packaged foods and recommends healthier alternatives.'],
  ['Care', 'A dietitian reviews progress and adjusts goals when the user needs support.'],
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Fit10X home">
        <span className="brand-mark">F</span>
        <span>Fit10X</span>
      </a>
      <nav>
        {sections.map((item) => (
          <a key={item.id} href={`#${item.id}`}>{item.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">Become a Partner</a>
    </header>
  );
}

function App() {
  return (
    <main id="top">
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>AI nutrition platform</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            Nutrition that follows you everywhere.
          </motion.h1>
          <motion.p className="hero-text" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Fit10X connects recipes, groceries, restaurants, home cooking, and health goals into one AI-powered nutrition platform.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
            <a className="primary-btn" href="#story">Explore the Platform <ArrowRight size={18} /></a>
            <a className="secondary-btn" href="#contact">Contact Fit10X</a>
          </motion.div>
        </div>
        <div className="hero-stage" aria-label="3D nutrition ecosystem visual">
          <Scene />
          <div className="floating-tag tag-one">Recipes</div>
          <div className="floating-tag tag-two">Groceries</div>
          <div className="floating-tag tag-three">Restaurants</div>
          <div className="floating-tag tag-four">Healthcare</div>
        </div>
      </section>

      <section className="problem section-pad">
        <p className="eyebrow">The problem</p>
        <h2>Nutrition is broken because everything is disconnected.</h2>
        <div className="problem-grid">
          {['Meal planning is separate.', 'Grocery shopping is separate.', 'Restaurant eating is separate.', 'Health tracking is separate.'].map((line) => <div className="quiet-card" key={line}>{line}</div>)}
        </div>
      </section>

      <section id="story" className="story section-pad">
        <div className="section-heading">
          <p className="eyebrow">One day with Fit10X</p>
          <h2>One person. One platform. Every meal connected.</h2>
        </div>
        <div className="timeline">
          {daySteps.map(([title, text], index) => (
            <motion.article className="timeline-card" key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="platform" className="section-pad platform">
        <div className="section-heading narrow">
          <p className="eyebrow">Platform modules</p>
          <h2>Six products connected by one nutrition intelligence layer.</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.article className="module-card" key={module.title} whileHover={{ y: -8 }}>
                <div className="module-icon"><Icon size={24} /></div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="partners" className="section-pad partners">
        <div className="section-heading narrow">
          <p className="eyebrow">Why partners care</p>
          <h2>Fit10X creates value for every side of the nutrition ecosystem.</h2>
        </div>
        <div className="partner-grid">
          <div><h3>Restaurants</h3><p>Nutrition visibility, repeat customers, menu intelligence, and customer insights.</p></div>
          <div><h3>Grocery Stores</h3><p>Recipe-to-cart, smart shopping lists, healthier product recommendations, and pantry sync.</p></div>
          <div><h3>Healthcare</h3><p>Better patient nutrition tracking, less manual reporting, and personalized guidance.</p></div>
          <div><h3>Employers</h3><p>Healthier teams, better wellness engagement, and potential insurance savings.</p></div>
        </div>
      </section>

      <section id="investors" className="section-pad investor">
        <div className="flywheel-card">
          <p className="eyebrow">Investor story</p>
          <h2>Every meal makes the platform smarter.</h2>
          <p>Every recipe creates data. Every grocery scan creates data. Every restaurant order creates data. Better data improves recommendations, which attracts more users and more partners.</p>
          <div className="flywheel">
            {['Users', 'Meals', 'Data', 'Better AI', 'Partners', 'More Users'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-pad roadmap">
        <p className="eyebrow">Roadmap</p>
        <h2>Clear, credible phases.</h2>
        <div className="roadmap-grid">
          <article><strong>Current Focus</strong><p>Consumer nutrition experience, recipes, grocery intelligence, and restaurant menu nutrition.</p></article>
          <article><strong>Next</strong><p>Corporate wellness, healthcare partnerships, and retail integrations.</p></article>
          <article><strong>Future</strong><p>Insurance partnerships, enterprise integrations, and developer APIs.</p></article>
        </div>
      </section>

      <section id="contact" className="section-pad contact">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2>Build the future of nutrition with Fit10X.</h2>
          <p>For investors, restaurants, grocery partners, healthcare, corporate wellness, and general partnerships.</p>
          <div className="contact-lines">
            <a href="mailto:info@fit10x.ca"><Mail size={18} /> info@fit10x.ca</a>
            <a href="tel:+16479169693"><Phone size={18} /> 647-916-9693</a>
            <span><MapPin size={18} /> Toronto, Canada</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <input placeholder="Name" />
          <input placeholder="Email" type="email" />
          <input placeholder="Company" />
          <select defaultValue="">
            <option value="" disabled>I am interested in</option>
            <option>Investor</option>
            <option>Restaurant Partner</option>
            <option>Grocery Partner</option>
            <option>Healthcare</option>
            <option>Corporate Wellness</option>
            <option>General</option>
          </select>
          <textarea placeholder="Message" rows={4} />
          <button type="submit">Contact Fit10X</button>
        </form>
      </section>
    </main>
  );
}

export default App;
