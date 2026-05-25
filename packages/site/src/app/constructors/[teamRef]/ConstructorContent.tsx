'use client';

import {useAppState} from '@/components/app';
import {Drivers, History, Season} from '@/components/page/constructor';
import {DriverPodiums, DriverPoints, DriverQualifying} from '@/components/page/constructor/stats';
import {Flag, Page} from '@/components/ui';
import {useGetTeamColor} from '@/hooks';
import {useConstructorData} from '@/hooks/data';
import useTeam from '@/hooks/data/useTeam';
import {Tabs} from '@gtibrett/mui-additions';
import {Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Skeleton, Typography, useTheme} from '@mui/material';

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
	<Grid
        container
        spacing={4}
        sx={{
            alignItems: "center",
            fontSize: '1.5em',
            fontWeight: 'bold'
        }}>
		<Grid><Typography variant="h2">{team.name}</Typography></Grid>
		{team.countryId && <Grid><Flag nationality={team.countryId} size={48}/></Grid>}
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
                sx={{
                    order: {xs: 2, md: 1}
                }}>
				<Card variant="outlined">
					<Skeleton variant="rectangular" height={600}/>
				</Card>
			</Grid>

			<Grid
                size={{
                    xs: 12,
                    md: 4,
                    lg: 3
                }}
                sx={{
                    order: {xs: 1, md: 2}
                }}>
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
						<Divider orientation="horizontal" sx={{my: 1}}/>
						<Skeleton variant="text"/>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
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
			subheader={<><Divider orientation="horizontal" sx={{my: 1}}/></>}
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
            <Grid container spacing={2}>
				<Grid
                    size={{
                        xs: 12,
                        md: isInCurrentSeason ? 8 : 12,
                        lg: isInCurrentSeason ? 9 : 12
                    }}
                    sx={{
                        order: {xs: 2, md: 1}
                    }}>
					{bio?.extract && (
						<Card variant="outlined" sx={{mb: 2, p: 2}}>
							{bio.thumbnailUrl && (
								<Box component="img" src={bio.thumbnailUrl} alt={team.name ?? ''} sx={{float: 'right', ml: 2, mb: 1, width: 120, height: 120, objectFit: 'cover', borderRadius: 1}}/>
							)}
							<Typography variant="body1">{bio.extract}</Typography>
							<Box sx={{clear: 'both'}}/>
						</Card>
					)}
					<Card variant="outlined">
						<Tabs active="history" tabs={tabs}/>
					</Card>
				</Grid>

				{
					isInCurrentSeason && (
						<Grid
                            size={{
                                xs: 12,
                                md: 4,
                                lg: 3
                            }}
                            sx={{
                                order: {xs: 1, md: 2}
                            }}>
							<Card variant="outlined">
								<CardHeader title={`${currentSeason} Season Stats`}/>
								<CardContent>
									<Grid container spacing={2}>
										<DriverPoints constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverPoints constructorId={team.rowId} season={currentSeason} place={2}/>
										<Grid size={12}><Typography variant="h4">Podiums</Typography></Grid>
										<DriverPodiums constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverPodiums constructorId={team.rowId} season={currentSeason} place={2}/>
										<Grid size={12}><Typography variant="h4">Qualifying Head-to-Head</Typography></Grid>
										<DriverQualifying constructorId={team.rowId} season={currentSeason} place={1}/>
										<DriverQualifying constructorId={team.rowId} season={currentSeason} place={2}/>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					)
				}
			</Grid>
        </Page>
    );
}
