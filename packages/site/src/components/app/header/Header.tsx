import {AppBar, Grid, Link, Toolbar, Typography} from '@mui/material';
import NavMenu from './NavMenu';

// Background mixes the primary-dark token with 25% black via color-mix
// so the AppBar still tracks the OS scheme. The carbon-fiber texture is
// a `:before` overlay implemented via Tailwind v4 arbitrary variants.
export default function Header() {
	return (
		<header role="banner">
			<AppBar
				component="nav"
				color="primary"
				aria-label="main navigation"
				className="py-2 border-b-4 border-secondary-500 bg-primary-950 before:absolute before:inset-0 before:content-[''] before:bg-[url(/carbon-fiber-texture.png)] before:bg-cover before:opacity-5">
				<Toolbar>
					<Grid container spacing={1} className="items-center w-full">
						<Grid>
							<Link href="/" color="inherit" className="no-underline **:font-display! **:text-[48px]!">
								<Typography component="h1">
									EFF<Typography component="span" className="opacity-100 px-1 text-secondary-light">ONE</Typography>HUB
								</Typography>
							</Link>
						</Grid>
						<Grid size="grow"/>
						<NavMenu/>
					</Grid>
				</Toolbar>
			</AppBar>
			<Toolbar className="my-4"/>
		</header>
	);
}