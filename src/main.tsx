import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './chapter1.css';

createRoot(document.body.querySelector('#root')!).render(<App />);
