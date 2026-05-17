import {AppBar, Toolbar} from '@/components/ui';
import Disclaimer from './Disclaimer';

export default function Footer() {
	return (
		<>
			<Toolbar/>
			<AppBar
				position="fixed"
				component="footer"
				className="!bg-secondary text-secondary-foreground py-2 after:hidden !top-auto !bottom-0 !p-0 opacity-80 z-40"
			>
				<Toolbar className="!min-h-0 py-1">
					<Disclaimer/>
				</Toolbar>
			</AppBar>
		</>
	);
}
