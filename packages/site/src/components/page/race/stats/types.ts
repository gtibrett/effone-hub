import {StatCardBaseProps} from '@/components/app';

export type RaceStatProps = {
	season: number;
	round: number;
	size?: StatCardBaseProps<any>['size'];
}