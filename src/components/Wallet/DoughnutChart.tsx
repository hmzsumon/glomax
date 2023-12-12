import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { BiSolidCheckbox } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const DoughnutChart = () => {
	const { user } = useSelector((state: any) => state.auth);
	const MainBalance = user?.m_balance;
	const AIBalance = user?.ai_balance;
	const EarnBalance = user?.e_balance;
	const totalBalance = MainBalance + AIBalance + EarnBalance;
	const mainBalancePercentage = ((MainBalance / totalBalance) * 100).toFixed(2);
	const aiBalancePercentage = ((AIBalance / totalBalance) * 100).toFixed(2);
	const earnBalancePercentage = ((EarnBalance / totalBalance) * 100).toFixed(2);

	const data = {
		labels: ['AI Balance', 'Main Balance', 'Earn Balance'],
		datasets: [
			{
				// label: '# of Votes',
				data: [
					aiBalancePercentage,
					mainBalancePercentage,
					earnBalancePercentage,
				],
				backgroundColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 150, 86, 1)',
					'rgba(255, 99, 132, 1)',
				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 150, 86, 1)',
					'rgba(255, 99, 132, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		cutout: '70%',
		responsive: true,
		maintainAspectRatio: false, // Set this to false to allow the chart to stretch to fit the container.
		plugins: {
			legend: {
				display: false, // This will do the task,
			},
		},
	};
	return (
		<div>
			<h2 className=''>Asset Distribution</h2>
			<div className='grid gap-3 my-4 md:grid-cols-2 '>
				<div className='flex items-center justify-center '>
					<div className='w-28 h-28 md:h-32 md:w-32 '>
						<Doughnut data={data} options={options} />
					</div>
				</div>
				<div className='flex flex-col justify-center gap-y-6'>
					<div className='flex w-full gap-1 '>
						<BiSolidCheckbox className='inline-block text-[1rem] text-[#F9A825]' />
						<div className='flex-1 '>
							<div className='flex items-center justify-between '>
								<div>
									<p className='text-xs text-blue-gray-100'>
										Trade Balance: ${Number(MainBalance).toFixed(2) ?? '0.00'}
									</p>
								</div>
								<div className='self-end '>
									<p className='text-xs text-blue-gray-100'>
										{mainBalancePercentage}%
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='flex gap-1 '>
						<BiSolidCheckbox className='inline-block text-[1rem] text-[#FF6384]' />
						<div className='flex-1 '>
							<div className='flex items-center justify-between '>
								<p className='text-xs text-blue-gray-100'>
									Earn Balance: ${Number(EarnBalance).toFixed(2) ?? '0.00'}
								</p>
								<p className='text-xs text-blue-gray-100'>
									{earnBalancePercentage}%
								</p>
							</div>
						</div>
					</div>

					<div className='flex gap-1 '>
						<BiSolidCheckbox className='inline-block text-[1rem] text-[#36A2EB]' />
						<div className='flex-1 '>
							<div className='flex items-center justify-between '>
								<p className='text-xs text-blue-gray-100'>
									AI Balance: ${Number(AIBalance).toFixed(2) ?? '0.00'}
								</p>
								<p className='text-xs text-blue-gray-100'>
									{aiBalancePercentage}%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoughnutChart;
