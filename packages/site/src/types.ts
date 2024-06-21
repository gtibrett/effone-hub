import {Driver, Maybe, Team} from '@gtibrett/effone-hub-graph-api';

export type DriverId = Maybe<Driver['driverId']> | undefined;
export type TeamId = Team['teamId'];