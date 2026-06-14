import type { PropsWithChildren, ReactNode } from 'react';
import {
	DialogActions,
	DialogContent,
	type DialogContentProps,
	DialogTitle,
	type DialogTitleProps,
	Grid,
	type GridProps,
	IconButton,
	Dialog as MuiDialog,
	type DialogProps as MuiDialogProps,
	Tooltip
} from '@mui/material';

export type DialogProps = Omit<MuiDialogProps, 'children' | 'title'> & {
	title: DialogTitleProps['children'];
	closeIcon?: ReactNode;
	closeIconTitle?: string;
	onClose: () => void;
	children: DialogContentProps['children'];
	titleSpacing?: GridProps['spacing'];
	actions?: ReactNode;
};

export default function Dialog(props: PropsWithChildren<DialogProps>) {
	const {
		title,
		titleSpacing = 2,
		closeIcon,
		closeIconTitle = 'close dialog',
		onClose,
		children,
		actions,
		...dialogProps
	} = props;

	return (
		<MuiDialog {...dialogProps} onClose={onClose}>
			<DialogTitle>
				<Grid container spacing={titleSpacing} className="items-center">
					<Grid>{title}</Grid>
					{closeIcon && (
						<Grid>
							<Tooltip title={closeIconTitle} placement="left">
								<IconButton onClick={onClose}>{closeIcon}</IconButton>
							</Tooltip>
						</Grid>
					)}
				</Grid>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
			{actions && <DialogActions>{actions}</DialogActions>}
		</MuiDialog>
	);
}
