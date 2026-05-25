'use client';

import {Data, Dependencies, Mission, Repositories} from '@/components/page/about';
import {Page} from '@/components/ui';
import {Grid} from '@mui/material';

export default function AboutContent() {
	return (
        <Page title="About effOne Hub">
            <Grid container spacing={2}>
				<Grid
                    size={{
                        xs: 12,
                        md: 9
                    }}>
					<Grid container spacing={2} alignItems="strech">
						<Grid size={12}>
							<Mission/>
						</Grid>

						<Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
							<Data/>
						</Grid>

						<Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}>
							<Repositories/>
						</Grid>
					</Grid>
				</Grid>

				<Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}>
					<Dependencies/>
				</Grid>
			</Grid>
        </Page>
    );
}
