import { setFaqData, setFaqTitle } from '@/features/appSlice';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
const allFaq = [
	{
		id: 1,
		question: `How to get the registration bonus??`,
		answer: [`You will be awarded 2USDT automatically`],
	},
	{
		id: 2,
		question: `How to Deposit Crypto to Glomax?`,
		answer: [
			`Cryptocurrencies are deposited via a “deposit address.” To view the deposit address of your Glomax Wallet, go to [Wallet] - [Overview] - [Deposit]. Then copy and paste the address to the platform or wallet you are withdrawing from to transfer them to your Glomax Wallet.`,
			`Summary of network selection:`,
			`TRC20`,
		],
	},
	{
		id: 3,
		question: `What is the transaction fee?`,
		answer: [`For TRC20 transaction fee is 5%`, `Binance pay 3%`],
	},
	{
		id: 4,
		question: `How to Withdraw from Glomax?`,
		answer: [
			`If you want to withdraw the cryptocurrency in your Glomax account to another platform account or your digital wallet, you can quickly withdraw the currency through the [Withdraw] function of [Wallet]. Cryptocurrency is withdrawn through an "address." Before withdrawing coins, you need to find the recharge address on the corresponding withdrawal platform and copy the address to the withdrawal address of the Glomax platform. Then you can withdraw your assets to the account of the corresponding platform.

            Take Bitcoin (BTC) as an example. After confirming the address, copy it into the [Withdrawal Address] column, and enter the amount of coins to be withdrawn.`,
			`You can withdraew through`,
			`TRC20`,
			`ERC20`,
			`Binance pay`,
		],
	},
	{
		id: 5,
		question: `What are crypto withdrawal fees?`,
		answer: [
			`Withdrawal transactions to crypto addresses outside of Glomax typically incur a "transaction fee" or "network fee." This fee is not paid to Glomax but to miners or validators responsible for processing the transactions and securing the respective blockchain network. (Details can be viewed on the Deposit & Withdrawal Fees page).

            Glomax must pay these fees to miners to ensure that transactions are processed. Since transaction fees are dynamic, you will be charged according to the current network conditions. The fee amount is based on an estimate of the network transaction fees and can fluctuate without notice due to factors such as network congestion. Please check the most updated fee listed on each withdrawal page.`,
			`For TRC20 transaction fee is 5%`,
			`For Binance pay transaction fee is 3%`,
			`For ERC20 transaction fee is 5%`,
		],
	},
	{
		id: 6,
		question: `Is there a minimum withdrawal amount?`,
		answer: [
			`There is a minimum amount for each withdrawal, which is 12 USDT. You can refer to the Deposit & Withdrawal Fees page to check the minimum withdrawal amount and transaction fees for each cryptocurrency. However, please note that fees can change without notice due to unforeseeable factors such as network congestion.

            You can also find the current transaction fees charged and the minimum withdrawal amount on the withdrawal page. Please note that the minimum withdrawal amount and transaction fees will change depending on the network you are using.`,
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
		question: `Withdraw fee`,
		answer: [
			`Glomax will not charge a Deposit fee.

            Users pay a flat fee for each withdrawal, which includes the transaction cost of moving cryptocurrencies out of their Glomax account.
            
            Withdraw fees depend on
            
             the blockchain network, and fees may fluctuate due to network congestion and other factors without prior notice. Please check the most recent information listed on each withdrawal page.`,
		],
	},
	{
		id: 8,
		question: `Transfer the wrong currency to the Glomax address:`,
		answer: [
			`If you transfer the wrong currency to the Glomax address, Glomax will not receive the corresponding blockchain assets. Due to the anonymity of the blockchain, it cannot help you retrieve it. Please confirm your deposit information before depositing to avoid asset loss.`,
		],
	},
	{
		id: 9,
		question: `Transfer to an address out of Glomax?`,
		answer: [
			`If your coins are transferred to the wrong address, Glomax will not be able to receive the corresponding blockchain assets. Due to the anonymity of the blockchain, it cannot help you retrieve it. It is recommended that you find the owner of the corresponding address through other means to negotiate the retrieval.`,
		],
	},
	{
		id: 10,
		question: 'What is Ai spot grid?',
		answer: [
			`AI robot trading, also known as algorithmic trading or automated trading, refers to the practice of using artificial intelligence (AI) and computer algorithms to execute trading strategies in financial markets. In this approach, trading decisions are made by computers based on predefined rules and criteria, eliminating or reducing the need for manual intervention.`,
		],
	},
	{
		id: 11,
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
		id: 12,
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

			`*Overfitting:* Creating algorithms that perform well in historical data but fail to perform in real-time market conditions is a common pitfall.`,

			`Overall, AI robot trading has gained popularity as technology has advanced, but it's crucial for traders and investors to thoroughly understand the technology, risks, and potential benefits before incorporating it into their trading strategies.`,
		],
	},
	{
		id: 13,
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
			`8.Bfore 24 hours, If you cancle or edit the grid you will never get the profit.`,
		],
	},
	{
		id: 14,
		question: `Win Game Rules?`,
		answer: [
			`You can join 1-minute, 3-minute, 5-minute win game. Here are the rules for the win game:`,
			`If you spend 100 USDT in trade, after deducting a 2% service fee, your contract amount is 98:`,
			`1. JOIN GREEN: If the result shows green, you get(98 * 2) 196.`,
			`2. JOIN RED: If the result shows red, you get(98 * 2) 196.`,
			`3. JOIN VIOLET: If the result shows violet, you will get(98 * 4.5) 441. If your result shows red or green, you will get(98 * 1.5) 147.`,
			`4. SELECT NUMBER: If the result is the same as the number you selected, you will get(98 * 9) 882.`,
		],
	},
	{
		id: 15,
		question: `Win game rebate commission?`,
		answer: [
			`You also get extra commission: 40% from level-1, 30% from level-2, and 20% from level-3 (Commission coming from the service fee of the trading amount). Invite friends for more commission.`,
		],
	},
	{
		id: 16,
		question: `What is the minimum trade amount?`,
		answer: [`The minimum trade amount is 0.1 USDT.`],
	},
	{
		id: 17,
		question: `How many times official trade happens in a Day?`,
		answer: [`You can participate in official trade 3 times in a day.`],
	},
	{
		id: 18,
		question: `How many stages count for the win game?`,
		answer: [
			`The win game is a 7-stage plan. The Teacher will make you win at any stage from the 7 stages. If the teacher fails to win you in the 7th stage, we will refund your full compensation (Only at official trade time). Of course, you have to participate in every stage, and you have to maintain a 2X or 3X plan.`,
			`For example:`,
			`(a) 2X plan: If you trade 1st stage-1 USDT, 2nd stage-2 USDT, 3rd stage-4 USDT, 4th stage-8 USDT,
            5th stage-16 USDT, 6th stage-32 USDT, 7th stage-64 USDT.`,
			`(b) 3X plan: If you trade 1st stage-1 USDT, 2nd stage-3 USDT, 3rd stage-9 USDT, 4th stage-27 USDT, 5th stage-81 USDT, 6th stage-243 USDT, 7th stage-729 USDT.`,
		],
	},
];

const Help = () => {
	const dispatch = useDispatch();

	// handle faq data
	const handleFaqData = () => {
		dispatch(setFaqData(allFaq));
		dispatch(setFaqTitle('Frequent Asked Questions'));
	};
	return (
		<div>
			<div className='px-8 py-16'>
				<h1 className='text-2xl font-bold md:text-4xl'>Need help?</h1>
				<div className='grid gap-4 my-20 md:grid-cols-3'>
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
									href='https://t.me/johan028'
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
				</div>
			</div>
		</div>
	);
};

export default Help;
