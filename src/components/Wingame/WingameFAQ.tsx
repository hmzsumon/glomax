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

const WingameFAQ = () => {
	const [open, setOpen] = React.useState(0);

	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

	return (
		<>
			<Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(1)}>
					<span className=' text-blue-gray-200'>Win Game Rules?</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						You can join 1-minute, 3-minute, 5-minute win game. Here are the
						rules for the win game: If you spend 100 USDT in trade, after
						deducting a 2% service fee, your contract amount is 98: 1. JOIN
						GREEN: If the result shows green, you get (98*2) 196. 2. JOIN RED:
						If the result shows red, you get (98*2) 196. 3. JOIN VIOLET: If the
						result shows violet, you will get (98*4.5) 441. If your result shows
						red or green, you will get (98*1.5) 147. 4. SELECT NUMBER: If the
						result is the same as the number you selected, you will get (98*9)
						882.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(2)}>
					<span className=' text-blue-gray-200'>
						Win game rebate commission?
					</span>
				</AccordionHeader>
				<AccordionBody>
					<span className=' text-blue-gray-400'>
						You also get extra commission: 40% from level-1, 30% from level-2,
						and 20% from level-3 (Commission coming from the service fee of the
						trading amount). Invite friends for more commission.
					</span>
				</AccordionBody>
			</Accordion>
			<Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
				<AccordionHeader onClick={() => handleOpen(3)}>
					<span className=' text-blue-gray-200'>
						What is the minimum trade amount?
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
		</>
	);
};

export default WingameFAQ;
