import {Response} from 'express';
import connection from '../db/connection';

export const refreshMaterializedView = (view: string) => (
	async (): Promise<{ view: string, status: boolean, error?: any }> => {
		try {
			await connection.query(`REFRESH MATERIALIZED VIEW "${view}"`);
			return {view, status: true};
		} catch (error: any) {
			return {view, status: false, error};
		}
	}
);

export const refreshAll = (res: Response) => {
	Promise.all([
		       refreshMaterializedView('driverCurrentTeam')(),
		       refreshMaterializedView('driverStandingsBySeason')(),
		       refreshMaterializedView('driverTeams')(),
		       refreshMaterializedView('finalTeamStandingsByYear')(),
		       refreshMaterializedView('lapTimesWithStart')(),
		       refreshMaterializedView('nextRaceBySeason')(),
		       refreshMaterializedView('seasonsStatus')()
	       ])
	       .then((views) => {
		       res.json(views);
	       })
	       .catch(error => {
		       res.json({status: 'error', error});
	       });
};