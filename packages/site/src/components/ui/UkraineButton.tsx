'use client';

/**
 * Port of `@gtibrett/mui-additions/UkraineButton`. Floating action
 * button anchored to the bottom-right of the viewport linking to a
 * Ukraine-support shirt. Renders into the existing DOM tree
 * (`noPortal`) or a portal at the document root — the old wrapper
 * defaulted to portal; we mirror that.
 */
import {createPortal} from 'react-dom';
import {useEffect, useState} from 'react';

type UkraineButtonProps = {
	noPortal?: boolean;
};

const STYLE = {
	background: 'linear-gradient(0deg, #F7D748 0%, #F7D748 50%, #255AB5 50%, #255AB5 100%)'
} as const;

export default function UkraineButton({noPortal = false}: UkraineButtonProps) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const button = (
		<div
			className={`z-50 ${noPortal ? 'absolute right-0 bottom-0' : 'fixed right-6 bottom-4'}`}
		>
			<a
				aria-label="Stand with Ukraine"
				title="We stand with Ukraine and its people. Show your support."
				href="https://cottonbureau.com/p/SE43Q8/shirt/stand-with-ukraine"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white shadow-lg"
				style={STYLE}
			/>
		</div>
	);

	if (noPortal) return button;
	if (!mounted) return null;
	return createPortal(button, document.body);
}
