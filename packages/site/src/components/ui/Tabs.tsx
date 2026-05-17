'use client';

import {ReactNode} from 'react';
import {Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/shadcn/tabs';

/**
 * App-wide Tabs wrapper — same API surface as
 * @gtibrett/mui-additions/Tabs so consumers can swap import paths
 * without restructuring.
 *
 * `tabs` is the canonical shape: each entry has an id, label, and
 * content. The `actions` slot from the upstream wrapper is preserved
 * but not yet rendered (upstream put it in a header bar adjacent to
 * the tab list); none of the current consumers pass actions, so it's
 * a no-op for now.
 */
export type TabContent = {
	id:               string;
	label:            ReactNode;
	content:          ReactNode;
	actions?:         ReactNode;
	disableGutters?:  boolean;
};

type TabsProps = {
	tabs:    TabContent[];
	active?: TabContent['id'];
};

export default function Tabs({tabs, active}: TabsProps) {
	if (!tabs.length) return null;
	return (
		<ShadcnTabs defaultValue={active ?? tabs[0].id} className="w-full">
			<TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-transparent">
				{tabs.map(t => (
					<TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
				))}
			</TabsList>
			{tabs.map(t => (
				<TabsContent
					key={t.id}
					value={t.id}
					className={t.disableGutters ? 'p-0' : 'p-2'}
				>
					{t.content}
				</TabsContent>
			))}
		</ShadcnTabs>
	);
}
