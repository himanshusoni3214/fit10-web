import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardCheck, HeartPulse, Utensils } from 'lucide-react';

const detected = [
  ['Meal identity', 'Performance Bowl'],
  ['Nutrition profile', '620 kcal / 38g protein'],
  ['Ingredient map', '11 foods recognized'],
  ['Health flags', 'Rules ready'],
];

export default function ChapterTwoStory() {
  return (
    <section id="journey" className="chapter-two-story">
      <div className="chapter-two-copy">
        <p className="kicker">Chapter 02 · The first connection</p>
        <h2>The lost meal becomes a saved nutrition record.</h2>
        <p>
          Chapter 1 shows the problem: the meal data disappears. Chapter 2 shows the first Fit10X action: the same meal is captured, structured, and saved so the rest of the journey can continue.
        </p>
        <div className="chapter-two-points">
          <span><Utensils size={18} /> Meal identified</span>
          <span><ClipboardCheck size={18} /> Data saved</span>
          <span><HeartPulse size={18} /> Health rules prepared</span>
        </div>
      </div>

      <div className="chapter-two-stage connected-scan" aria-label="saved nutrition record animation">
        <motion.div className="saved-record-card" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.7 }}>
          <p>Fit10X Record</p>
          <h3>Performance Bowl</h3>
          <div className="record-macros">
            <span><b>620</b><small>Calories</small></span>
            <span><b>38g</b><small>Protein</small></span>
            <span><b>11g</b><small>Fiber</small></span>
          </div>
          <div className="record-stack">
            <div>Ingredients</div>
            <div>Allergy context</div>
            <div>Health goal rules</div>
            <div>Nutrition history</div>
          </div>
        </motion.div>

        <div className="connection-map">
          <div className="core-node">Saved meal</div>
          <span className="map-node n1">Recipe</span>
          <span className="map-node n2">Grocery</span>
          <span className="map-node n3">Health</span>
          <span className="map-node n4">Progress</span>
        </div>

        <motion.div className="chapter-two-phone saved-phone" initial={{ opacity: 0, x: 60, rotate: 4 }} whileInView={{ opacity: 1, x: 0, rotate: 2 }} viewport={{ amount: 0.45 }} transition={{ duration: 0.75, delay: 0.15 }}>
          <div className="chapter-two-notch" />
          <div className="phone-camera-line"><CheckCircle2 size={16} /> saved to Fit10X</div>
          <h3>Nutrition record created</h3>
          <strong>Connected</strong>
          <div className="detected-list">
            {detected.map(([label, value], index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.08 }} viewport={{ once: false }}>
                <span><CheckCircle2 size={14} /> {label}</span><b>{value}</b>
              </motion.div>
            ))}
          </div>
          <div className="next-step-card">Next: turn this meal into a recipe and grocery plan.</div>
        </motion.div>
      </div>
    </section>
  );
}
