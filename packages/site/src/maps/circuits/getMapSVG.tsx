import {Circuit} from '@gtibrett/effone-hub-graph-api';
import {SVGProps} from 'react';
import {AlbertPark, Americas, Bahrain, Baku, Catalunya, Estoril, Hungaroring, Imola, Interlagos, Jeddah, Losail, MarinaBay, Miami, Monaco, Monza, RedBullRing, Ricard, Rodriguez, Shanghai, Silverstone, Sochi, Spa, Suzuka, Villeneuve, YasMarina, Zandvoort} from './index';

export default function getMapSVG(circuitRef: Circuit['circuitRef'], svgProps: SVGProps<any>) {
	switch (circuitRef) {
		case 'albert_park':
			return <AlbertPark {...svgProps}/>;
		case 'americas':
			return <Americas {...svgProps}/>;
		case 'bahrain':
			return <Bahrain {...svgProps}/>;
		case 'baku':
			return <Baku {...svgProps}/>;
		case 'catalunya':
			return <Catalunya {...svgProps}/>;
		case 'estoril':
			return <Estoril {...svgProps}/>;
		case 'hungaroring':
			return <Hungaroring {...svgProps}/>;
		case 'imola':
			return <Imola {...svgProps}/>;
		case 'interlagos':
			return <Interlagos {...svgProps}/>;
		case 'jeddah':
			return <Jeddah {...svgProps}/>;
		case 'losail':
			return <Losail {...svgProps}/>;
		case 'marina_bay':
			return <MarinaBay {...svgProps}/>;
		case 'miami':
			return <Miami {...svgProps}/>;
		case 'monaco':
			return <Monaco {...svgProps}/>;
		case 'monza':
			return <Monza {...svgProps}/>;
		case 'red_bull_ring':
			return <RedBullRing {...svgProps}/>;
		case 'ricard':
			return <Ricard {...svgProps}/>;
		case 'rodriguez':
			return <Rodriguez {...svgProps}/>;
		case 'shanghai':
			return <Shanghai {...svgProps}/>;
		case 'silverstone':
			return <Silverstone {...svgProps}/>;
		case 'sochi':
			return <Sochi {...svgProps}/>;
		case 'spa':
			return <Spa {...svgProps}/>;
		case 'suzuka':
			return <Suzuka {...svgProps}/>;
		// case 'vegas':
		// 	return <Vegas {...svgProps}/>;
		case 'villeneuve':
			return <Villeneuve {...svgProps}/>;
		case 'yas_marina':
			return <YasMarina {...svgProps}/>;
		case 'zandvoort':
			return <Zandvoort {...svgProps}/>;
		
		default:
			return null;
	}
}