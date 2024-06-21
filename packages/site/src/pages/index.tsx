import {useAppState} from '@/components/app';
import {Backdrop} from '@mui/material';
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
		<Backdrop open>{currentSeason}</Backdrop>
	);
}