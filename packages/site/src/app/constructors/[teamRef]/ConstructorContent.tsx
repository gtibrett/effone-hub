'use client';

import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	Grid,
	Skeleton,
	Typography
} from '@mui/material';

import { useAppState } from '@/components/app';
import { Drivers, History, Season } from '@/components/page/constructor';
import { DriverPodiums, DriverPoints, DriverQualifying } from '@/components/page/constructor/stats';
import { Flag, Page, Tabs } from '@/components/ui';
import { useGetTeamColor } from '@/hooks';
import { useConstructorData } from '@/hooks/data';
import useTeam from '@/hooks/data/useTeam';

/**
 * The subset of `Team` fields ConstructorContent reads at the top level.
 * Both the GraphQL `Team` type and the pg-backed `BuildTeamRow` (see
 * `src/app/lib/build-pg.ts`) are structurally assignable to this shape.
 */
export type TeamProp = {
	id: string;
	rowId: string;
	name?: string | null;
	countryId?: string | null;
	colors?: { primaryHex?: string | null } | null;
};

const TeamDetails = ({ team }: { team: TeamProp }) => (
	<Grid container spacing={4} className="items-center text-[1.5em] font-bold">
		<Grid>
			<Typography variant="h2">{team.name}</Typography>
		</Grid>
		{/*{team.countryId && (*/}
		{/*	<Grid>*/}
		{/*		/!* FIXME <Flag nationality={team.countryId} size={48} />*!/ */}
		{/*	</Grid>*/}
		{/*)}*/}
	</Grid>
);

const PageSkeleton = () => (
	<Page title="Loading">
		<Grid container spacing={2}>
			<Grid
				size={{
					xs: 12,
					md: 8,
					lg: 9
				}}
				className="order-2 md:order-1"
			>
				<Card variant="outlined">
					<Skeleton variant="rectangular" height={600} />
				</Card>
			</Grid>

			<Grid
				size={{
					xs: 12,
					md: 4,
					lg: 3
				}}
				className="order-1 md:order-2"
			>
				<Card variant="outlined">
					<CardMedia>
						<Skeleton variant="rectangular" className="h-6 md:h-12" />
					</CardMedia>
					<CardContent>
						<Typography variant="body1">
							<Skeleton variant="text" />
							<Skeleton variant="text" />
							<Skeleton variant="text" />
							<Skeleton variant="text" />
						</Typography>
						<Divider orientation="horizontal" className="my-2" />
						<Skeleton variant="text" />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	</Page>
);

type Props = {
	teamRef: string;
	team: TeamProp | null;
};

export default function ConstructorContent({ teamRef, team }: Props) {
	const getTeamColor = useGetTeamColor();
	const [{ currentSeason }] = useAppState();
	const { data, loading } = useConstructorData(teamRef || '', currentSeason);
	const { team: teamWithBio } = useTeam(teamRef || undefined);

	if (!team || !data?.team || loading) {
		return <PageSkeleton />;
	}

	const isInCurrentSeason =
		typeof data.team.standings.find((s: any) => s.year === currentSeason) !== 'undefined';

	const tabs = [
		{
			id: 'history',
			label: 'History',
			content: <History data={data} loading={loading} />
		},
		{
			id: 'drivers',
			label: 'Drivers',
			content: <Drivers data={data} loading={loading} />
		}
	];

	if (data.team.standings.find((s: any) => s.year === currentSeason)) {
		tabs.push({
			id: 'season',
			label: `${currentSeason} Season`,
			content: <Season data={data} loading={loading} season={currentSeason} />
		});
	}

	const bio = teamWithBio?.bio;

	return (
		<Page
			title={<TeamDetails team={team} />}
			subheader={
				<>
					<Divider orientation="horizontal" className="my-2" />
				</>
			}
			headerProps={{
				className: 'relative pt-3'
			}}
			extra={
				<div
					className="absolute inset-0 bottom-auto h-2"
					style={{ background: getTeamColor(team.colors) }}
				/>
			}
		>
			<Grid container spacing={2}>
				<Grid
					size={{
						xs: 12,
						md: isInCurrentSeason ? 8 : 12,
						lg: isInCurrentSeason ? 9 : 12
					}}
					className="order-2 md:order-1"
				>
					{bio?.extract && (
						<Card variant="outlined" className="mb-4 p-4">
							{bio.thumbnailUrl && (
								<Box
									component="img"
									src={bio.thumbnailUrl}
									alt={team.name ?? ''}
									className="float-right ml-4 mb-2 w-[120px] h-[120px] object-cover rounded"
								/>
							)}
							<Typography variant="body1">{bio.extract}</Typography>
							<Box className="clear-both" />
						</Card>
					)}
					<Card variant="outlined">
						<Tabs active="history" tabs={tabs} />
					</Card>
				</Grid>

				{isInCurrentSeason && (
					<Grid
						size={{
							xs: 12,
							md: 4,
							lg: 3
						}}
						className="order-1 md:order-2"
					>
						<Card variant="outlined">
							<CardHeader title={`${currentSeason} Season Stats`} />
							<CardContent>
								<Grid container spacing={2}>
									<DriverPoints
										constructorId={team.rowId}
										season={currentSeason}
										place={1}
									/>
									<DriverPoints
										constructorId={team.rowId}
										season={currentSeason}
										place={2}
									/>
									<Grid size={12}>
										<Typography variant="h4">Podiums</Typography>
									</Grid>
									<DriverPodiums
										constructorId={team.rowId}
										season={currentSeason}
										place={1}
									/>
									<DriverPodiums
										constructorId={team.rowId}
										season={currentSeason}
										place={2}
									/>
									<Grid size={12}>
										<Typography variant="h4">
											Qualifying Head-to-Head
										</Typography>
									</Grid>
									<DriverQualifying
										constructorId={team.rowId}
										season={currentSeason}
										place={1}
									/>
									<DriverQualifying
										constructorId={team.rowId}
										season={currentSeason}
										place={2}
									/>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>
		</Page>
	);
}
