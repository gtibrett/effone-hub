import type { ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, type CardProps, Grid, Link, Typography } from '@mui/material';

import { ConstructorAvatar, DriverAvatar, DriverByLine } from '@/components/app';
import type { Maybe } from '@/gql/graphql';
import { useGetTeamColor, useLeaderData } from '@/hooks';
import { useDriver, useTeam } from '@/hooks/data';

import convertGenericMapToDataWithValueMap from './convertGenericMapToDataWithValueMap';
import StatCardContent from './StatCardContent';
import type { DataWithValue, StatFormatter } from './types';

export type StatCardData = DataWithValue | number | Maybe<number>;

export type StatCardBaseProps<T extends StatCardData, F extends DataWithValue = DataWithValue> = {
	label: string;
	loading: boolean;
	cardProps?: CardProps;
	noGrid?: boolean;
	size?: 'regular' | 'small';
	format?: StatFormatter<F>;
	extra?: ReactNode | StatFormatter<F>;
	data: Map<string, T>;
};

type DriverStatCardProps<
	T extends StatCardData,
	F extends DataWithValue = DataWithValue
> = StatCardBaseProps<T, F> & {
	variant?: 'driver';
};

type TeamStatCardProps<
	T extends StatCardData,
	F extends DataWithValue = DataWithValue
> = StatCardBaseProps<T, F> & {
	variant: 'team';
};

type IconStatCardProps<
	T extends StatCardData,
	F extends DataWithValue = DataWithValue
> = StatCardBaseProps<T, F> & {
	variant: 'icon';
	icon: IconDefinition;
};

type StatCardProps<T extends StatCardData, F extends DataWithValue = DataWithValue> =
	| DriverStatCardProps<T, F>
	| TeamStatCardProps<T, F>
	| IconStatCardProps<T, F>;

const DriverVariant = <T extends DataWithValue>({
	size,
	label,
	data,
	format,
	extra
}: DriverStatCardProps<T, T>) => {
	const getTeamColor = useGetTeamColor();
	const [driverId, value] = useLeaderData<T>(data);
	const driver = useDriver(driverId);

	if (!driver) {
		return null;
	}

	return (
		<StatCardContent<T>
			size={size}
			avatar={<DriverAvatar driverId={driverId} size={64} />}
			title={<DriverByLine id={driverId} variant={size === 'small' ? 'code-link' : 'link'} />}
			label={label}
			color={getTeamColor(driver?.seasonEntrantDrivers?.[0]?.team?.colors, 'primaryHex')}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

const TeamVariant = <T extends DataWithValue>({
	size,
	label,
	data,
	format,
	extra
}: TeamStatCardProps<T, T>) => {
	const [teamId, value] = useLeaderData<T>(data);
	const { team } = useTeam(teamId);

	if (!team) {
		return null;
	}

	const { name, id: constructorRef } = team;

	return (
		<StatCardContent<T>
			size={size}
			avatar={<ConstructorAvatar teamId={teamId} size={64} />}
			title={<Link href={`/constructors/${constructorRef}`}>{name}</Link>}
			label={label}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

const IconVariant = <T extends DataWithValue>({
	size,
	label,
	data,
	format,
	extra,
	icon = faSquare
}: IconStatCardProps<T, T>) => {
	const [, value] = useLeaderData<T>(data);

	return (
		<StatCardContent<T>
			size={size}
			avatar={
				<Box className="text-[48px] leading-none mt-2 [&_path]:fill-transparent [&_path]:stroke-primary-light [&_path]:[stroke-width:10]">
					<FontAwesomeIcon icon={icon} width={64} />
				</Box>
			}
			title={<Typography noWrap>{label}</Typography>}
			data={value}
			format={format}
			extra={extra}
		/>
	);
};

export default function StatCard<
	T extends StatCardData = DataWithValue,
	F extends DataWithValue = DataWithValue
>(props: StatCardProps<T, F>) {
	const { variant, size, noGrid, cardProps = {}, loading, data } = props;
	const { className, ...otherCardProps } = cardProps;
	const normalizedData = convertGenericMapToDataWithValueMap<T, F>(data) as Map<string, F>;

	if (loading || !data.size) {
		return null;
	}

	let content: ReactNode;
	switch (variant) {
		case 'icon':
			content = <IconVariant {...props} data={normalizedData} />;
			break;

		case 'team':
			content = <TeamVariant {...props} data={normalizedData} />;
			break;

		default:
			content = <DriverVariant {...props} data={normalizedData} />;
			break;
	}

	let card: ReactNode;
	switch (size) {
		case 'small':
			card = (
				<Card
					variant="elevation"
					className={`h-[66px] rounded-lg p-0 overflow-hidden border border-background ${className ?? ''}`}
					{...otherCardProps}
				>
					{content}
				</Card>
			);
			break;

		default:
			card = (
				<Card
					variant="elevation"
					className={`h-full ${className ?? ''}`}
					{...otherCardProps}
				>
					{content}
				</Card>
			);
			break;
	}

	return noGrid ? card : <Grid size="grow">{card}</Grid>;
}
