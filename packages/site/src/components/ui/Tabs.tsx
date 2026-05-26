'use client';

/**
 * Local Tabs wrapper — mirrors the @gtibrett/mui-additions API but uses
 * @mui/material's native Tabs / Tab so the RovingTabIndexContext that
 * MUI v9's Tab requires is provided correctly. The additions lib still
 * imports @mui/lab's TabContext/TabList, whose v9 build lost that
 * context, throwing "RovingTabIndexContext is missing" at runtime.
 */

import {Box, Grid, Tab, Tabs as MuiTabs} from '@mui/material';
import {ReactNode, useCallback, useMemo, useState} from 'react';

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
};

export default function Tabs({tabs, active: initial, color = 'secondary'}: TabsProps) {
	const [active, setActive] = useState<string>(initial || tabs[0]?.id);
	const handleChange        = useCallback((_e: React.SyntheticEvent, v: string) => setActive(v), []);
	const activeTab           = useMemo(() => tabs.find(t => t.id === active), [tabs, active]);

	return (
		<>
			<Grid container spacing={1} className="ml-0 w-full border-b border-(--color-divider) items-center">
				<Grid size="grow">
					<MuiTabs value={active} onChange={handleChange} textColor={color} indicatorColor={color}>
						{tabs.map(t => <Tab key={t.id} label={t.label} value={t.id}/>)}
					</MuiTabs>
				</Grid>
				{activeTab?.actions && <Grid className="pr-2">{activeTab.actions}</Grid>}
			</Grid>
			<Box className={activeTab?.disableGutters ? 'p-0 pt-4' : 'p-4'}>
				{activeTab?.content}
			</Box>
		</>
	);
}
