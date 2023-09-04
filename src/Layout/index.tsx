import React, { PropsWithChildren } from 'react';
import Header from './Header/Header';
import FooterNav from './Footer/FooterNav';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import TradeFooter from './Footer/TradeFooter';
import Cookies from 'js-cookie';
const Layout = ({ children }: PropsWithChildren<{}>) => {
	const token = Cookies.get('token');
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	const router = useRouter();
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
		</>
	);
};

export default Layout;
