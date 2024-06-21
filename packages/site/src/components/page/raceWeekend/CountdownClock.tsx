import {Typography} from '@mui/material';
import {useEffect, useState} from 'react';

const DAY  = 24 * 60 * 60;
const HOUR = 60 * 60;
const MIN  = 60;

const leadingZero = (x: number, digits = 2) => String(x).padStart(digits, '0');

type CountdownClockProps = {
	timeTo: number;
	size: 'small' | 'large'
}

export default function CountdownClock({timeTo, size}: CountdownClockProps) {
	const [countDown, setCountdown] = useState(timeTo);
	
	useEffect(() => {
		const interval = setInterval(() => setCountdown(countDown - 1), 1000);
		return () => clearInterval(interval);
	});
	
	const daysTo    = Math.floor(countDown / DAY);
	const hoursTo   = Math.floor((countDown - DAY * daysTo) / HOUR);
	const minsTo    = Math.floor((countDown - DAY * daysTo - HOUR * hoursTo) / MIN);
	const secondsTo = (countDown - DAY * daysTo - HOUR * hoursTo - MIN * minsTo);
	
	return (
		<Typography variant={size === 'large' ? 'h5' : 'body2'} component="p" paragraph={false}>
			{daysTo ? <span>{daysTo} days, </span> : ''}
			<span>{hoursTo}:{leadingZero(minsTo)}:{leadingZero(secondsTo)}</span>
		</Typography>
	);
}