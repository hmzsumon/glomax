import { NextPage } from 'next';
import Head from 'next/head';
import Hero from '@components/Home/Hero';
import SimpleSlider from '@components/Home/Carousel';
import Help from '@components/Home/Help';
import StartEaring from '@components/Home/StartEaring';
import Layout from '@/Layout';
import { useSelector } from 'react-redux';
import Footer from '@/Layout/Footer/Footer';
import Notice from '@/components/Home/Notice';
import Menu from '@/components/Home/Menu';
import TradeSection from '@/components/Home/TradeSection';
import AiSection from '@/components/Home/AiSection';
import WinGame from '@/components/Home/WinGame';
import MakeUp from '@/components/Home/MakeUp';

const Home: NextPage = () => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return (
		<Layout>
			<main className={`pt-20 ${isAuthenticated && 'pb-14'}`}>
				{!isAuthenticated && <Hero />}
				<SimpleSlider />
				{isAuthenticated && <Notice />}
				{isAuthenticated && <Menu />}
				<TradeSection />
				<AiSection />
				{/* <WinGame /> */}
				<MakeUp />
				<Help />
				{!isAuthenticated && <StartEaring />}
				{!isAuthenticated && <Footer />}
			</main>
		</Layout>
	);
};

export default Home;
