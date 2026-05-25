import {Link} from '@gtibrett/mui-additions';
import {AppBar, Grid, Toolbar, Typography} from '@mui/material';
import NavMenu from './NavMenu';

// Background mixes the primary-dark token with 25% black via color-mix
// so the AppBar still tracks the OS scheme. The carbon-fiber texture
// stays as a `:before` overlay (Tailwind has no clean pseudo-bg-image
// utility, so this stays in sx).
export default function Header() {
	return (
        <header role="banner">
            <AppBar
				component="nav"
				color="primary"
				aria-label="main navigation"
				className="py-2 border-b-4 border-secondary-light bg-[color-mix(in_oklch,_var(--color-primary-dark),_black_25%)]"
				sx={{
					'&:before': {
						position:        'absolute',
						top:             0, bottom: 0,
						left:            0, right: 0,
						content:         '" "',
						backgroundImage: `url(/carbon-fiber-texture.png)`,
						backgroundSize:  'cover',
						opacity:         .25
					}
				}}>
				<Toolbar>
					<Grid container spacing={1} className="items-center w-full">
						<Grid>
							<Link href="/" color="inherit" sx={{textDecoration: 'none', '& *': {fontFamily: 'Anton !important', fontSize: '48px !important'}}}>
								<Typography component="h1">
									EFF<Typography component="span" className="opacity-100 px-1 text-secondary-light">ONE</Typography>HUB
								</Typography>
							</Link>
						</Grid>
						<Grid size="grow" />
						<NavMenu/>
					</Grid>
				</Toolbar>
			</AppBar>
            <Toolbar className="my-4"/>
        </header>
    );
}