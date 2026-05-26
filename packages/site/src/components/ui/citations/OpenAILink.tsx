import {faRobot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link, Typography} from '@mui/material';

export default function OpenAILink() {
	
	return (
		<Link href="https://openai.com" target="_blank">
			<Typography component="span" variant="caption"><FontAwesomeIcon icon={faRobot}/> written by OpenAI</Typography>
			<Typography component="span" className="sr-only"> (opens in a new window)</Typography>
		</Link>
	);
}