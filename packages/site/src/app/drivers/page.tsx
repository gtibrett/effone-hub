import type {Metadata} from 'next';
import DriversContent from './DriversContent';

export const metadata: Metadata = {
	title: 'Drivers | effOne Hub'
};

export default function DriversPage() {
	return <DriversContent/>;
}
