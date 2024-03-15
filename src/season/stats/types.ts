import {StatCardBaseProps} from '../../ui-components/stats/StatCard';

export type SeasonStatProps = {
	season: number;
	size?: StatCardBaseProps<any>['size'];
}