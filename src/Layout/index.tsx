import React, { PropsWithChildren, useEffect } from 'react';
import Header from './Header/Header';
import FooterNav from './Footer/FooterNav';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import TradeFooter from './Footer/TradeFooter';
import Cookies from 'js-cookie';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const Layout = ({ children }: PropsWithChildren<{}>) => {
	const token = Cookies.get('token');
	const { user } = useSelector((state: any) => state.auth);
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		if (user?.is_block) {
			router.push('/block');
		}
	}, [user]);

	return (
		<>
			<Head>
				<title>Glomax</title>
			</Head>
			<Header />
			{children}
			{token && (
				<>{router.pathname !== '/trade' ? <FooterNav /> : <TradeFooter />}</>
			)}

			<>
				<Dialog
					size='xs'
					open={open}
					handler={handleOpen}
					className='text-white bg-black_2'
				>
					<div className='flex items-center justify-center py-3 '>
						<h4 className='text-2xl font-bold text-center text-blue-gray-200'>
							Account Activation!
						</h4>
						<IoCloseCircleOutline
							className='absolute text-2xl cursor-pointer text-blue-gray-600 right-3 top-2 hover:text-red-500'
							onClick={handleOpen}
						/>
					</div>
					<hr className='my-2 border border-black_3' />
					<DialogBody>
						<div>
							<div className='relative flex flex-col gap-1 '>
								<p>
									complete your first deposit to active your account, then you
									will be able to participate in trade and play win games and
									more.
								</p>
							</div>
						</div>
					</DialogBody>
				</Dialog>
			</>
		</>
	);
};

export default Layout;
