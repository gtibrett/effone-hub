import type {Metadata} from 'next';
import SeasonsContent from './SeasonsContent';

export const metadata: Metadata = {
	title: 'Past Seasons | effOne Hub'
};

export default function SeasonsPage() {
	return <SeasonsContent/>;
}
