import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { FcFaq } from 'react-icons/fc';
import Link from 'next/link';
import BeforeCreate from '@/components/AiRobot/BeforeCreate';
import AfterCreate from '@/components/AiRobot/AfterCreate';
import { setFaqData, setFaqTitle } from '@/features/appSlice';
import { useDispatch } from 'react-redux';
import { useLoadUserQuery } from '@/features/auth/authApi';
import { useMyAiRobotQuery } from '@/features/aiRobot/aiRobotApi';
import { RingLoader } from 'react-spinners';
import Claim from '@/components/AiRobot/Claim';
const aiFaq = [
	{
		id: 1,
		question: 'What is Ai spot grid?',
		answer: [
			`AI robot trading, also known as algorithmic trading or automated trading, refers to the practice of using artificial intelligence (AI) and computer algorithms to execute trading strategies in financial markets. In this approach, trading decisions are made by computers based on predefined rules and criteria, eliminating or reducing the need for manual intervention.`,
		],
	},
	{
		id: 2,
		question: `How does AI robot trading typically work?`,
		answer: [
			`1. *Data Analysis:* AI algorithms analyze vast amounts of market data, including price movements, trading volume, news, and other relevant information.`,
			`2. *Pattern Recognition:* AI systems can identify patterns, trends, and anomalies in the data that might not be easily noticeable by human traders.`,
			`3. *Decision Making:* Based on the analysis, the AI algorithms make trading decisions. These decisions could involve buying or selling assets, determining entry and exit points, and managing risk.`,
			`4. *Trade Execution:* The AI robot trading system can automatically place trades on various exchanges or trading platforms. This process is usually much faster and more efficient than manual trading.`,
			`5. *Risk Management:* AI robot trading systems often include risk management protocols to control the size of trades and limit potential losses.`,
			`6. *Constant Monitoring:* AI robot traders can operate 24/7, monitoring markets and executing trades even when human traders are unavailable.`,
		],
	},
	{
		id: 3,
		question: `Benefits of AI robot trading include?`,
		answer: [
			`*Speed:* AI systems can process and react to market data in milliseconds, enabling faster execution of trades.`,

			`*Objectivity:* AI algorithms follow predefined rules and are not influenced by emotions, reducing the impact of emotional decisions on trading outcomes.`,

			`*Efficiency:* AI robot trading can manage multiple markets and strategies simultaneously, increasing trading efficiency.`,

			`*Backtesting:* Traders can test their strategies on historical data to evaluate their effectiveness before deploying them in live markets.`,

			`*Diversification:* AI robot trading allows traders to diversify their strategies across different assets and markets.`,

			`However, it's important to note that AI robot trading also has its challenges and risks:`,

			`*Complexity:* Developing and maintaining effective AI trading algorithms requires expertise in both finance and AI technologies.`,

			`*Data Quality:* The accuracy and quality of input data can significantly impact the performance of AI trading systems.`,

			`*Market Conditions:* Rapid changes in market conditions or unexpected events can lead to losses if the AI system isn't capable of adapting appropriately.`,

			`Overall, AI robot trading has gained popularity as technology has advanced, but it's crucial for traders and investors to thoroughly understand the technology, risks, and potential benefits before incorporating it into their trading strategies.`,
		],
	},
	{
		id: 4,
		question: `How can i create an Ai spot grid?`,
		answer: [
			`To create Ai spot grid follow the undermentioned steps`,
			`1.At first click the Ai Robot`,
			`2.Then click Create Button, AI will automatically fill up the coin price range field.`,
			`3.Then set your grid{Number of grid, 1 grid => 30USDT, 2 grid => 40USDT, 3 grid => 45USDT, 4 grid => 60USDT, and next grids(5-170 grids) => grid number X 15 USDT }`,
			`4.Then type amount you want to invest.`,
			`5.Final step >> Just click on the create button and broom!`,
			`6.After creating the grid, within 24 hour Ai Robot will provide the profit (1.5% to 30%).`,
			`7.After 24 hour you will be able to edit or cancel the Ai spot grid.`,
			`8.Before 24 hours, If you cancel or edit the grid you will never get the profit.`,
		],
	},
];

const AiRobot = () => {
	useLoadUserQuery();
	const { user } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();

	const {
		data,
		isLoading: r_isLoading,
		isError: r_isError,
		isSuccess: r_isSuccess,
		error: r_error,
	} = useMyAiRobotQuery(undefined);
	// console.log(data);
	const { aiRobot } = data || {};
	console.log(aiRobot);

	// handle faq data
	const handleFaqData = () => {
		dispatch(setFaqData(aiFaq));
		dispatch(setFaqTitle('AI Robot Trading'));
	};

	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-2 pt-20 pb-24 overflow-y-auto ai-wrapper '>
					{/* <div className='ai-overlay'></div> */}
					<div className='relative px-4 py-6 mx-auto rounded-lg bg-black_2 md:w-7/12'>
						<div className=''>
							{/* start Heading */}
							<div className='flex justify-between '>
								<div>
									<div className=''>
										<h1 className='text-2xl font-bold text-blue-gray-200'>
											AI Robot Trading
										</h1>
										<p className='my-2 text-sm text-gray-500 '>
											Deploy Glomax automation tools to trade crypto like a
											pro.Identify and replicate trading strategies on the
											largest exchange with unparalleled liquidity.
										</p>
									</div>
									<div>
										<span className=' text-blue-gray-400'>
											Ai Balance:{' '}
											<span className='text-yellow-700'>
												{Number(user?.ai_balance).toLocaleString('en-US', {
													minimumFractionDigits: 2,
												})}{' '}
												USDT
											</span>
										</span>
									</div>
								</div>
								<div className='flex'>
									<Link
										href='/faq'
										onClick={() => {
											handleFaqData();
										}}
									>
										<FcFaq className='inline-block mr-1 text-xl text-white cursor-pointer ' />
									</Link>
								</div>
							</div>
							{/* End Heading */}
							<div className='my-4 text-blue-gray-200'>
								<div className='grid items-center justify-between grid-cols-2 p-4 mt-2 border border-blue-gray-800'>
									<div>
										<p className='text-sm text-gray-500'>Active Strategies</p>
										<h2>75,309</h2>
									</div>
									<div>
										<p className='text-sm text-gray-500'>Total Value</p>
										<h2>305,800</h2>
									</div>
								</div>

								<div className='grid grid-cols-2 gap-2 my-4 '>
									<Link href='/convert'>
										<Button color='amber' className='w-full '>
											Convert
										</Button>
									</Link>
									<Link href='/ai-history'>
										<Button color='amber' className='w-full '>
											History
										</Button>
									</Link>
								</div>
								{r_isLoading ? (
									<div>
										<div className='flex items-center justify-center mt-10 '>
											<RingLoader color='#F59E0B' size={50} />
										</div>
									</div>
								) : (
									<div>
										{aiRobot?.is_active && !aiRobot?.is_claimed && (
											<AfterCreate />
										)}
										{!aiRobot?.is_active && <BeforeCreate />}
										{aiRobot?.is_active && aiRobot?.is_claimed && <Claim />}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* For FAQ */}
			</ProtectedRoute>
		</Layout>
	);
};

export default AiRobot;
