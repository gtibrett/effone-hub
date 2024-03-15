import {StatCardBaseProps} from '../../ui-components/stats/StatCard';

export type RaceStatProps = {
	season: number;
	round: number;
	size?: StatCardBaseProps<any>['size'];
}