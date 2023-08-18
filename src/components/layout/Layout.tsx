import React, { PropsWithChildren } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<div>
			<Header onClickOutside={undefined} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
