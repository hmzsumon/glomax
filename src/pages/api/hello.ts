// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Binance from 'binance-api-node';
type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({ name: 'John Doe' });
}

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
