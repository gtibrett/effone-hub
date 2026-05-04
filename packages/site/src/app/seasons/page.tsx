import type {Metadata} from 'next';
import SeasonsContent from './SeasonsContent';

export const metadata: Metadata = {
	title: 'Past Seasons | effOne Hub'
};

export const revalidate = 86400;

export default function SeasonsPage() {
	return <SeasonsContent/>;
}
