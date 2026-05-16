import {createWriteStream} from 'fs';
import {mkdir, readFile, rm} from 'fs/promises';
import {tmpdir} from 'os';
import {join} from 'path';
import {Readable} from 'stream';
import {finished} from 'stream/promises';
import AdmZip from 'adm-zip';

const REPO = 'f1db/f1db';
const DUMP_ASSET = 'f1db-sql-postgresql-single-inserts.zip';

export type ReleaseInfo = {
	tag: string;
	publishedAt: string;
	dumpUrl: string;
};

/**
 * Look up the latest f1db/f1db release. GitHub's anonymous API allows 60 req/h
 * per IP, which is plenty for a daily cron.
 */
export async function getLatestRelease(): Promise<ReleaseInfo> {
	const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
		headers: {Accept: 'application/vnd.github+json'}
	});
	if (!res.ok) {
		throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
	}
	const json = await res.json() as {tag_name: string; published_at: string; assets: {name: string; browser_download_url: string}[]};
	const asset = json.assets.find(a => a.name === DUMP_ASSET);
	if (!asset) {
		throw new Error(`Asset ${DUMP_ASSET} not found in release ${json.tag_name}`);
	}
	return {
		tag:         json.tag_name,
		publishedAt: json.published_at,
		dumpUrl:     asset.browser_download_url
	};
}

/**
 * Download the release zip into /tmp, unzip it, and return the path to the
 * extracted SQL file. Caller is responsible for calling cleanup() afterward.
 */
export async function downloadDump(release: ReleaseInfo): Promise<{sqlPath: string; cleanup: () => Promise<void>}> {
	const workDir = join(tmpdir(), `f1db-${release.tag}-${Date.now()}`);
	await mkdir(workDir, {recursive: true});
	const zipPath = join(workDir, DUMP_ASSET);

	const res = await fetch(release.dumpUrl);
	if (!res.ok || !res.body) {
		throw new Error(`Download failed ${res.status}`);
	}
	const out = createWriteStream(zipPath);
	await finished(Readable.fromWeb(res.body as never).pipe(out));

	const zip = new AdmZip(zipPath);
	const entries = zip.getEntries();
	const sqlEntry = entries.find(e => e.entryName.endsWith('.sql'));
	if (!sqlEntry) {
		throw new Error('No .sql file in release zip');
	}
	const sqlPath = join(workDir, sqlEntry.entryName);
	zip.extractEntryTo(sqlEntry, workDir, false, true);

	return {
		sqlPath,
		cleanup: () => rm(workDir, {recursive: true, force: true})
	};
}

/** Read a previously-extracted dump file from disk. */
export async function readDump(path: string): Promise<string> {
	return readFile(path, 'utf8');
}
