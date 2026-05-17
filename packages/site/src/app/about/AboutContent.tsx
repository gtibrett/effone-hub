'use client';

import {Data, Dependencies, Mission, Repositories} from '@/components/page/about';
import {Page} from '@/components/ui';
import {Button as ShadcnButton} from '@/components/ui/shadcn/button';
import {Button as MuiButton} from '@/components/ui';

export default function AboutContent() {
	return (
		<Page title="About effOne Hub">
			{/* M1 coexistence smoke test — both render side-by-side.
			    Remove after the migration moves past M1. */}
			<div className="flex items-center gap-4 p-4 border border-dashed">
				<span className="text-sm">M1 smoke test:</span>
				<ShadcnButton>shadcn Button</ShadcnButton>
				<MuiButton variant="contained">MUI Button</MuiButton>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-9">
					<div className="grid grid-cols-12 gap-4 items-stretch">
						<div className="col-span-12">
							<Mission/>
						</div>

						<div className="col-span-12 md:col-span-6">
							<Data/>
						</div>

						<div className="col-span-12 md:col-span-6">
							<Repositories/>
						</div>
					</div>
				</div>

				<div className="col-span-12 md:col-span-3">
					<Dependencies/>
				</div>
			</div>
		</Page>
	);
}
