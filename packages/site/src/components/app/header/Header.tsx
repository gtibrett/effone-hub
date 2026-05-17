import {Link, Typography} from '@/components/ui';
import {AppBar, Toolbar} from '@/components/ui';
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
		<header role="banner">
			<AppBar
				component="nav"
				aria-label="main navigation"
				className="py-2 relative before:absolute before:inset-0 before:content-[''] before:bg-[url('/carbon-fiber-texture.png')] before:bg-cover before:opacity-25"
				style={{background: headerBg}}
			>
				<Toolbar>
					<div className="flex flex-row flex-wrap gap-2 items-center w-full">
						<div>
							<Link href="/" color="inherit" className="no-underline hover:no-underline [&_*]:font-[Anton] [&_*]:text-[48px]">
								<Typography component="h1">
									EFF<Typography component="span" className="opacity-100 px-1 text-secondary brightness-150">ONE</Typography>HUB
								</Typography>
							</Link>
						</div>
						<div className="flex-1"/>
						<NavMenu/>
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar className="my-4"/>
		</header>
	);
}
