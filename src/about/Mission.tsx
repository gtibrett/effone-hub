import {Card, CardContent, CardHeader, Typography} from '@mui/material';
import {OpensInNewWindow} from '../ui-components';
import {Link} from '@gtibrett/mui-additions';

const Mission = () => (
	<Card>
		<CardHeader title="Mission"/>
		<CardContent>
			<Typography variant="body1" paragraph>This site was built as a fun side project, using React & Material-UI. It is an experiment in visualizing current and historical Formula One data. It is Open Source and utilizes many other open projects and data sources. app consuming the Ergast API Formula One dataset.</Typography>
			<Typography variant="body1" paragraph>You can view historical Formula One data back to 1950. Race results, qualifying, Driver's and Constructor's championship standings. Lap Times, Pit Stops and overtakes for each race.</Typography>
			<Typography variant="body1" paragraph>Some of the data contained within comes from <Link href="https://wikipedia.org" target="_blank">Wikipedia<OpensInNewWindow/></Link>. Other data was generated using AI, from <Link href="https://openai.com" target="_blank">OpenAI <OpensInNewWindow/></Link></Typography>
		</CardContent>
	</Card>
);

export default Mission;