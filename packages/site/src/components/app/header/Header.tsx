import {AppBar, Link, Toolbar, Typography} from '@/components/ui';
import {darken} from '@/lib/color';
import {blueGrey} from '@/lib/muiColors';
import NavMenu from './NavMenu';

export default function Header() {
	// Brand bar is intentionally fixed (mode-independent) — same dark
	// blueGrey + carbon-fiber overlay in both light and dark. The
	// `secondary` highlight slice underneath comes from AppBar's
	// built-in `after:` pseudo-element.
	const headerBg = darken(blueGrey[900], .25);
	
	return (
		<>
			<header role="banner" className="py-2 sticky z-10" style={{background: headerBg}}>
				<AppBar
					component="nav"
					aria-label="main navigation"
				>
					<Toolbar className="gap-2 py-3">
						<Link href="/" color="inherit" className="no-underline hover:no-underline **:font-anton **:text-[48px]">
							<Typography component="h1">
								EFF<Typography component="span" className="mx-1.5 text-secondary">ONE</Typography>HUB
							</Typography>
						</Link>
						<div className="flex-1"/>
						<NavMenu/>
					</Toolbar>
					<div className="absolute inset-0 bg-cover opacity-25 pointer-events-none" style={{backgroundImage: "url('/carbon-fiber-texture.png')"}}/>
				</AppBar>
			</header>
			<Toolbar className="my-4"/>
		</>
	);
}
