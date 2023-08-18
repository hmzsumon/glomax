import { HistoryIcon } from '@/global/icons/CommonIcons';
import React from 'react';
import { FcFaq } from 'react-icons/fc';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import UserTradeRecords from './UserTradeRecords';

const BoardHeader = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	return (
		<div className='px-4 py-2 rounded-t-lg bg-black_3'>
			<div className='flex items-center justify-between '>
				<div>
					<FcFaq className='inline-block mr-2 text-2xl text-white' />
				</div>
				<div onClick={handleOpen}>
					<HistoryIcon h={6} w={6} color={'gray'} />
				</div>
			</div>
			<>
				<Dialog
					open={open}
					handler={handleOpen}
					className='text-white bg-black_2 px-0 overflow-auto'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							My Trade Record
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl text-blue-gray-600 cursor-pointer right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className=' px-0 overflow-auto'>
						<UserTradeRecords open={open} />
					</DialogBody>
				</Dialog>
			</>
		</div>
	);
};

export default BoardHeader;
