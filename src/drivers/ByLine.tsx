import {Typography} from '@mui/material';
import {APIResponse} from '../api/Ergast';
import Flag from '../flags/Flag';
import DriverAvatar from './DriverAvatar';

type ByLineProps = {
	driver: APIResponse['Driver'];
}

export default function ByLine({driver}: ByLineProps) {
	const {givenName, familyName, nationality} = driver;
	const name                                 = `${givenName} ${familyName}`;
	
	return (
		<>
			<DriverAvatar driver={driver}/>
			<Typography sx={{pl: 2}}>{name}</Typography>
			<Typography sx={{pl: 2}}><Flag nationality={nationality}/></Typography>
		</>
	);
}