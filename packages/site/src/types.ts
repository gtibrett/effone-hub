import {Driver, Maybe, Team} from '@/gql/graphql';

export type DriverId = Maybe<Driver['driverId']> | undefined;
export type TeamId = Team['teamId'];