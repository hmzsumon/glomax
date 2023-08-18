import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='icon' href='/fev_icon.png' />
				<meta property='og:image' content='/logo_white_2.png' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
