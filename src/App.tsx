import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  { number: '02', title: 'AI understands what you eat.', text: 'One scan turns a real meal into calories, protein, fiber, and micronutrients.', label: 'AI Meal Scan', result: 'Nutrition found', note: 'Meal → Nutrition', chips: ['Calories', 'Protein', 'Fiber'] },
  { number: '03', title: 'Turn meals into smart recipes.', text: 'Fit10X creates recipes, ingredients, macros, serving size, and a grocery list.', label: 'Recipe Builder', result: 'Recipe ready', note: 'Meal → Plan', chips: ['Recipe', 'Macros', 'Shopping'] },
  { number: '04', title: 'Shop smarter. Choose better.', text: 'Ingredients become a cart and AI suggests better, cheaper, healthier options.', label: 'Grocery Intelligence', result: 'Better choices', note: 'Plan → Shop', chips: ['Cart', 'Swaps', 'Budget'] },
  { number: '05', title: 'Made for your health.', text: 'Weight loss, diabetes, heart health, pregnancy, allergies, kidney care, and more.', label: 'Health Mode', result: 'Personalized plan', note: 'Everything → You', chips: ['Diabetes', 'Heart', 'Allergies'] },
];

const flow = [
  ['Recipe', 'Create meals with nutrition, cost, macros, and grocery needs.'],
  ['Grocery', 'Turn recipes into smart lists and better product choices.'],
  ['Pantry', 'Track what exists at home, what is missing, and what expires soon.'],
  ['Cooking', 'Log nutrition automatically when meals are prepared.'],
  ['Restaurant', 'Restaurant orders update nutrition without manual entry.'],
  ['Health', 'Strict goals and disease-specific nutrition guidance stay connected.'],
];

function ProblemVisual() {
  return (
    <div className="problem-visual" aria-label="Meal data gets lost before Fit10X connects it">
      <div className="person-line" />
      <div className="meal-stage">
        <div className="steam s1" /><div className="steam s2" /><div className="steam s3" />
        <div className="bowl">
          <div className="food-dot tomato" /><div className="food-dot green1" /><div className="food-dot green2" /><div className="food-dot rice" /><div className="food-dot protein" />
        </div>
        <div className="scan-orbit" />
        <div className="particle p1" /><div className="particle p2" /><div className="particle p3" /><div className="particle p4" /><div className="particle p5" />
      </div>
      <div className="hero-phone">
        <div className="phone-notch" />
        <span>Nutrition data</span>
        <strong>Not saved</strong>
        <small>Calories • Protein • Fiber • Health context</small>
      </div>
      <div className="lost-card">AI scanning</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(Number(visible.target.getAttribute('data-index') || 0));
    }, { threshold: 0.55, rootMargin: '-10% 0px -20% 0px' });
    chapterRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[active];

  return (
    <main>
      <nav className="topbar dark-nav">
        <a className="logo" href="#top"><span>F</span>Fit10X</a>
        <div className="navlinks"><a href="#journey">Journey</a><a href="#ecosystem">Ecosystem</a><a href="#partners">Partners</a><a href="#contact">Contact</a></div>
      </nav>

      <section id="top" className="problem-hero">
        <div className="hero-noise" />
        <motion.div className="problem-copy" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="kicker">Chapter 01 · The problem</p>
          <h1>Every meal has data.<br /><span>Today, it gets lost.</span></h1>
          <p>Calories, protein, ingredients, allergies, health restrictions, and progress disappear across recipes, groceries, restaurants, and apps.</p>
          <a href="#journey" className="hero-cta">Explore the Story <ArrowDown size={18} /></a>
        </motion.div>
        <ProblemVisual />
      </section>

      <section className="manifesto"><p>Fit10X starts with one person.</p><h2>Then every feature follows their food journey.</h2></section>

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
        <div className="ecosystem-intro"><p className="kicker">The ecosystem</p><h2>From one person to a connected nutrition platform.</h2></div>
        <div className="flow-map">
          {flow.map(([title, text], index) => <article className="flow-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="partners" className="partner-phase">
        <p className="kicker">Next phases</p>
        <h2>Built for people first. Valuable for partners next.</h2>
        <div className="phase-grid"><article><span>Restaurants</span><h3>Menus become nutrition-aware ordering experiences.</h3></article><article><span>Grocers</span><h3>Recipes turn into smart carts and healthier substitutions.</h3></article><article><span>Healthcare</span><h3>Strict nutrition plans become easier to follow every day.</h3></article></div>
      </section>

      <section id="contact" className="contact-v2"><p className="kicker">Fit10X</p><h2>Build the future of nutrition with us.</h2><div className="contact-actions"><a href="mailto:info@fit10x.ca"><Mail size={18} /> info@fit10x.ca</a><a href="tel:+16479169693"><Phone size={18} /> 647-916-9693</a></div></section>
    </main>
  );
}

export default App;
