'use client';

import {Data, Dependencies, Mission, Repositories} from '@/components/page/about';
import {Page} from '@/components/ui';
import {Button as ShadcnButton} from '@/components/ui/shadcn/button';
import {Button as MuiButton, Grid} from '@mui/material';

export default function AboutContent() {
	return (
		<Page title="About effOne Hub">
			{/* M1 coexistence smoke test — both render side-by-side.
			    Remove after the migration moves past M1. */}
			<div className="flex items-center gap-4 p-4 border border-dashed">
				<span className="text-sm">M1 smoke test:</span>
				<ShadcnButton>shadcn Button</ShadcnButton>
				<MuiButton variant="contained">MUI Button</MuiButton>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={12} md={9}>
					<Grid container spacing={2} alignItems="strech">
						<Grid item xs={12}>
							<Mission/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Data/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Repositories/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} md={3}>
					<Dependencies/>
				</Grid>
			</Grid>
		</Page>
	);
}
