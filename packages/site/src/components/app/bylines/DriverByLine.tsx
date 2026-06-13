import { memo } from 'react';
import { Grid, Link, Skeleton, Typography } from '@mui/material';

import { Flag, type FlagProps } from '@/components/ui';
import type { Driver } from '@/gql/graphql';
import { useDriver } from '@/hooks/data';
import type { DriverId } from '@/types';

import { DriverAvatar, type DriverAvatarProps } from '../avatars';

type BaseByLineProps = {
	variant?: 'code' | 'code-link' | 'name' | 'full' | 'link';
	avatarProps?: Omit<DriverAvatarProps, 'driverId'>;
	flagProps?: Omit<FlagProps, 'nationality'>;
	noFlag?: undefined | true;
};

type ByLinePropsById = BaseByLineProps & {
	id?: DriverId;
};

type ByLinePropsByDriver = BaseByLineProps & {
	driver?: Pick<Driver, 'id' | 'firstName' | 'lastName' | 'nationalityCountry' | 'abbreviation'>;
};

const DriverSkeleton = ({ variant = 'full', avatarProps = {} }: BaseByLineProps) => {
	switch (variant) {
		case 'code':
			return <Skeleton variant="text" width="3em" />;
		case 'name':
		case 'link':
			return <Skeleton variant="text" />;

		case 'full':
			return (
				<Grid container spacing={1} className="items-center flex-nowrap">
					<Grid className="hidden sm:block">
						<DriverAvatar driverId={undefined} {...avatarProps} />
					</Grid>
					<Grid>
						<Typography>
							<Skeleton />
						</Typography>
					</Grid>
				</Grid>
			);
	}

	return null;
};

const ById = ({ id, ...props }: ByLinePropsById) => {
	const driver = useDriver(id);

	return <ByDriver driver={driver} {...props} />;
};

const ByDriver = (props: ByLinePropsByDriver) => {
	const { driver, variant = 'full', noFlag, avatarProps = {}, flagProps = { size: 16 } } = props;

	if (!driver) {
		return <DriverSkeleton variant={variant} avatarProps={avatarProps} flagProps={flagProps} />;
	}

	const { id, firstName, lastName, nationalityCountry, abbreviation } = driver;
	const name = `${firstName} ${lastName}`;

	switch (variant) {
		case 'code':
			return <>{abbreviation}</>;
		case 'code-link':
			return (
				<Link className="font-bold" href={`/drivers/${id}`}>
					{abbreviation}
				</Link>
			);
		case 'name':
			return <>{name}</>;
		case 'link':
			return <Link href={`/drivers/${id}`}>{name}</Link>;

		case 'full':
			return (
				<Grid container spacing={1} className="items-center flex-nowrap">
					<Grid className="hidden sm:block">
						<DriverAvatar driverId={id} {...avatarProps} />
					</Grid>
					<Grid>
						<Typography>
							<Link href={`/drivers/${id}`}>{name}</Link>
						</Typography>
					</Grid>
					{!noFlag && nationalityCountry && (
						<Grid className="hidden md:block">
							<Typography>
								<Flag nationality={nationalityCountry} {...flagProps} />
							</Typography>
						</Grid>
					)}
				</Grid>
			);
	}

	return null;
};

export function isByDriver(
	props: ByLinePropsById | ByLinePropsByDriver
): props is ByLinePropsByDriver {
	return typeof (props as ByLinePropsById).id === 'undefined';
}

function DriverByLine(props: ByLinePropsById | ByLinePropsByDriver) {
	return isByDriver(props) ? <ByDriver {...props} /> : <ById {...props} />;
}

export default memo(DriverByLine);
