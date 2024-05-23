import {Race} from '@gtibrett/effone-hub-graph-api';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';

export type ScheduleEvent = {
	label: string;
	date?: Maybe<string> | undefined;
	time?: Maybe<string> | undefined;
	conditional?: boolean;
	asDate: Date;
	timeTo: number;
}

const getTimeTo = (date?: Maybe<string>, time?: Maybe<string>) => Math.floor(((new Date(`${date} ${time} UTC`)).getTime() - (new Date()).getTime()) / 1000);

export default function useRaceScheduleEvents(race: Race): Omit<ScheduleEvent, 'conditional'>[] {
	const {
		      fp1Date, fp1Time,
		      fp2Date, fp2Time,
		      fp3Date, fp3Time,
		      qualiDate, qualiTime,
		      sprintDate, sprintTime,
		      date, time
	      } = race;
	
	const isSprint = (!!sprintDate && !!sprintTime);
	
	return [
		{label: 'FP1', date: fp1Date, time: fp1Time, conditional: isSprint || !isSprint},
		{label: 'FP2', date: fp2Date, time: fp2Time, conditional: !isSprint},
		{label: 'FP3', date: fp3Date, time: fp3Time, conditional: !isSprint},
		{label: 'Sprint Qual', date: fp2Date, time: fp2Time, conditional: isSprint},
		{label: 'Sprint', date: sprintDate, time: sprintTime, conditional: isSprint},
		{label: 'Qual', date: qualiDate, time: qualiTime, conditional: isSprint || !isSprint},
		{label: 'Race', date, time, conditional: isSprint || !isSprint}
	]
		.filter(({conditional}) => conditional)
		.map(({conditional, ...ev}) => ({
			...ev,
			asDate: new Date(`${ev.date} ${ev.time} UTC`),
			timeTo: getTimeTo(ev.date, ev.time)
		}));
}