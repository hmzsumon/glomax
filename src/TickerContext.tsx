// TickerContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface TickerData {
	// Define your ticker data structure here
	h: string;
	l: string;
	v: string;
	c: string;
	o: string;
	s: string;
	e: string;
	E: string;
	q: string;
	p: string;
	P: string;
	w: string;
	x: string;
	X: string;
	b: string;
	B: string;
	a: string;
	A: string;
	O: string;

	Q: string;
}

interface TickerContextValue {
	ticker: TickerData | null;
}

const TickerContext = createContext<TickerContextValue | undefined>(undefined);

export const useTickerContext = () => {
	const context = useContext(TickerContext);
	if (!context) {
		throw new Error('useTickerContext must be used within a TickerProvider');
	}
	return context;
};

export const TickerProvider: any = ({ children }: any) => {
	const { symbol } = useSelector((state: any) => state.trade);
	const l_symbol = symbol.toLowerCase();
	const [ticker, setTicker] = useState<TickerData | null>(null);

	useEffect(() => {
		const ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${l_symbol}@ticker`
		);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setTicker(data);
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};

		return () => {
			ws.close();
		};
	}, [symbol]);

	const contextValue: TickerContextValue = {
		ticker,
	};

	return (
		<TickerContext.Provider value={contextValue}>
			{children}
		</TickerContext.Provider>
	);
};
