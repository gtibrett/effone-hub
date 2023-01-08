import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createRoot} from 'react-dom/client';
import App from './app';

const root = createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<App/>
);
