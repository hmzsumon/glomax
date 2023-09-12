import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';

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
	const { faqData, faqTitle } = useSelector((state: any) => state.app);

	const [open, setOpen] = React.useState(0);
	const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
	return (
		<Layout>
			<div className='px-4 py-20'>
				<div className='my-2 '>
					<h1 className='text-2xl font-bold text-center text-blue-gray-200'>
						{faqTitle} (FAQ)
					</h1>
				</div>
				<hr />
				<div>
					{faqData?.map((item: any) => (
						<Accordion
							key={item.id}
							open={open === item.id}
							icon={<Icon id={item.id} open={open} />}
						>
							<AccordionHeader onClick={() => handleOpen(item.id)}>
								<span className=' text-blue-gray-200'>{item.question}</span>
							</AccordionHeader>
							<AccordionBody>
								{item.answer.map((ans: string, i: number) => (
									<p key={i} className='my-1 text-blue-gray-400'>
										{ans}
									</p>
								))}
							</AccordionBody>
						</Accordion>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Faq;
