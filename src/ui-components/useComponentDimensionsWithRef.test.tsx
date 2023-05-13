import {render, screen, renderHook} from '@testing-library/react';
import useComponentDimensionsWithRef from './useComponentDimensionsWithRef';

describe('useComponentDimensionsWithRef.ts', () => {
	test('set', async () => {
		const TestComponent = () => {
			const {ref, node, dimensions} = useComponentDimensionsWithRef();
			return (
				<div style={{position: 'relative'}}>
					<div data-testid="dimensions.height">{dimensions.height}</div>
					<div data-testid="dimensions.width">{dimensions.width}</div>
					<div data-testid="node">{node?.getAttribute('data-testid')}</div>
					<div ref={ref} data-testid="thenode" style={{position: 'absolute', width: 200, height: 100}}>ref</div>
				</div>
			);
		};
		
		render(<TestComponent/>);
		
		// TODO: size checking isnt working in test
		// expect(screen.getByTestId('dimensions.height')).toHaveTextContent('100');
		// expect(screen.getByTestId('dimensions.width')).toHaveTextContent('200');
		expect(screen.getByTestId('node')).toHaveTextContent('thenode');
		
	});
});