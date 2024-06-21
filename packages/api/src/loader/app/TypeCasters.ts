export const toNumber = (value: string, nullable: boolean = false): number | undefined => (
	(nullable && isNaN(Number(value))) ? undefined : Number(value)
);

export const toString = (value: string, nullable: boolean = false): string | undefined => (
	value === '\\N' ? undefined : value
);

export default {
	toNumber,
	toString
};