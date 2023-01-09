import wiki, {imageResult, wikiSummary} from 'wikipedia';

export type CanonicalId = string;

export const getWikiSummary = (canonicalId?: CanonicalId): Promise<wikiSummary> => {
	return new Promise(async (resolve, reject) => {
		if (!canonicalId) {
			reject('No ID provided');
		}
		else {
			wiki.page(canonicalId, {
				    fields: ['summary', 'images', 'infobox']
			    })
			    .then(async (page) => {
				    page.summary()
				        .then(summary => resolve(summary));
			    })
			    .catch(error => {
				    console.error(error);
				    reject(error);
			    });
		}
	});
};

export const getWiki = (canonicalId?: CanonicalId): Promise<[wikiSummary, imageResult[], any]> => {
	return new Promise(async (resolve, reject) => {
		if (!canonicalId) {
			reject('No ID provided');
		}
		else {
			wiki.page(canonicalId, {
				    fields: ['summary', 'images', 'infobox']
			    })
			    .then((page) => {
				    Promise.all([page.summary(), page.images(), page.infobox()])
				           .then(([summary, images, infobox]) => resolve([summary, images, infobox]));
			    })
			    .catch(error => {
				    console.error(error);
				    reject(error);
			    });
		}
	});
};

export const getWikiImages = (canonicalId?: CanonicalId): Promise<imageResult[]> => {
	return new Promise(async (resolve, reject) => {
		if (!canonicalId) {
			reject('No ID provided');
		}
		else {
			wiki.page(canonicalId)
			    .then(page => {
				    page.images()
				        .then(images => resolve(images));
			    })
			    .catch(error => {
				    console.error(error);
				    reject(error);
			    });
		}
	});
};
