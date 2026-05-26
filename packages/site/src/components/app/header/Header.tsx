import Image from 'next/image';
import { AppBar, Grid, Link, Toolbar, Typography } from '@mui/material';

import { CarbonFiberOverlay } from '@/components/ui';

import NavMenu from './NavMenu';

export default function Header() {
	return (
		<header role="banner">
			<AppBar
				component="nav"
				color="primary"
				aria-label="main navigation"
				className="py-2 border-b-4 border-secondary bg-primary-950"
			>
				<CarbonFiberOverlay />
				<Toolbar>
					<Grid container spacing={1} className="items-center w-full">
						<Grid>
							<Link
								href="/"
								color="inherit"
								className="no-underline **:font-display! **:text-[48px]!"
							>
								<Typography component="h1">
									EFF
									<Typography
										component="span"
										className="opacity-100 px-1 text-secondary"
									>
										ONE
									</Typography>
									HUB
								</Typography>
							</Link>
						</Grid>
						<Grid size="grow" />
						<NavMenu />
					</Grid>
				</Toolbar>
			</AppBar>
			<Toolbar className="my-5" />
		</header>
	);
}
