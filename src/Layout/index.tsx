import React, { PropsWithChildren } from 'react';
import Header from './Header/Header';
import FooterNav from './Footer/FooterNav';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import TradeFooter from './Footer/TradeFooter';
const Layout = ({ children }: PropsWithChildren<{}>) => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Glomax</title>
			</Head>
			<Header />
			{children}
			{isAuthenticated && (
				<>{router.pathname !== '/trade' ? <FooterNav /> : <TradeFooter />}</>
			)}
		</>
	);
};

export default Layout;
