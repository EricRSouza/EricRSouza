import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/source-serif-4/latin-400-italic.css';
import '@fontsource/source-serif-4/latin-400.css';
import '@fontsource/source-serif-4/latin-600.css';
import './styles.css';
import { App } from './App';
import { canHydrateRoute } from './lib/routes';

const root = document.getElementById('root');
if (!root) throw new Error('Missing root element');
const base = import.meta.env.BASE_URL;
const path = window.location.pathname.startsWith(base)
  ? '/' + window.location.pathname.slice(base.length)
  : window.location.pathname;
const app = <App path={path} />;
if (root.dataset.route && canHydrateRoute(path, root.dataset.route)) hydrateRoot(root, app);
else createRoot(root).render(app);
