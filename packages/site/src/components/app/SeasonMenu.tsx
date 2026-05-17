'use client';

import {Label} from '@/components/ui/shadcn/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/shadcn/select';
import {Season} from '@/gql/graphql';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client/react';

export const SeasonsQuery = gql`
	query SeasonMenuQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				id
				year
			}
		}
	}
`;

type SeasonMenuProps = {
	id:         string;
	variant?:   'normal' | 'simple';
	season:     number;
	setSeason:  (season: number) => void;
	required?:  boolean;
};

export default function SeasonMenu({variant = 'simple', id, season, setSeason, required = true}: SeasonMenuProps) {
	const {data, loading} = useQuery<{seasons: {nodes: Pick<Season, 'year'>[]}}>(SeasonsQuery);
	const seasons = (data?.seasons.nodes ?? [{year: new Date().getFullYear()}]).map(s => s.year);

	if (!seasons.length || loading) {
		return null;
	}

	const ANY_VALUE = '__any__';
	const value     = season === -1 ? ANY_VALUE : String(season);
	const handle    = (next: string) => setSeason(next === ANY_VALUE ? -1 : Number(next));

	const trigger = (
		<SelectTrigger
			id={id}
			aria-label="Season"
			size={variant === 'simple' ? 'sm' : 'default'}
			className="w-full min-w-[120px]"
		>
			<SelectValue placeholder="Season"/>
		</SelectTrigger>
	);

	const items = (
		<SelectContent>
			{!required && <SelectItem value={ANY_VALUE}>Any</SelectItem>}
			{seasons.map(year => (
				<SelectItem key={year} value={String(year)}>{year}</SelectItem>
			))}
		</SelectContent>
	);

	if (variant === 'normal') {
		return (
			<div className="flex w-full flex-col gap-1">
				<Label htmlFor={id}>Season</Label>
				<Select value={value} onValueChange={handle}>
					{trigger}
					{items}
				</Select>
			</div>
		);
	}

	return (
		<Select value={value} onValueChange={handle}>
			{trigger}
			{items}
		</Select>
	);
}
