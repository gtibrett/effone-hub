import type { NextRaceQueryNode } from './queries';

// Shape kept compatible with the old Ergast-shaped consumers
// (RaceWeekend.tsx, useRaceScheduleEvents.ts, NextRaceCountdown.tsx,
// NextRaceSchedule.tsx). `url`/`summary` are no longer in F1DB and
// remain undefined; consumers already optional-chain them.
export type NextRace = {
	id: string;
	rowId: number;
	year: number;
	round: number;
	name: string;
	date: string;
	time: string | null;
	fp1Date: string | null;
	fp1Time: string | null;
	fp2Date: string | null;
	fp2Time: string | null;
	fp3Date: string | null;
	fp3Time: string | null;
	qualiDate: string | null;
	qualiTime: string | null;
	sprintDate: string | null;
	sprintTime: string | null;
	url?: undefined;
	summary?: undefined;
	circuit: {
		id: string;
		circuitRef: string;
		fullName: string;
		location: string | null;
		country: string | null;
		lat: number | null;
		lng: number | null;
	} | null;
};

export type NextRaceData = {
	race: NextRace | null;
};

// Maps a raw query node to the NextRace shape.
export function mapToNextRace(node: NextRaceQueryNode): NextRace {
	return {
		id: node.id,
		rowId: node.rowId,
		year: node.year,
		round: node.round,
		name: node.officialName,
		date: node.date,
		time: node.time,
		fp1Date: node.freePractice1Date,
		fp1Time: node.freePractice1Time,
		fp2Date: node.freePractice2Date,
		fp2Time: node.freePractice2Time,
		fp3Date: node.freePractice3Date,
		fp3Time: node.freePractice3Time,
		qualiDate: node.qualifyingDate,
		qualiTime: node.qualifyingTime,
		sprintDate: node.sprintRaceDate,
		sprintTime: node.sprintRaceTime,
		circuit: node.circuit
			? {
					id: node.circuit.id,
					circuitRef: node.circuit.rowId,
					fullName: node.circuit.fullName,
					location: node.circuit.placeName,
					country: node.circuit.countryId,
					lat: node.circuit.latitude,
					lng: node.circuit.longitude
				}
			: null
	};
}

// Finds the first upcoming race (date >= todayISO) and maps it.
// todayISO must be YYYY-MM-DD; wall-clock new Date() is caller's responsibility.
export function selectNextRace(races: NextRaceQueryNode[], todayISO: string): NextRace | null {
	const node = races.find(r => r.date && r.date >= todayISO) ?? null;
	return node ? mapToNextRace(node) : null;
}
