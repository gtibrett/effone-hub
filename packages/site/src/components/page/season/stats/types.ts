import {StatCardBaseProps} from '@/components/app';

export type SeasonStatProps = {
	season: number;
	size?: StatCardBaseProps<any>['size'];
}