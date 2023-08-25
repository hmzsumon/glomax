import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ProgressBar } from '@components/ProgressBar';
import { Provider } from 'react-redux'; // Redux
import { persistor, store } from '@store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TickerProvider } from '@/TickerContext';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ProgressBar />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<TickerProvider>
						<Component {...pageProps} />
						<ToastContainer autoClose={2000} />
					</TickerProvider>
				</PersistGate>
			</Provider>
		</>
	);
}
