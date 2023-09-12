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
import { useDispatch } from 'react-redux';
import { setFaqData, setFaqTitle } from '@/features/appSlice';

const winGameFaq = [
	{
		id: 1,
		question: `Win Game Rules?`,
		answer: [
			`You can join 1-minute, 3-minute, 5-minute win game. Here are the rules for the win game:`,
			`If you spend 100 USDT in trade, after deducting a 2% service fee, your contract amount is 98:`,
			`1. JOIN GREEN: If the result shows green, you get(98 * 2) 196.`,
			`2. JOIN RED: If the result shows red, you get(98 * 2) 196.`,
			`3. JOIN VIOLET: If the result shows violet, you will get(98 * 4.5) 441. If your result shows red or green, you will get(98 * 1.5) 147.`,
			`4. SELECT NUMBER: If the result is the same as the number you selected, you will get(98 * 6) 588.`,
		],
	},
	{
		id: 2,
		question: `Win game trade commission?`,
		answer: [
			`You also get extra commission: 40% from level-1, 30% from level-2, and 20% from level-3 (Commission coming from the service fee of the trading amount). Invite friends for more commission.`,
		],
	},
	{
		id: 3,
		question: `What is the minimum trade amount?`,
		answer: [`The minimum trade amount is 0.1 USDT.`],
	},
	{
		id: 4,
		question: `How many times official trade happens in a Day?`,
		answer: [`You can participate in official trade 3 times in a day.`],
	},
	{
		id: 5,
		question: `How many stages count for the win game?`,
		answer: [
			`The win game is a 6-stage plan. The Teacher will make you win at any stage from the 6 stages. If the teacher fails to win you in the 6th stage, we will refund your full compensation (Only at official trade time). Of course, you have to participate in every stage, and you have to maintain a 2X or 3X plan.`,
			`For example:`,
			`(a) 2X plan: If you trade 1st stage 1USDT, 2nd stage 2USDT, 3rd stage 4USDT, 4th stage 8USDT,
            5th stage 16USDT, 6th stage 32USDT.`,
			`(b) 3X plan: If you trade 1st stage 1USDT, 2nd stage 3USDT, 3rd stage 9USDT, 4th stage 27USDT, 5th stage 81USDT, 6th stage 243USDT.`,
		],
	},
];

const BoardHeader = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);
	const [open2, setOpen2] = React.useState(false);
	const handleOpen2 = () => setOpen2(!open2);
	const [open3, setOpen3] = React.useState(false);
	const handleOpen3 = () => setOpen3(!open3);
	const dispatch = useDispatch();
	// handle faq data
	const handleFaqData = () => {
		dispatch(setFaqData(winGameFaq));
		dispatch(setFaqTitle('Win Game'));
	};

	return (
		<div className='px-4 py-2 rounded-t-lg bg-black_3'>
			<div className='flex items-center justify-between '>
				<div className='space-x-3'>
					<Link
						href='/faq'
						onClick={() => {
							handleFaqData();
						}}
					>
						<FcFaq className='inline-block text-xl text-white cursor-pointer ' />
					</Link>

					<button
						onClick={handleOpen2}
						className='px-4 py-1 text-xs font-bold text-white rounded-md bg-gradient-to-r from-[#4a19db] to-[#29c633]'
					>
						Official Trade Time
					</button>
					<Link href='https://t.me/+_F020xmmsFAxMWI1'>
						<FaTelegram className='inline-block  text-xl text-[#2297D0]' />
					</Link>
				</div>

				<div className='flex gap-1 '>
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
		</div>
	);
};

export default BoardHeader;
