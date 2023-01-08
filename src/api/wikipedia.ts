import wiki, {wikiSummary} from 'wikipedia';

export type CanonicalId = string;

type Drivers = {
	[canonicalId: string]: wikiSummary;
}

const driversData      = localStorage.getItem('drivers') || '{}';
const drivers: Drivers = JSON.parse(driversData);

const getWikiSummary = async (canonicalId: CanonicalId): Promise<wikiSummary> => {
	return new Promise<wikiSummary>(async (resolve, reject) => {
		try {
			const page = await wiki.page(canonicalId);
			resolve(await page.summary());
		}
		catch (error) {
			reject(error);
		}
	});
};

export const getDriverBio = (canonicalId?: CanonicalId): Promise<wikiSummary> => {
	return new Promise<wikiSummary>((resolve, reject) => {
		if (!canonicalId) {
			reject('No ID provided');
		}
		else if (drivers[canonicalId]) {
			resolve(drivers[canonicalId]);
		}
		else {
			getWikiSummary(canonicalId)
				.then(summary => resolve(summary))
				.catch(error => {
					console.error(error);
					reject(error);
				});
		}
	});
};
