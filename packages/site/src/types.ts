// F1DB uses string slugs (e.g. "max-verstappen") for both drivers and constructors
export type DriverId = string | undefined;
export type TeamId = string | undefined;

// biome-ignore lint/complexity/noBannedTypes: generic
export type PropsWithClassName<T = {}> = T & {
	className?: string;
};
