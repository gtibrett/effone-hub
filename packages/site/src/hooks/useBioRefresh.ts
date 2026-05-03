/**
 * useBioRefresh — fire-and-forget Wikipedia bio refresh.
 *
 * On mount (and when `id` changes) calls GET /api/bio/refresh to lazily
 * populate / validate the cached bio row.  If the server reports that it
 * created or updated the row, the relevant Apollo query is refetched so the
 * UI picks up the new data automatically.
 */
import {useEffect} from 'react';
import {useApolloClient} from '@apollo/client';
import {DriverQuery} from '@/hooks/data/useDriver';
import {TeamQuery} from '@/hooks/data/useTeam';

type BioType = 'driver' | 'team';

type RefreshResponse = {
	status:     'fresh' | 'updated' | 'created' | 'failed';
	updatedAt?: string;
	ttlDays:    number;
	error?:     string;
};

export default function useBioRefresh(
	type: BioType,
	id?: string | null,
	// isCurrentSeason is informational only — TTL is computed server-side.
	// We keep the param so callers can document their intent.
	_isCurrentSeason?: boolean
): void {
	const client = useApolloClient();

	useEffect(() => {
		if (!id) return;

		let cancelled = false;

		async function refresh() {
			try {
				const res = await fetch(`/api/bio/refresh?type=${type}&id=${encodeURIComponent(id as string)}`);
				if (cancelled) return;

				if (!res.ok) return;

				const data: RefreshResponse = await res.json();
				if (data.status === 'created' || data.status === 'updated') {
					const query = type === 'driver' ? DriverQuery : TeamQuery;
					await client.refetchQueries({include: [query]});
				}
			} catch {
				// Fire-and-forget — swallow network errors silently.
			}
		}

		void refresh();

		return () => {
			cancelled = true;
		};
	}, [type, id, client]);
}
