'use client';

import {useTheme} from '@/lib/theme';

import {useAppState} from '@/components/app';
import {Drivers, History, Season} from '@/components/page/constructor';
import {DriverPodiums, DriverPoints, DriverQualifying} from '@/components/page/constructor/stats';
import {Flag, Page, Tabs, Card, CardContent, CardHeader, Skeleton, Typography} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
import {useConstructorData} from '@/hooks/data';
import useTeam from '@/hooks/data/useTeam';
    
import {CardMedia} from '@mui/material';
/**
 * The subset of `Team` fields ConstructorContent reads at the top level.
 * Both the GraphQL `Team` type and the pg-backed `BuildTeamRow` (see
 * `src/app/lib/build-pg.ts`) are structurally assignable to this shape.
 */
export type TeamProp = {
	id:        string;
	rowId:     string;
	name?:     string | null;
	countryId?: string | null;
	colors?:   {primaryHex?: string | null} | null;
};

const TeamDetails = ({team}: {team: TeamProp}) => (
	<div className="flex flex-row flex-wrap gap-8 items-center text-[1.5em] font-bold">
		<div><Typography variant="h2">{team.name}</Typography></div>
		{team.countryId && <div><Flag nationality={team.countryId} size={48}/></div>}
	</div>
);

const PageSkeleton = () => (
	<Page title="Loading">
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 md:col-span-8 lg:col-span-9 order-2 md:order-1">
				<Card variant="outlined">
					<Skeleton variant="rectangular" height={600}/>
				</Card>
			</div>

			<div className="col-span-12 md:col-span-4 lg:col-span-3 order-1 md:order-2">
				<Card variant="outlined">
					<CardMedia>
						<Skeleton variant="rectangular" sx={{height: {xs: 24, md: 48}}}/>
					</CardMedia>
					<CardContent>
						<Typography variant="body1">
							<Skeleton variant="text"/>
							<Skeleton variant="text"/>
							<Skeleton variant="text"/>
							<Skeleton variant="text"/>
						</Typography>
						<div className="border-t my-2"/>
						<Skeleton variant="text"/>
					</CardContent>
				</Card>
			</div>
		</div>
	</Page>
);

type Props = {
	teamRef: string;
	team:    TeamProp | null;
};

export default function ConstructorContent({teamRef, team}: Props) {
	const theme               = useTheme();
	const getTeamColor        = useGetTeamColor();
	const [{currentSeason}]   = useAppState();
	const {data, loading}     = useConstructorData(teamRef || '', currentSeason);
	const {team: teamWithBio} = useTeam(teamRef || undefined);

	if (!team || !data?.team || loading) {
		return <PageSkeleton/>;
	}

	const isInCurrentSeason = typeof data.team.standings.nodes.find((s: any) => s.year === currentSeason) !== 'undefined';

	const tabs = [
		{
			id:      'history', label: 'History',
			content: <History data={data} loading={loading}/>
		},
		{
			id:      'drivers', label: 'Drivers',
			content: <Drivers data={data} loading={loading}/>
		}
	];

	if (data.team.standings.nodes.find((s: any) => s.year === currentSeason)) {
		tabs.push({
			id:      'season', label: `${currentSeason} Season`,
			content: <Season data={data} loading={loading} season={currentSeason}/>
		});
	}

	const bio = teamWithBio?.bio;

	return (
		<Page
			title={<TeamDetails team={team}/>}
			subheader={<><div className="border-t my-2"/></>}
			headerProps={{
				sx: {
					position:   'relative',
					pt:         3,
					'&:before': {
						position:   'absolute',
						left:       0,
						top:        0,
						bottom:     'auto',
						width:      '100%',
						height:     theme.spacing(2),
						content:    '" "',
						background: getTeamColor({primary: team.colors?.primaryHex} as any)
					}
				}
			}}
		>
			<div className="grid grid-cols-12 gap-4">
				<div className={`col-span-12 ${isInCurrentSeason ? 'md:col-span-8 lg:col-span-9' : 'md:col-span-12 lg:col-span-12'} order-2 md:order-1`}>
					{bio?.extract && (
						<Card variant="outlined" sx={{mb: 2, p: 2}}>
							{bio.thumbnailUrl && (
								<img src={bio.thumbnailUrl} alt={team.name ?? ''} className="float-right ml-4 mb-2 w-[120px] h-[120px] object-cover rounded-sm"/>
							)}
							<Typography variant="body1">{bio.extract}</Typography>
							<div className="clear-both"/>
						</Card>
					)}
					<Card variant="outlined">
						<Tabs active="history" tabs={tabs}/>
					</Card>
				</div>

				{
					isInCurrentSeason && (
						<div className="col-span-12 md:col-span-4 lg:col-span-3 order-1 md:order-2">
							<Card variant="outlined">
								<CardHeader title={`${currentSeason} Season Stats`}/>
								<CardContent>
									<div className="grid grid-cols-12 gap-4">
										<DriverPoints constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverPoints constructorId={team.rowId} season={currentSeason} place={2}/>
										<div className="col-span-12"><Typography variant="h4">Podiums</Typography></div>
										<DriverPodiums constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverPodiums constructorId={team.rowId} season={currentSeason} place={2}/>
										<div className="col-span-12"><Typography variant="h4">Qualifying Head-to-Head</Typography></div>
										<DriverQualifying constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverQualifying constructorId={team.rowId} season={currentSeason} place={2}/>
									</div>
								</CardContent>
							</Card>
						</div>
					)
				}
			</div>
		</Page>
	);
}
