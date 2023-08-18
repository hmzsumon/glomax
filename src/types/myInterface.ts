import Timer from '../components/Wingame/Timer';
export interface winGameInterface {
	game: {
		id: number;
		name: string;
		age: number;
		createdAt: Date;
		game_id: string;
		game_title: string;
		game_type: string;
		is_active: boolean;
		losers: number;
		participants: number;
		start_time: Date;
		time: number;
		total_lose_amount: number;
		total_trade_amount: number;
		total_win_amount: number;
		updatedAt: Date;
		win_colors: string[];
		winners: number;
		__v: number;
		_id: string;
	};
}

export interface TimeInterface {
	timer: number;
	gameId: string;
}

export interface TradeInterface {
	id: number;
	value: string;
	color: string;
	title: string;
	colors: string[];
	profit: number;
}

export interface RootState {
	trade: {
		count: number;
	};
}
export interface CryptoMarket {
	id: string;
	name: string;
	symbol: string;
	price: number;
	// Add more properties as needed
}

// Combine both interfaces to create a new interface
export interface MyCombinedInterface extends winGameInterface {}
