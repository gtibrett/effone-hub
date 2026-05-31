import { Grid } from '@mui/material';

import { RaceResult } from '@/gql/graphql';

import Place from './Place';

export default function Podium({ results }: { results: RaceResult[] }) {
	if (!results?.length) {
		return null;
	}

	const [p1, p2, p3] = results;

	return (
		<>
			{[p1, p2, p3].map(
				(p, i) =>
					p.driver && (
						<Grid key={p.driver.id}>
							<Place driverId={p.driver.id} place={i + 1} className="h-full" />
						</Grid>
					)
			)}
		</>
	);
}
