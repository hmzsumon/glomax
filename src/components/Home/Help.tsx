import { setFaqData, setFaqTitle } from '@/features/appSlice';
import { Dialog, DialogBody } from '@material-tailwind/react';
import Link from 'next/link';
import { set } from 'nprogress';
import React from 'react';
import { FaQrcode } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
const allFaq = [
	{
		id: 1,
		question: `How to activate my account?`,
		answer: [
			`If you have an account created through the Glomax, you need to make a deposit to activate it. `,
		],
	},
	{
		id: 1,
		question: `How to get the registration bonus?`,
		answer: [`You will be awarded 2USDT automatically`],
	},
	{
		id: 2,
		question: `How to Deposit Crypto to Glomax?`,
		answer: [
			`Cryptocurrencies are deposited through a "deposit address". To view your Glomax wallet deposit address, go to [Wallet] - [Overview] - [Deposit]. Then copy and paste the TRC20 address to the platform or wallet you are withdrawing from to transfer it to your Glomax wallet. Complete the deposit.`,
		],
	},
	{
		id: 2,
		question: `How much is the deposit bonus?`,
		answer: [
			`Deposit bonus is 5%. If you receive the bonus you have to invest 5X of your bonus  on trade. For example if you deposit 100 USDT and click on (i want bonus), then you will be get 105 USDT but you have to invest 25 USDT on trade.`,
		],
	},

	{
		id: 3,
		question: `How to Withdraw from Glomax?`,
		answer: [
			`If you want to withdraw the cryptocurrency in your Glomax account to another platform account or your digital wallet, you can quickly withdraw the currency through the [Withdraw] function of [Wallet]. Cryptocurrency is withdrawn through an "address." Before withdrawing coins, you need to find the recharge address on the corresponding withdrawal platform and copy the address to the withdrawal address of the Glomax platform. Then you can withdraw your assets to the account of the corresponding platform.

         After confirming the address, copy it into the [Withdrawal Address] column, and enter the amount of coins to be withdrawn.`,
			`You can withdraw through`,
			`TRC20`,
			`ERC20`,
			`Binance pay`,
		],
	},
	{
		id: 4,
		question: `What are crypto withdrawal fees?`,
		answer: [
			`Withdrawal transactions to crypto addresses outside of Glomax typically incur a "transaction fee" or "network fee." This fee is not paid to Glomax but to miners or validators responsible for processing the transactions and securing the respective blockchain network. (Details can be viewed on the Deposit & Withdrawal Fees page).

          Glomax must pay these fees to miners to ensure that transactions are processed. Since transaction fees are dynamic, you will be charged according to the current network conditions. The fee amount is based on an estimate of the network transaction fees and can fluctuate without notice due to factors such as network congestion. Please check the most updated fee listed on each withdrawal page.`,
			`For TRC20 transaction fee is 5%`,
			`For ERC20 transaction fee is 5%`,
			`For Binance pay transaction fee is 3%`,
		],
	},
	{
		id: 5,
		question: `Is there a minimum withdrawal amount?`,
		answer: [
			`There is a minimum amount for each withdrawal, which is 12 USDT. You can refer to the Deposit & Withdrawal Fees page to check the minimum withdrawal amount and transaction fees for each cryptocurrency. However, please note that fees can change without notice due to unforeseeable factors such as network congestion.

          You can also find the current transaction fees charged and the minimum withdrawal amount on the withdrawal page. Please note that the minimum withdrawal amount and transaction fees will change depending on the network you are using.`,
		],
	},
	{
		id: 5,
		question: `Withdrawal duration ?`,
		answer: [
			`⌛ Withdrawal duration:	A few minutes, Depending on the payment method and network.`,
		],
	},
	{
		id: 6,
		question: `What should I do if I withdraw coins to the wrong address?`,
		answer: [
			`When withdrawing coins, Glomax will enter the automatic withdrawal sequence after you complete the security verification and click [Submit], which cannot be stopped. If you fill in the wrong address, Glomax will not be able to find the recipient of your funds due to the anonymity of the blockchain address, so it will not be able to provide you with further assistance.`,
		],
	},
	{
		id: 7,
		question: `Transfer the wrong currency to the Glomax address:`,
		answer: [
			`If you transfer the wrong currency to the Glomax address, Glomax will not receive the corresponding blockchain assets. Due to the anonymity of the blockchain, it cannot help you retrieve it. Please confirm your deposit information before depositing to avoid asset loss.`,
		],
	},

	{
		id: 8,
		question: 'What is Ai spot grid?',
		answer: [
			`AI robot trading, also known as algorithmic trading or automated trading, refers to the practice of using artificial intelligence (AI) and computer algorithms to execute trading strategies in financial markets. In this approach, trading decisions are made by computers based on predefined rules and criteria, eliminating or reducing the need for manual intervention.`,
		],
	},
	{
		id: 9,
		question: `How does AI robot trading typically work?`,
		answer: [
			`1. Data Analysis: AI algorithms analyze vast amounts of market data, including price movements, trading volume, news, and other relevant information.`,
			`2. Pattern Recognition: AI systems can identify patterns, trends, and anomalies in the data that might not be easily noticeable by human traders.`,
			`3. Decision Making: Based on the analysis, the AI algorithms make trading decisions. These decisions could involve buying or selling assets, determining entry and exit points, and managing risk.`,
			`4. Trade Execution: The AI robot trading system can automatically place trades on various exchanges or trading platforms. This process is usually much faster and more efficient than manual trading.`,
			`5. Risk Management: AI robot trading systems often include risk management protocols to control the size of trades and limit potential losses.`,
			`6. Constant Monitoring: AI robot traders can operate 24/7, monitoring markets and executing trades even when human traders are unavailable.`,
		],
	},
	{
		id: 10,
		question: `Benefits of AI robot trading include?`,
		answer: [
			`Speed: AI systems can process and react to market data in milliseconds, enabling faster execution of trades.`,

			`Objectivity: AI algorithms follow predefined rules and are not influenced by emotions, reducing the impact of emotional decisions on trading outcomes.`,

			`Efficiency: AI robot trading can manage multiple markets and strategies simultaneously, increasing trading efficiency.`,

			`Accuracy: AI algorithms can identify patterns and trends in market data, resulting in more accurate trading decisions.`,

			`Diversification: AI robot trading allows traders to diversify their strategies across different assets and markets.`,

			`However, it's important to note that AI robot trading also has its challenges and risks:`,

			`Complexity: Developing and maintaining effective AI trading algorithms requires expertise in both finance and AI technologies.`,

			`Data Quality: The accuracy and quality of input data can significantly impact the performance of AI trading systems.`,

			`Market Conditions: Rapid changes in market conditions or unexpected events can lead to losses if the AI system isn't capable of adapting appropriately.`,

			`Overall, AI robot trading has gained popularity as technology has advanced, but it's crucial for traders and investors to thoroughly understand the technology, risks, and potential benefits before incorporating it into their trading strategies.`,
		],
	},
	{
		id: 11,
		question: `How can i create an Ai spot grid?`,
		answer: [
			`To create Ai spot grid follow the undermentioned steps`,
			`1.At first click the Ai Robot`,
			`2.Then click Create Button, AI will automatically fill up the coin price range field.`,
			`3.Then set your grid{Number of grid, 1 grid => 30USDT, 2 grid => 40USDT, 3 grid => 45USDT, 4 grid => 60USDT, and next grids(5-170 grids) => grid number X 15 USDT }`,
			`4.Then type amount you want to invest.`,
			`5.Final step >> Just click on the create button and broom!`,
			`6.After creating the grid, within 24 hour Ai Robot will provide the profit (1.5 to 30%).`,
			`7.After 24 hour you will be able to edit or cancel the Ai spot grid.`,
			`8.Before 24 hours, If you cancel or edit the grid you will never get the profit.`,
		],
	},
	{
		id: 12,
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
		id: 13,
		question: `Win game trade commission?`,
		answer: [
			`You also get extra commission: 40% from level-1, 30% from level-2, and 20% from level-3 (Commission coming from the service fee of the trading amount). Invite friends for more commission.`,
		],
	},
	{
		id: 14,
		question: `What is the minimum trade amount?`,
		answer: [`The minimum trade amount is 0.1 USDT.`],
	},
	{
		id: 15,
		question: `How many times official trade happens in a Day?`,
		answer: [`You can participate in official trade 3 times in a day.`],
	},
	{
		id: 16,
		question: `How many stages count for the win game?`,
		answer: [
			`The win game is a 6-stage plan. The Teacher will make you win at any stage from the 6 stages. If the teacher fails to win you in the 6th stage, we will refund your full compensation (Only at official trade time). Of course, you have to participate in every stage, and you have to maintain a 2X or 3X plan.`,
			`For example:`,
			`(a) 2X plan: If you trade 1st stage-1 USDT, 2nd stage-2 USDT, 3rd stage-4 USDT, 4th stage-8 USDT,
          5th stage-16 USDT, 6th stage-32 USDT.`,
			`(b) 3X plan: If you trade 1st stage-1 USDT, 2nd stage-3 USDT, 3rd stage-9 USDT, 4th stage-27 USDT, 5th stage-81 USDT, 6th stage-243 USDT.`,
		],
	},
	{
		id: 17,
		question: `How does the crypto market go up and down?`,
		answer: [
			`The combination of supply, demand, production costs, competition, regulatory developments, and the media coverage that follows influences investor outlook, which is one of the most significant factors affecting cryptocurrency prices.`,
		],
	},
	{
		id: 17,
		question: `What is the limit on Glomax trading?`,
		answer: [
			`With an Exclusive account you as well get access to financial research, daily market reviews and education materials. In addition, traders also do not have a limit on how many deals they open simultaneously, but the maximum deal amount is $3000.`,
		],
	},
	{
		id: 17,
		question: `How to set up the duration for the robot?
    `,
		answer: [
			`At Glomax, you can open trades with fixed durations of 30 seconds, 1 minute, 2 minutes, 3 minutes, 4 minutes and 5 minutes. Most Glomax users open trades for 30 seconds.`,
		],
	},
];

