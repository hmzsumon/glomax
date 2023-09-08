import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';
import { it } from 'node:test';

const data = [
	{
		id: 1,
		question: 'What is AI spot grid?',
		answer: `AI robot trading, also known as algorithmic trading or automated trading, refers to the practice of using artificial intelligence (AI) and computer algorithms to execute trading strategies in financial markets. In this approach, trading decisions are made by computers based on predefined rules and criteria, eliminating or reducing the need for manual intervention.`,
	},
	{
		id: 2,
		question: 'How does AI robot trading typically work?',
		answer: `1. **Data Analysis:** <br /> AI algorithms analyze vast amounts of market data, including price movements, trading volume, news, and social media sentiment. <br /> 2. **Strategy Development:** <br /> AI algorithms develop trading strategies based on the data analysis. <br /> 3. **Backtesting:** <br /> AI algorithms test the trading strategies using historical data to determine their effectiveness. <br /> 4. **Live Trading:** <br /> AI algorithms execute trades based on the trading strategies.`,
	},
	{
		id: 3,
		question: 'What is AI spot grid?',
		answer: `AI robot trading, also known as algorithmic trading or automated trading, refers to the practice of using artificial intelligence (AI) and computer algorithms to execute trading strategies in financial markets. In this approach, trading decisions are made by computers based on predefined rules and criteria, eliminating or reducing the need for manual intervention.`,
	},
];

function Icon({ id, open }: { id: number; open: number }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={2}
			stroke='currentColor'
			className={`${
				id === open ? 'rotate-180' : ''
			} h-5 w-5 transition-transform`}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 8.25l-7.5 7.5-7.5-7.5'
			/>
		</svg>
	);
}

const Faq = () => {
	const [open, setOpen] = React.useState(0);
	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-4 py-20'>
					{data.map((item, index) => (
						<Accordion
							open={open === item.id}
							icon={<Icon id={item.id} open={open} />}
						>
							<AccordionHeader onClick={() => handleOpen(index)}>
								<span className=' text-blue-gray-200'>{item.question}</span>
							</AccordionHeader>
							<AccordionBody>
								<span className=' text-blue-gray-400'>{item.answer}</span>
							</AccordionBody>
						</Accordion>
					))}
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default Faq;
