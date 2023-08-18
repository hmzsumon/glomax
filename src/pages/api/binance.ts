import Binance from 'binance-api-node';

const client = Binance();

export async function getAccountInfo() {
	try {
		const accountInfo = await client.accountInfo();
		return accountInfo;
	} catch (error) {
		console.error('Error fetching account info:', error);
		throw error;
	}
}
