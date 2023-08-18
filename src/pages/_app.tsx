import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'; // Redux
import { persistor, store } from '@store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
				<ToastContainer />
			</PersistGate>
		</Provider>
	);
}
