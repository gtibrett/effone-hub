'use client';

import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Grid, Tabs as MuiTabs, Tab } from '@mui/material';

export type TabContent = {
	id: string;
	label: string;
	content: ReactNode;
	disableGutters?: boolean;
	actions?: ReactNode;
};

type TabsProps = {
	tabs: TabContent[];
	active?: string;
	color?: 'primary' | 'secondary';
	// When set, the active tab is synced to this URL search param so it survives
	// re-renders/remounts (e.g. opening an intercepting-route modal over the page).
	urlParam?: string;
};

export default function Tabs({ tabs, active: initial, color = 'secondary', urlParam }: TabsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const fromUrl = urlParam ? (searchParams?.get(urlParam) ?? null) : null;
	const [localActive, setActive] = useState<string>(fromUrl || initial || tabs[0]?.id);
	// URL param (when present) is the source of truth so the tab survives remounts.
	const active = (urlParam && fromUrl) || localActive;

	const handleChange = useCallback(
		(_e: React.SyntheticEvent, v: string) => {
			setActive(v);
			if (urlParam) {
				const next = new URLSearchParams(searchParams?.toString());
				next.set(urlParam, v);
				router.replace(`${pathname}?${next.toString()}`, { scroll: false });
			}
		},
		[urlParam, searchParams, pathname, router]
	);
	const activeTab = useMemo(() => tabs.find(t => t.id === active), [tabs, active]);

	return (
		<>
			<Grid
				container
				spacing={1}
				className="ml-0 w-full border-b border-(--color-divider) items-center"
			>
				<Grid size="grow">
					<MuiTabs
						value={active}
						onChange={handleChange}
						textColor={color}
						indicatorColor={color}
					>
						{tabs.map(t => (
							<Tab
								key={t.id}
								label={t.label}
								value={t.id}
								id={`tab-${t.id}`}
								aria-controls={`tabpanel-${t.id}`}
							/>
						))}
					</MuiTabs>
				</Grid>
				{activeTab?.actions && <Grid className="pr-2">{activeTab.actions}</Grid>}
			</Grid>
			<Box
				role="tabpanel"
				id={`tabpanel-${active}`}
				aria-labelledby={`tab-${active}`}
				tabIndex={0}
				className={activeTab?.disableGutters ? 'p-0 pt-4' : 'p-4'}
			>
				{activeTab?.content}
			</Box>
		</>
	);
}
