import {HTMLAttributes, PropsWithChildren} from 'react';
import {TableCell, TableRow} from '@/components/ui/shadcn/table';
import {cn} from '@/lib/utils';

export type PropertiesTableRowProps = HTMLAttributes<HTMLTableRowElement> & PropsWithChildren<{
	header: string;
	align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
	key?:   string | number;
}>

const ALIGN: Record<string, string> = {
	left:    'text-left',
	right:   'text-right',
	center:  'text-center',
	justify: 'text-justify',
	inherit: ''
};

export default function PropertiesTableRow({header, children, align = 'left', className, ...rowProps}: PropertiesTableRowProps) {
	return (
		<TableRow className={className} {...rowProps}>
			<TableCell scope="row" className="font-semibold">{header}</TableCell>
			<TableCell className={cn(ALIGN[align])}>{children}</TableCell>
		</TableRow>
	);
}
