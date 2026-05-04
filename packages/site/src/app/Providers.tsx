'use client';

import {Layout} from '@/components/app';
import {useEffTheme} from '@/components/ui';
import {config} from '@fortawesome/fontawesome-svg-core';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {PropsWithChildren} from 'react';
import ApolloWrapper from './ApolloWrapper';

config.autoAddCss = false;

export default function Providers({children}: PropsWithChildren) {
	const theme = useEffTheme();

	return (
		<AppRouterCacheProvider options={{enableCssLayer: true}}>
			<ApolloWrapper>
				<ThemeProvider theme={theme}>
					<CssBaseline/>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</ApolloWrapper>
		</AppRouterCacheProvider>
	);
}
