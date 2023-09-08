import React from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';

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

const AiFAQ = () => {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

	return (
		<div className='overflow-y-auto '>
			<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(1)}>
					<span className=' text-blue-gray-200'>What is AI spot grid?</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						AI robot trading, also known as algorithmic trading or automated
						trading, refers to the practice of using artificial intelligence
						(AI) and computer algorithms to execute trading strategies in
						financial markets. In this approach, trading decisions are made by
						computers based on predefined rules and criteria, eliminating or
						reducing the need for manual intervention.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(2)}>
					<span className=' text-blue-gray-200'>
						How does AI robot trading typically work?
					</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						1. **Data Analysis:** <br /> AI algorithms analyze vast amounts of
						market data, including price movements, trading volume, news, and
						other relevant information. <br /> 2. **Pattern Recognition:**{' '}
						<br /> AI systems can identify patterns, trends, and anomalies in
						the data that might not be easily noticeable by human traders.{' '}
						<br /> 3. **Decision Making:** <br /> Based on the analysis, the AI
						algorithms make trading decisions. These decisions could involve
						buying or selling assets, determining entry and exit points, and
						managing risk. <br /> 4. **Trade Execution:**
						<br /> The AI robot trading system can automatically place trades on
						various exchanges or trading platforms. This process is usually much
						faster and more efficient than manual trading. <br /> 5. **Risk
						Management:**
						<br /> AI robot trading systems often include risk management
						protocols to control the size of trades and limit potential losses.{' '}
						<br />
						6. **Constant Monitoring:** <br /> AI robot traders can operate
						24/7, monitoring markets and executing trades even when human
						traders are unavailable.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(3)}>
					<span className=' text-blue-gray-200'>
						Benefits of AI robot trading include?
					</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						The minimum trade amount is 0.1 USDT.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(4)}>
					<span className=' text-blue-gray-200'>
						How many times official trade happens in a Day?
					</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						You can participate in official trade 3 times in a day.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(4)}>
					<span className=' text-blue-gray-200'>
						How many stages count for the win game?
					</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						The win game is a 7-stage plan. The Teacher will make you win at any
						stage from the 7 stages. If the teacher fails to win you in the 7th
						stage, we will refund your full compensation (Only at official trade
						time). Of course, you have to participate in every stage, and you
						have to maintain a 2X or 3X plan. For example: (a) 2X plan: If you
						trade 1st stage-1 USDT, 2nd stage-2 USDT, 3rd stage-4 USDT, 4th
						stage-8 USDT, 5th stage-16 USDT, 6th stage-32 USDT, 7th stage-64
						USDT. (b) 3X plan: If you trade 1st stage-1 USDT, 2nd stage-3 USDT,
						3rd stage-9 USDT, 4th stage-27 USDT, 5th stage-81 USDT, 6th
						stage-243 USDT, 7th stage-729 USDT.
					</span>
				</AccordionBody>
			</Accordion>
		</div>
	);
};

export default AiFAQ;
