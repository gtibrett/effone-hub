export type CanonicalId = string;
export default function getCanonicalId(url: string | undefined): CanonicalId | undefined {
	if (typeof url === 'undefined') {
		return undefined;
	}
	const urlParts    = url.split('/');
	const canonicalId = urlParts.pop();
	
	return canonicalId ? decodeURI(canonicalId) : undefined;
}