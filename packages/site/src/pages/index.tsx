import {useAppState} from '@/components/app';
import {Page} from '@/components/ui';
import {Skeleton} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function HomePage() {
	const [state]         = useAppState();
	const {currentSeason} = state;
	const router          = useRouter();
	
	useEffect(() => {
		if (currentSeason) {
			router.push(`/${currentSeason}`);
		}
	});
	
	return (
		<Page title="Loading...">
			<Skeleton variant="rectangular" height="60vh"/>
		</Page>
	);
}