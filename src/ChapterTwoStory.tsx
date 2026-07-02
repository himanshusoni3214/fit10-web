import { motion } from 'framer-motion';
import { Camera, CheckCircle2, ScanLine, ShieldCheck } from 'lucide-react';

const detected = [
  ['Calories', '620 kcal'],
  ['Protein', '38g'],
  ['Fiber', '11g'],
  ['Ingredients', '11 found'],
  ['Allergy check', 'Clear'],
  ['Health context', 'Needs rules'],
];

export default function ChapterTwoStory() {
  return (
    <section id="journey" className="chapter-two-story">
      <div className="chapter-two-copy">
        <p className="kicker">Chapter 02 · AI meal scan</p>
        <h2>One scan turns lunch into nutrition intelligence.</h2>
        <p>
          The same meal from Chapter 01 now enters the Fit10X phone. The camera scans the plate, identifies food items, builds macros, checks allergies, and prepares the data for recipes, grocery, and health rules.
        </p>
        <div className="chapter-two-points">
          <span><Camera size={18} /> Camera opens</span>
          <span><ScanLine size={18} /> AI detects food</span>
          <span><ShieldCheck size={18} /> Health context applied</span>
        </div>
      </div>

      <div className="chapter-two-stage" aria-label="AI meal scan animation">
        <motion.div className="scan-meal-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.7 }}>
          <svg viewBox="0 0 560 360" className="scan-meal-svg" role="img" aria-label="meal being scanned into phone">
            <defs>
              <radialGradient id="c2Plate" cx="50%" cy="42%" r="60%">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#b8c3bd" />
              </radialGradient>
              <filter id="c2Shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="20" stdDeviation="14" floodColor="#000" floodOpacity="0.45" /></filter>
            </defs>
            <ellipse cx="255" cy="198" rx="210" ry="92" fill="url(#c2Plate)" filter="url(#c2Shadow)" />
            <ellipse cx="255" cy="188" rx="176" ry="74" fill="#0d1913" />
            <path d="M142 188 C182 127 260 115 328 162 C278 224 197 235 142 188Z" fill="#f4dfb7" />
            <path d="M304 145 C370 112 442 137 468 195 C395 224 332 207 304 145Z" fill="#3ec26d" />
            <path d="M202 245 C215 183 268 151 329 168 C312 238 258 267 202 245Z" fill="#82df4f" />
            <g fill="#ef493a"><circle cx="176" cy="140" r="20" /><circle cx="218" cy="128" r="23" /><circle cx="260" cy="144" r="20" /></g>
            <g fill="#d78545"><rect x="342" y="202" width="54" height="34" rx="10" /><rect x="402" y="188" width="60" height="38" rx="10" /></g>
            <ellipse className="c2-scan-ring" cx="255" cy="188" rx="218" ry="74" fill="none" stroke="#20d884" strokeWidth="5" />
            <line className="c2-scan-line" x1="255" y1="78" x2="255" y2="300" stroke="#20d884" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="scan-tags"><span>Protein</span><span>Fiber</span><span>Micros</span></div>
        </motion.div>

        <motion.div className="chapter-two-phone" initial={{ opacity: 0, x: 60, rotate: 4 }} whileInView={{ opacity: 1, x: 0, rotate: 2 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.75, delay: 0.15 }}>
          <div className="chapter-two-notch" />
          <div className="phone-camera-line"><ScanLine size={16} /> scanning meal</div>
          <h3>Healthy Power Bowl</h3>
          <strong>Nutrition detected</strong>
          <div className="macro-rings">
            <span><b>620</b><small>kcal</small></span>
            <span><b>38g</b><small>protein</small></span>
            <span><b>11g</b><small>fiber</small></span>
          </div>
          <div className="detected-list">
            {detected.map(([label, value], index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.08 }} viewport={{ once: false }}>
                <span><CheckCircle2 size={14} /> {label}</span><b>{value}</b>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="data-stream"><i /><i /><i /><i /></div>
      </div>
    </section>
  );
}
