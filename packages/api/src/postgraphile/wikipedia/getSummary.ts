import {CanonicalId} from './getCanonicalId';
import {WikipediaSummary} from './WikipediaSummary';

export default function getSummary(canonicalId?: CanonicalId): Promise<WikipediaSummary> {
	return new Promise((resolve, reject) => {
		if (!canonicalId) {
			reject('No ID provided');
		} else {
			const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${canonicalId}`;
			fetch(url)
				.then(response => {
					response
						.json()
						.then((summary: WikipediaSummary) => resolve(summary))
						.catch(() => reject(undefined));
				})
				.catch(() => reject(undefined));
		}
	});
}