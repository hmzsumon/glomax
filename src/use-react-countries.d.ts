declare module 'use-react-countries' {
	export function useCountries(): {
		data: {
			alpha2Code: string;
			name: string;
		}[];
		loading: boolean;
		error: Error | null;
	};
}
