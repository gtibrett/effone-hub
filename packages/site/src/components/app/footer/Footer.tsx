import { AppBar, Toolbar, useTheme } from '@mui/material';

import Disclaimer from './Disclaimer';

export default function Footer() {
	const theme = useTheme();

	return (
		<>
			<Toolbar />
			<AppBar
				position="relative"
				component="footer"
				color="secondary"
				className="fixed bottom-0 top-auto p-0 opacity-80"
				style={{ zIndex: theme.zIndex.fab - 1 }}
			>
				<Toolbar className="py-1 !min-h-[unset]">
					<Disclaimer />
				</Toolbar>
			</AppBar>
		</>
	);
}
