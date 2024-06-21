export type WikipediaImage = {
	source: string;
	width: number;
	height: number;
};

export type WikipediaContentUrl = {
	page: string;
	revisions: string;
	edit: string;
	talk: string;
}

export type FullWikipediaSummary = {
	type: string;
	title: string;
	displaytitle: string;
	namespace: {
		id: number;
		text: string;
	};
	wikibase_item: string;
	titles: {
		canonical: string;
		normalized: string;
		display: string;
	};
	pageid: number;
	thumbnail: WikipediaImage;
	originalimage: WikipediaImage;
	lang: string;
	dir: string;
	revision: string;
	tid: string;
	timestamp: string;
	description: string;
	description_source: string;
	content_urls: {
		desktop: WikipediaContentUrl;
		mobile: WikipediaContentUrl;
	};
	extract: string;
	extract_html: string;
}

export type WikipediaSummary = Pick<FullWikipediaSummary, 'title' | 'description' | 'thumbnail' | 'extract'>;