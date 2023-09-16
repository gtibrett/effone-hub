import {Typography} from '@mui/material';

const DAY  = 24 * 60 * 60;
const HOUR = 60 * 60;
const MIN  = 60;

const leadingZero = (x: number, digits = 2) => String(x).padStart(digits, '0');

type CountdownClockProps = {
	timeTo: number;
	size: 'small' | 'large'
}

export default function CountdownClock({timeTo, size}: CountdownClockProps) {
	const daysTo    = Math.floor(timeTo / DAY);
	const hoursTo   = Math.floor((timeTo - DAY * daysTo) / HOUR);
	const minsTo    = Math.floor((timeTo - DAY * daysTo - HOUR * hoursTo) / MIN);
	const secondsTo = (timeTo - DAY * daysTo - HOUR * hoursTo - MIN * minsTo);
	
	return (
		<Typography variant={size === 'large' ? 'h5' : 'body2'} component="p" paragraph={false}>
			{daysTo ? <span>{daysTo} days, </span> : ''}
			<span>{hoursTo}:{leadingZero(minsTo)}:{leadingZero(secondsTo)}</span>
		</Typography>
	);
}