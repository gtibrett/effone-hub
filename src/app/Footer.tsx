import {AppBar, Toolbar, useTheme} from '@mui/material';
import Disclaimer from './Disclaimer';

export default function Footer() {
	const theme = useTheme();
	
	return (
		<>
			<Toolbar/>
			<AppBar
				position="relative"
				component="footer"
				color="secondary"
				sx={{
					zIndex:   theme.zIndex.fab - 1,
					position: 'fixed',
					p:        0,
					bottom:   0,
					top:      'auto',
					opacity:  .8
				}}>
				<Toolbar sx={{minHeight: 'unset !important', py: 1}}>
					<Disclaimer/>
				</Toolbar>
			</AppBar>
		</>
	);
}