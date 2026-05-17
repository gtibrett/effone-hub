import {FC, ReactNode, useCallback} from 'react';
import {useCssTokens} from '@/lib/cssTokens';
import useNivoTheme from './useNivoTheme';

export default function NivoTooltipFactory(Component: FC<any>): FC<any> {
	const nivoTheme = useNivoTheme();
	const tokens    = useCssTokens();

	return useCallback((props: any) => {
		const style: React.CSSProperties = {
			minWidth:     200,
			borderRadius: '4px',
			position:     'relative',
			overflow:     'hidden',
			padding:      0,
			opacity:      .9,
			background:   tokens.popover,
			color:        tokens.popoverForeground
		};

		const content = Component({...props, theme: nivoTheme}) as ReactNode;

		return content ? <div className="nivo-tooltip" style={style}>{content}</div> : null;
	}, [Component, nivoTheme, tokens.popover, tokens.popoverForeground]);
}
