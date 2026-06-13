import type { PropsWithChildren, ReactNode } from 'react';
import { Grid } from '@mui/material';

import { Header, type HeaderProps } from './page/Header';

type PageProps = PropsWithChildren<
	| {
			header?: ReactNode;
	  }
	| (HeaderProps & { header: undefined })
>;

export default function Page({ children, header, ...props }: PageProps) {
	return (
		<Grid container spacing={2} className="items-stretch">
			<Grid size={12}>
				{header || ('title' in props ? <Header {...props} /> : undefined)}
			</Grid>
			{children && <Grid size={12}>{children}</Grid>}
		</Grid>
	);
}
