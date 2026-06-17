import { useEffect, useState } from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';

const DAY = 24 * 60 * 60;
const HOUR = 60 * 60;
const MIN = 60;

const leadingZero = (x: number, digits = 2) => String(x).padStart(digits, '0');

type CountdownClockProps = {
	timeTo: number;
	size: 'small' | 'large';
};

export default function CountdownClock({ timeTo, size }: CountdownClockProps) {
	const [countDown, setCountdown] = useState(timeTo);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (mounted && countDown > 0) {
			const interval = setInterval(() => setCountdown(c => c - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [mounted, countDown]);

	const variant = size === 'large' ? 'h5' : 'body2';

	// `timeTo` derives from Date.now() upstream, so SSR and first client render
	// disagree. Hold a stable placeholder until mounted; the live value is
	// client-only thereafter, keeping hydration markup identical.
	if (!mounted) {
		return (
			<Typography variant={variant} component="p">
				<span>&mdash;</span>
			</Typography>
		);
	}

	if (countDown < 0) {
		return (
			<FontAwesomeIcon
				icon={faCircle}
				color="var(--mui-palette-Alert-successIconColor)"
				size="xl"
			/>
		);
	}

	const daysTo = Math.floor(countDown / DAY);
	const hoursTo = Math.floor((countDown - DAY * daysTo) / HOUR);
	const minsTo = Math.floor((countDown - DAY * daysTo - HOUR * hoursTo) / MIN);
	const secondsTo = countDown - DAY * daysTo - HOUR * hoursTo - MIN * minsTo;

	return (
		<Typography variant={variant} component="p">
			{daysTo ? <span>{daysTo} days, </span> : ''}
			<span>
				{hoursTo}:{leadingZero(minsTo)}:{leadingZero(secondsTo)}
			</span>
		</Typography>
	);
}
