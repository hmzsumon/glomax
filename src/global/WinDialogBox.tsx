// DialogBox.js
import React from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';

const WinDialogBox = ({ open, handler, response }: any) => {
	return (
		<Dialog
			open={open}
			handler={handler}
			size='xs'
			className='border-0 bg-black_1 '
		>
			<div className='flex items-center justify-center'>
				<h2 className='my-2'>
					{response?.status === 'win'
						? 'Congratulations'
						: ' You Lost try again! '}
				</h2>
			</div>
			<div>
				{response?.status === 'win' && (
					<img src='/winner-win.gif' alt='win' className='w-[100%] mx-auto ' />
				)}
				{response?.status === 'lose' && (
					<img src='/oops.png' alt='win' className='w-full mx-auto ' />
				)}
			</div>
		</Dialog>
	);
};

export default WinDialogBox;
