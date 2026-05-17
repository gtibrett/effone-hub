import {RaceResult} from '@/gql/graphql';
import Place from './Place';

export default function Podium({results}: {
	results: RaceResult[]
}) {
	if (!results?.length) {
		return null;
	}

	const [p1, p2, p3] = results;

	return (
		<>
			{
				[p1, p2, p3].map((p, i) => p.driver && (
						<div key={p.driver.rowId}>
							<Place driverId={p.driver.rowId} place={i + 1} sx={{height: '100%'}}/>
						</div>
					)
				)
			}
		</>
	);
};
