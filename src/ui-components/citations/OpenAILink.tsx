import {faRobot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

export default function OpenAILink() {
	
	return (
		<Link href="https://openai.com" target="_blank">
			<Typography variant="caption"><FontAwesomeIcon icon={faRobot}/> written by OpenAI</Typography>
			<Typography sx={visuallyHidden}> (opens in a new window)</Typography>
		</Link>
	);
}