import Rect, { ReactNode, createContext, useContext, useState } from 'react';

interface GameContextProviderProps {
	children: ReactNode;
}
// Define the shape of the context data
interface GameContextData {
	count: number;
	incrementCount: () => void;
}

// Create the context
const GameContext = createContext<GameContextData>({
	count: 20,
	incrementCount: () => {},
} as GameContextData);

// Custom hook to access the context data
const useGameContext = () => useContext(GameContext);

// Context provider component
const GameContextProvider: React.FC<GameContextProviderProps> = ({
	children,
}: any) => {
	const [count, setCount] = useState(0);

	const incrementCount = () => setCount((prevCount) => prevCount + 1);

	const value = {
		count,
		incrementCount,
		setCount,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContextProvider, useGameContext };
