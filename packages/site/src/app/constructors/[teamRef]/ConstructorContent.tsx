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
	Stack,
	Typography
} from '@mui/material';

import type { TeamRecord } from '@/app/lib/cached-data';
import { useAppState } from '@/components/app';
import { Drivers, History, Season } from '@/components/page/constructor';
import { DriverPodiums, DriverPoints, DriverQualifying } from '@/components/page/constructor/stats';
import { Flag, Page, Tabs } from '@/components/ui';
import { Header } from '@/components/ui/page/Header';
import { useGetTeamColor } from '@/hooks';
import { useConstructorData } from '@/hooks/data';
import useTeam from '@/hooks/data/useTeam';

const TeamDetails = ({ team }: { team: TeamRecord }) => (
	<Grid container spacing={4} className="items-center text-[1.5em] font-bold">
		<Grid>
			<Typography variant="h2">{team.name}</Typography>
		</Grid>
		{team.country && (
			<Grid>
				<Flag nationality={team.country} size={48} />
			</Grid>
		)}
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
	team: TeamRecord | null;
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
		typeof data.team.standings.find(s => s.year === currentSeason) !== 'undefined';

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

	if (isInCurrentSeason) {
		tabs.push({
			id: 'season',
			label: `${currentSeason} Season`,
			content: <Season teamId={teamRef} season={currentSeason} />
		});
	}

	const bio = teamWithBio?.bio;

	return (
		<Page
			header={
				<Grid container spacing={2} className="items-stretch">
					<Grid size="grow">
						<Header
							title={<TeamDetails team={team} />}
							subheader={
								<>
									<Divider orientation="horizontal" className="my-2" />
									{bio?.extract && (
										<Typography variant="body1">{bio.extract}</Typography>
									)}
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
						/>
					</Grid>
					{bio?.thumbnailUrl && (
						<Grid size={{ xs: 0, md: 2 }}>
							<Box
								component="img"
								src={bio.thumbnailUrl}
								alt={team.name ?? ''}
								className="w-full aspect-square object-contain rounded"
							/>
						</Grid>
					)}
				</Grid>
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
								<Stack spacing={2}>
									<DriverPoints
										constructorId={team.id}
										season={currentSeason}
										place={1}
									/>
									<DriverPoints
										constructorId={team.id}
										season={currentSeason}
										place={2}
									/>
									<Grid size={12}>
										<Typography variant="h4">Podiums</Typography>
									</Grid>
									<DriverPodiums
										constructorId={team.id}
										season={currentSeason}
										place={1}
									/>
									<DriverPodiums
										constructorId={team.id}
										season={currentSeason}
										place={2}
									/>
									<Grid size={12}>
										<Typography variant="h4">
											Qualifying Head-to-Head
										</Typography>
									</Grid>
									<DriverQualifying
										constructorId={team.id}
										season={currentSeason}
										place={1}
									/>
									<DriverQualifying
										constructorId={team.id}
										season={currentSeason}
										place={2}
									/>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>
		</Page>
	);
}
