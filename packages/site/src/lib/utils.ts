/**
 * shadcn's standard `cn` helper. Combines clsx (for conditional classes)
 * with twMerge (for conflict resolution — `px-2 px-4` collapses to `px-4`).
 */
import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
