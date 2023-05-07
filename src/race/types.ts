import {Race} from '@gtibrett/effone-hub-api';

export type DateAndTime = Pick<Race, 'date' | 'time'>;

export type RaceWithTimes = Race & {
	FirstPractice?: DateAndTime;
	SecondPractice?: DateAndTime;
	ThirdPractice?: DateAndTime;
	Qualifying?: DateAndTime;
}