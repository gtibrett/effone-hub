'use client';

import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { Driver, Team } from '@/gql/graphql';

export type DriverDisplay = {
	id: string;
	firstName?: string | null;
	lastName?: string | null;
	abbreviation?: string | null;
	thumbnailUrl?: string | null;
	nationalityCountry?: Driver['nationalityCountry'];
	teamColors?: Team['colors'];
};

export type TeamDisplay = {
	id: string;
	name?: string | null;
	thumbnailUrl?: string | null;
	colors?: Team['colors'];
};

type EntityDisplayContextValue = {
	drivers: Map<string, DriverDisplay>;
	teams: Map<string, TeamDisplay>;
};

const EntityDisplayContext = createContext<EntityDisplayContextValue>({
	drivers: new Map(),
	teams: new Map()
});

export const EntityDisplayProvider: FC<
	PropsWithChildren<{ drivers?: DriverDisplay[]; teams?: TeamDisplay[] }>
> = ({ drivers = [], teams = [], children }) => {
	const driverMap = useMemo(() => new Map(drivers.map(d => [d.id, d])), [drivers]);
	const teamMap = useMemo(() => new Map(teams.map(t => [t.id, t])), [teams]);

	const value = useMemo(() => ({ drivers: driverMap, teams: teamMap }), [driverMap, teamMap]);

	return <EntityDisplayContext.Provider value={value}>{children}</EntityDisplayContext.Provider>;
};

export function useDriverDisplay(id?: string | null): DriverDisplay | undefined {
	const ctx = useContext(EntityDisplayContext);
	return ctx.drivers.get(id ?? '') ?? undefined;
}

export function useTeamDisplay(id?: string | null): TeamDisplay | undefined {
	const ctx = useContext(EntityDisplayContext);
	return ctx.teams.get(id ?? '') ?? undefined;
}

export function driverToDisplay(d?: Driver | null): DriverDisplay | undefined {
	if (!d) return undefined;
	return {
		id: d.id,
		firstName: d.firstName,
		lastName: d.lastName,
		abbreviation: d.abbreviation,
		thumbnailUrl: d.bio?.thumbnailUrl,
		nationalityCountry: d.nationalityCountry,
		teamColors: d.seasonEntrantDrivers?.[0]?.team?.colors
	};
}

export function teamToDisplay(t?: Team | null): TeamDisplay | undefined {
	if (!t) return undefined;
	return {
		id: t.id,
		name: t.name,
		thumbnailUrl: t.bio?.thumbnailUrl,
		colors: t.colors
	};
}
