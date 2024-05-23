import '@fontsource/anton';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';
import '@fontsource/racing-sans-one';
import '@fontsource/titillium-web';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App';

const root = createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<App/>
	</StrictMode>
);
