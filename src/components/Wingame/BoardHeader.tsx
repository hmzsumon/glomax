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
import { FaTelegram } from 'react-icons/fa';
import UserTradeRecords from './UserTradeRecords';
import Link from 'next/link';
import TradeTime from './TradeTime';
import WingameFAQ from './WingameFAQ';

const BoardHeader = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);
	const [open2, setOpen2] = React.useState(false);
	const handleOpen2 = () => setOpen2(!open2);
	const [open3, setOpen3] = React.useState(false);
	const handleOpen3 = () => setOpen3(!open3);

	return (
		<div className='px-4 py-2 rounded-t-lg bg-black_3'>
			<div className='flex items-center justify-between '>
				<div>
					<FcFaq
						className='inline-block mr-2 text-2xl text-white cursor-pointer hover:text-[#29c633]'
						onClick={handleOpen3}
					/>

					<button
						onClick={handleOpen2}
						className='px-4 py-1 text-xs font-bold text-white rounded-md bg-gradient-to-r from-[#4a19db] to-[#29c633]'
					>
						Official Trade Time
					</button>
				</div>

				<div className='flex gap-1 '>
					<Link href='https://t.me/glomax2020'>
						<FaTelegram className='inline-block  text-xl text-[#2297D0]' />
					</Link>
					<span onClick={handleOpen}>
						<HistoryIcon h={6} w={6} color={'gray'} />
					</span>
				</div>
			</div>
			<>
				<Dialog
					open={open}
					handler={handleOpen}
					className='px-0 overflow-auto text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							My Trade Record
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className='px-0 overflow-auto '>
						<UserTradeRecords open={open} />
					</DialogBody>
				</Dialog>
			</>
			<>
				<Dialog
					size='sm'
					open={open2}
					handler={handleOpen2}
					className='px-0 overflow-auto text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							Official Trade Times
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen2}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className='px-0 overflow-auto '>
						<TradeTime />
					</DialogBody>
				</Dialog>
			</>
			{/* For FAQ */}
			<>
				<Dialog
					size='md'
					open={open3}
					handler={handleOpen3}
					className='px-0 overflow-auto text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							Win Game Rules FAQ!
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen3}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className='px-4 overflow-auto '>
						<WingameFAQ />
					</DialogBody>
				</Dialog>
			</>
		</div>
	);
};

export default BoardHeader;
