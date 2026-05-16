import {Client} from 'pg';
import {applyTeamRename} from './applyTeamRename';

/**
 * Apply the F1DB dump (one giant SQL string with 47 statements) to a fresh
 * f1db_new schema, then atomically rename it into place. All in one transaction.
 *
 * Steps:
 *   1. Load dump into f1db_new
 *   2. Atomic swap: f1db -> f1db_old -> drop, f1db_new -> f1db
 *   3. Apply constructor->team renames (see applyTeamRename)
 *   4. Recreate app.* computed-column functions that depend on f1db types
 *      (the DROP SCHEMA CASCADE in step 2 drops them)
 *
 * Returns the elapsed wall-clock time.
 */
export async function applyDumpAndSwap(connectionString: string, sql: string): Promise<{durationMs: number}> {
	const client = new Client({connectionString});
	await client.connect();
	const startedAt = Date.now();
	try {
		await client.query('begin');

		// Cold start: drop any half-applied previous attempt.
		await client.query('drop schema if exists f1db_new cascade');
		await client.query('create schema f1db_new');
		await client.query('set local search_path to f1db_new, public');

		// node-postgres simple-query protocol accepts multiple statements per
		// query call. The dump is ~34 MB / ~47 INSERTs; the postgres protocol
		// allows up to 1 GB per statement so this fits comfortably.
		await client.query(sql);

		// Atomic swap.
		await client.query(`
			do $$
			begin
				if exists (select 1 from pg_namespace where nspname = 'f1db') then
					execute 'alter schema f1db rename to f1db_old';
				end if;
				execute 'alter schema f1db_new rename to f1db';
				if exists (select 1 from pg_namespace where nspname = 'f1db_old') then
					execute 'drop schema f1db_old cascade';
				end if;
			end$$;
		`);

		// Rename constructor* -> team* so PostGraphile inflection does not collide
		// with Object.prototype.constructor.
		await applyTeamRename(client);

		// Recreate computed-column functions in `app` that reference f1db types.
		// The DROP SCHEMA f1db_old CASCADE above drops them because they depend
		// on the f1db.season composite type. Keep these in sync with
		// packages/database/migrations/2026_app_schema.sql.
		await client.query(`
			create or replace function app.season_ended(s f1db.season) returns boolean
			    stable language sql as $$
			    with c as (
			        select count(*) as total,
			               count(*) filter (where exists (
			                   select 1 from f1db.race_result rr where rr.race_id = r.id
			               )) as with_results
			        from f1db.race r
			        where r.year = s.year
			    )
			    select total > 0 and total = with_results from c;
			$$;
			create or replace function app.season_has_results(s f1db.season) returns boolean
			    stable language sql as $$
			    select exists (
			        select 1
			        from f1db.race r
			        join f1db.race_result rr on rr.race_id = r.id
			        where r.year = s.year
			    );
			$$;
		`);

		await client.query('commit');
		return {durationMs: Date.now() - startedAt};
	} catch (err) {
		await client.query('rollback').catch(() => {});
		throw err;
	} finally {
		await client.end();
	}
}
