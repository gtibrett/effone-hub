import {useGetTeamColor, useTeam} from '@effonehub/constructor';
import ConstructorAvatar from '@effonehub/constructor/ConstructorAvatar';
import {DriverAvatar, DriverByLine, useDriver} from '@effonehub/driver';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Box, Card, CardProps, Grid, Typography, useTheme} from '@mui/material';
import {Maybe} from '@gtibrett/effone-hub-graph-api/types';
import {ReactNode} from 'react';
import convertGenericMapToDataWithValueMap from './convertGenericMapToDataWithValueMap';
import StatCardContent from './StatCardContent';
import {DataWithValue, StatFormatter} from './types';
import useLeaderData from './useLeaderData';

export type StatCardData = DataWithValue | number | Maybe<number>;

export type StatCardBaseProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = {
	label: string;
	loading: boolean;
	cardProps?: CardProps;
	noGrid?: boolean;
	size?: 'regular' | 'small'
	format?: StatFormatter<F>;
	extra?: ReactNode | StatFormatter<F>;
	data: Map<number, T>;
};

type DriverStatCardProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = StatCardBaseProps<T, F> & {
	variant?: 'driver';
};

type TeamStatCardProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = StatCardBaseProps<T, F> & {
	variant: 'team';
};

type IconStatCardProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = StatCardBaseProps<T, F> & {
	variant: 'icon';
	icon: IconDefinition;
};

type StatCardProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = DriverStatCardProps<T, F> | TeamStatCardProps<T, F> | IconStatCardProps<T, F>;

const DriverVariant = <T extends DataWithValue>({size, label, data, format, extra}: DriverStatCardProps<T, T>) => {
	const getTeamColor      = useGetTeamColor();
	const [driverId, value] = useLeaderData<T>(data);
	const driver            = useDriver(driverId);
	
	if (!driver) {
		return null;
	}
	
	return (
		<StatCardContent<T>
			size={size}
			avatar={<DriverAvatar driverId={driverId} size={64}/>}
			title={<DriverByLine id={driverId} variant={size === 'small' ? 'code-link' : 'link'}/>}
			label={label}
			color={getTeamColor(driver?.currentTeam?.team?.colors, 'primary', false)}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

const TeamVariant = <T extends DataWithValue>({size, label, data, format, extra}: TeamStatCardProps<T, T>) => {
	const [teamId, value] = useLeaderData<T>(data);
	const {team}          = useTeam(teamId);
	
	if (!team) {
		return null;
	}
	
	const {name, constructorRef} = team;
	
	return (
		<StatCardContent<T>
			size={size}
			avatar={<ConstructorAvatar teamId={teamId} size={64}/>}
			title={<Link href={`/constructor/${constructorRef}`}>{name}</Link>}
			label={label}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

const IconVariant = <T extends DataWithValue>({size, label, data, format, extra, icon = faSquare}: IconStatCardProps<T, T>) => {
	const theme     = useTheme();
	const [, value] = useLeaderData<T>(data);
	
	const sx = {
		fontSize:   48,
		lineHeight: 1,
		mt:         1,
		'& path':   {
			fill:   'transparent',
			stroke: theme.palette.primary.light, strokeWidth: 10
		}
	};
	
	return (
		<StatCardContent<T>
			size={size}
			avatar={<Box sx={sx}><FontAwesomeIcon icon={icon} width={64}/></Box>}
			title={<Typography noWrap>{label}</Typography>}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

export default function StatCard<T extends StatCardData = DataWithValue, F extends DataWithValue = DataWithValue>(props: StatCardProps<T, F>) {
	const theme                                                  = useTheme();
	const {variant, size, noGrid, cardProps = {}, loading, data} = props;
	const {sx = {}, ...otherCardProps}                           = cardProps;
	const normalizedData                                         = convertGenericMapToDataWithValueMap<T, F>(data);
	
	if (loading || !data.size) {
		return null;
	}
	
	let content: ReactNode;
	switch (variant) {
		case 'icon':
			content = <IconVariant {...props} data={normalizedData}/>;
			break;
		
		case 'team':
			content = <TeamVariant {...props} data={normalizedData}/>;
			break;
		
		case 'driver':
		default:
			content = <DriverVariant {...props} data={normalizedData}/>;
			break;
	}
	
	let card: ReactNode;
	switch (size) {
		case 'small':
			const circularSx = {
				height:       66,
				borderRadius: 2,
				p:            0,
				overflow:     'hidden',
				border:       `${theme.spacing(.125)} solid ${theme.palette.background.default}`
			};
			
			card = (
				<Card variant="elevation" sx={{...circularSx, ...sx}} {...otherCardProps}>
					{content}
				</Card>
			);
			break;
		
		case 'regular':
		default:
			card = (
				<Card variant="elevation" sx={{height: '100%', ...sx}} {...otherCardProps}>
					{content}
				</Card>
			);
			break;
	}
	
	return noGrid ? card : <Grid item xs>{card}</Grid>;
}