const Help = () => {
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);

	// handle faq data
	const handleFaqData = () => {
		dispatch(setFaqData(allFaq));
		dispatch(setFaqTitle('Frequent Asked Questions'));
	};
	return (
		<div>
			<div className='px-8 py-10'>
				<h1 className='text-2xl font-bold md:text-xl'>Need help?</h1>
				<div className='grid gap-4 my-4 md:grid-cols-3'>
					<div className='flex items-start space-x-4 '>
						<img src='./images/icons/icon8.png' alt='' className='w-16' />
						<div className='space-y-2 '>
							<h1 className='text-xl font-bold '>24/7 Chat Support</h1>
							<p>
								Get 24/7 chat support with our friendly customer service agents
								at your service
							</p>
							<button>
								<a
									href='https://t.me/glomax2020'
									target='_blank'
									rel='noopener noreferrer'
									className='text-yellow-700 '
								>
									Chat now
								</a>
							</button>
						</div>
					</div>
					<div className='flex items-start space-x-4 '>
						<img src='./images/icons/icon9.png' alt='' className='w-16' />
						<div className='space-y-2 '>
							<h1 className='text-xl font-bold '>Frequent Asked Questions</h1>
							<p>
								Frequent Asked Questions (FAQs) and answers to all your queries.
							</p>
							<button>
								<Link
									href='/faq'
									onClick={() => {
										handleFaqData();
									}}
									className='text-yellow-700 '
								>
									FAQs
								</Link>
							</button>
						</div>
					</div>
					<div className='flex items-start space-x-4 '>
						<div className='flex items-center justify-center col-span-1 p-4 bg-[#474D57] rounded-xl'>
							<FaQrcode
								className='inline-block text-2xl text-gray-400 cursor-pointer '
								onClick={handleOpen}
							/>
						</div>
						<div className='space-y-2 '>
							<h1 className='text-xl font-bold '>Please scan the QR code</h1>
							<p>
								Please scan the QR code and Download the Glomax App from Play
								Store
							</p>
							<button onClick={handleOpen}>
								<button className='text-yellow-700 '>QR Code</button>
							</button>
						</div>
					</div>
				</div>
			</div>
			<>
				<Dialog
					open={open}
					size='xs'
					handler={handleOpen}
					className='px-0 overflow-auto text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-sm font-bold text-center text-blue-gray-200'>
							Scan QR Code to Download Glomax App
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody className='px-0 overflow-auto '>
						<div className=''>
							<img src='./glomax-app.png' alt='' className='mx-auto w-60' />
						</div>
					</DialogBody>
				</Dialog>
			</>
		</div>
	);
};

export default Help;
