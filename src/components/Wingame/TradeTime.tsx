import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Option } from '@material-tailwind/react';
const countries = [
	{ name: 'Afghanistan', timezone: 'Asia/Kabul', flag: '🇦🇫' },
	{ name: 'Albania', timezone: 'Europe/Tirane', flag: '🇦🇱' },
	{ name: 'Algeria', timezone: 'Africa/Algiers', flag: '🇩🇿' },
	{ name: 'American Samoa', timezone: 'Pacific/Pago_Pago', flag: '🇦🇸' },
	{ name: 'Andorra', timezone: 'Europe/Andorra', flag: '🇦🇩' },
	{ name: 'Angola', timezone: 'Africa/Luanda', flag: '🇦🇴' },
	{ name: 'Anguilla', timezone: 'America/Anguilla', flag: '🇦🇮' },
	{ name: 'Antarctica', timezone: 'Antarctica/Casey', flag: '🇦🇶' },
	{ name: 'Antigua', timezone: 'America/Antigua', flag: '🇦🇬' },
	{
		name: 'Argentina',
		timezone: 'America/Argentina/Buenos_Aires',
		flag: '🇦🇷',
	},
	{ name: 'Armenia', timezone: 'Asia/Yerevan', flag: '🇦🇲' },
	{ name: 'Aruba', timezone: 'America/Aruba', flag: '🇦🇼' },
	{ name: 'Australia', timezone: 'Australia/Adelaide', flag: '🇦🇺' },
	{ name: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹' },
	{ name: 'Azerbaijan', timezone: 'Asia/Baku', flag: '🇦🇿' },
	{ name: 'Bahamas', timezone: 'America/Nassau', flag: '🇧🇸' },
	{ name: 'Bahrain', timezone: 'Asia/Bahrain', flag: '🇧🇭' },
	{ name: 'Bangladesh', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
	{ name: 'Barbados', timezone: 'America/Barbados', flag: '🇧🇧' },
	{ name: 'Belarus', timezone: 'Europe/Minsk', flag: '🇧🇾' },
	{ name: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪' },
	{ name: 'Belize', timezone: 'America/Belize', flag: '🇧🇿' },
	{ name: 'Benin', timezone: 'Africa/Porto-Novo', flag: '🇧🇯' },
	{ name: 'Bermuda', timezone: 'Atlantic/Bermuda', flag: '🇧🇲' },
	{ name: 'Bhutan', timezone: 'Asia/Thimphu', flag: '🇧🇹' },
	{ name: 'Bolivia', timezone: 'America/La_Paz', flag: '🇧🇴' },
	{ name: 'Bonaire', timezone: 'America/Kralendijk', flag: '🇧🇶' },
	{ name: 'Bosnia', timezone: 'Europe/Sarajevo', flag: '🇧🇦' },
	{ name: 'Botswana', timezone: 'Africa/Gaborone', flag: '🇧🇼' },
	{ name: 'Bouvet Island', timezone: 'Europe/Oslo', flag: '🇧🇻' },
	{ name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
	{ name: 'British Indian', timezone: 'Indian/Chagos', flag: '🇮🇴' },
	{ name: 'Brunei Darussalam', timezone: 'Asia/Brunei', flag: '🇧🇳' },
	{ name: 'Bulgaria', timezone: 'Europe/Sofia', flag: '🇧🇬' },
	{ name: 'Burkina Faso', timezone: 'Africa/Ouagadougou', flag: '🇧🇫' },
	{ name: 'Burundi', timezone: 'Africa/Bujumbura', flag: '🇧🇮' },
	{ name: 'Cambodia', timezone: 'Asia/Phnom_Penh', flag: '🇰🇭' },
	{ name: 'Cameroon', timezone: 'Africa/Douala', flag: '🇨🇲' },
	{ name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
	{ name: 'Cape Verde', timezone: 'Atlantic/Cape_Verde', flag: '🇨🇻' },
	{ name: 'Cayman Islands', timezone: 'America/Cayman', flag: '🇰🇾' },
	{ name: 'Central African ', timezone: 'Africa/Bangui', flag: '🇨🇫' },
	{ name: 'Chad', timezone: 'Africa/Ndjamena', flag: '🇹🇩' },
	{ name: 'Chile', timezone: 'America/Santiago', flag: '🇨🇱' },
	{ name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
	{ name: 'Christmas Island', timezone: 'Indian/Christmas', flag: '🇨🇽' },
	{ name: 'Cocos ', timezone: 'Indian/Cocos', flag: '🇨🇨' },
	{ name: 'Colombia', timezone: 'America/Bogota', flag: '🇨🇴' },
	{ name: 'Comoros', timezone: 'Indian/Comoro', flag: '🇰🇲' },
	{ name: 'Congo', timezone: 'Africa/Brazzaville', flag: '🇨🇬' },
	{ name: 'Cook Islands', timezone: 'Pacific/Rarotonga', flag: '🇨🇰' },
	{ name: 'Costa Rica', timezone: 'America/Costa_Rica', flag: '🇨🇷' },
	{ name: 'Croatia', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
	{ name: 'Cuba', timezone: 'America/Havana', flag: '🇨🇺' },
	{ name: 'Curaçao', timezone: 'America/Curacao', flag: '🇨🇼' },
	{ name: 'Cyprus', timezone: 'Asia/Nicosia', flag: '🇨🇾' },
	{ name: 'Czech Republic', timezone: 'Europe/Prague', flag: '🇨🇿' },
	{ name: "Côte d'Ivoire", timezone: 'Africa/Abidjan', flag: '🇨🇮' },
	{ name: ' Congo', timezone: 'Africa/Kinshasa', flag: '🇨🇩' },
	{ name: 'Denmark', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
	{ name: 'Djibouti', timezone: 'Africa/Djibouti', flag: '🇩🇯' },
	{ name: 'Dominica', timezone: 'America/Dominica', flag: '🇩🇲' },
	{
		name: 'Dominican Republic',
		timezone: 'America/Santo_Domingo',
		flag: '🇩🇴',
	},
	{ name: 'Ecuador', timezone: 'America/Guayaquil', flag: '🇪🇨' },
	{ name: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬' },
	{ name: 'El Salvador', timezone: 'America/El_Salvador', flag: '🇸🇻' },
	{ name: 'Equatorial Guinea', timezone: 'Africa/Malabo', flag: '🇬🇶' },
	{ name: 'Eritrea', timezone: 'Africa/Asmara', flag: '🇪🇷' },
	{ name: 'Estonia', timezone: 'Europe/Tallinn', flag: '🇪🇪' },
	{ name: 'Ethiopia', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
	{ name: 'Falkland ', timezone: 'Atlantic/Stanley', flag: '🇫🇰' },
	{ name: 'Faroe Islands', timezone: 'Atlantic/Faroe', flag: '🇫🇴' },
	{ name: 'Fiji', timezone: 'Pacific/Fiji', flag: '🇫🇯' },
	{ name: 'Finland', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
	{ name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
	{ name: 'French Guiana', timezone: 'America/Cayenne', flag: '🇬🇫' },
	{ name: 'French Polynesia', timezone: 'Pacific/Tahiti', flag: '🇵🇫' },
	{ name: 'French ', timezone: 'Indian/Kerguelen', flag: '🇹🇫' },
	{ name: 'Gabon', timezone: 'Africa/Libreville', flag: '🇬🇦' },
	{ name: 'Gambia', timezone: 'Africa/Banjul', flag: '🇬🇲' },
	{ name: 'Georgia', timezone: 'Asia/Tbilisi', flag: '🇬🇪' },
	{ name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
	{ name: 'Ghana', timezone: 'Africa/Accra', flag: '🇬🇭' },
	{ name: 'Gibraltar', timezone: 'Europe/Gibraltar', flag: '🇬🇮' },
	{ name: 'Greece', timezone: 'Europe/Athens', flag: '🇬🇷' },
	{ name: 'Greenland', timezone: 'America/Godthab', flag: '🇬🇱' },
	{ name: 'Grenada', timezone: 'America/Grenada', flag: '🇬🇩' },
	{ name: 'Guadeloupe', timezone: 'America/Guadeloupe', flag: '🇬🇵' },
	{ name: 'Guam', timezone: 'Pacific/Guam', flag: '🇬🇺' },
	{ name: 'Guatemala', timezone: 'America/Guatemala', flag: '🇬🇹' },
	{ name: 'Guernsey', timezone: 'Europe/Guernsey', flag: '🇬🇬' },
	{ name: 'Guinea', timezone: 'Africa/Conakry', flag: '🇬🇳' },
	{ name: 'Guinea-Bissau', timezone: 'Africa/Bissau', flag: '🇬🇼' },
	{ name: 'Guyana', timezone: 'America/Guyana', flag: '🇬🇾' },
	{ name: 'Haiti', timezone: 'America/Port-au-Prince', flag: '🇭🇹' },
	{ name: 'Heard Island', timezone: 'Indian/Kerguelen', flag: '🇭🇲' },
	{ name: 'Holy See', timezone: 'Europe/Vatican', flag: '🇻🇦' },
	{ name: 'Honduras', timezone: 'America/Tegucigalpa', flag: '🇭🇳' },
	{ name: 'Hong Kong', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
	{ name: 'Hungary', timezone: 'Europe/Budapest', flag: '🇭🇺' },
	{ name: 'Iceland', timezone: 'Atlantic/Reykjavik', flag: '🇮🇸' },
	{ name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
	{ name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
	{ name: 'Iran', timezone: 'Asia/Tehran', flag: '🇮🇷' },
	{ name: 'Iraq', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
	{ name: 'Ireland', timezone: 'Europe/Dublin', flag: '🇮🇪' },
	{ name: 'Israel', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
	{ name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
	{ name: 'Jamaica', timezone: 'America/Jamaica', flag: '🇯🇲' },
	{ name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
	{ name: 'Jersey', timezone: 'Europe/Jersey', flag: '🇯🇪' },
	{ name: 'Jordan', timezone: 'Asia/Amman', flag: '🇯🇴' },
	{ name: 'Kazakhstan', timezone: 'Asia/Almaty', flag: '🇰🇿' },
	{ name: 'Kenya', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
	{ name: 'Kiribati', timezone: 'Pacific/Tarawa', flag: '🇰🇮' },
	{ name: 'Kuwait', timezone: 'Asia/Kuwait', flag: '🇰🇼' },
	{ name: 'Kyrgyzstan', timezone: 'Asia/Bishkek', flag: '🇰🇬' },
	{ name: 'Lao People', timezone: 'Asia/Vientiane', flag: '🇱🇦' },
	{ name: 'Latvia', timezone: 'Europe/Riga', flag: '🇱🇻' },
	{ name: 'Lebanon', timezone: 'Asia/Beirut', flag: '🇱🇧' },
	{ name: 'Lesotho', timezone: 'Africa/Maseru', flag: '🇱🇸' },
	{ name: 'Liberia', timezone: 'Africa/Monrovia', flag: '🇱🇷' },
	{ name: 'Libya', timezone: 'Africa/Tripoli', flag: '🇱🇾' },
	{ name: 'Liechtenstein', timezone: 'Europe/Vaduz', flag: '🇱🇮' },
	{ name: 'Lithuania', timezone: 'Europe/Vilnius', flag: '🇱🇹' },
	{ name: 'Luxembourg', timezone: 'Europe/Luxembourg', flag: '🇱🇺' },
	{ name: 'Macao', timezone: 'Asia/Macau', flag: '🇲🇴' },
	{ name: 'Macedonia', timezone: 'Europe/Skopje', flag: '🇲🇰' },
	{ name: 'Madagascar', timezone: 'Indian/Antananarivo', flag: '🇲🇬' },
	{ name: 'Malawi', timezone: 'Africa/Blantyre', flag: '🇲🇼' },
	{ name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
	{ name: 'Maldives', timezone: 'Indian/Maldives', flag: '🇲🇻' },
	{ name: 'Mali', timezone: 'Africa/Bamako', flag: '🇲🇱' },
	{ name: 'Malta', timezone: 'Europe/Malta', flag: '🇲🇹' },
	{ name: 'Marshall Islands', timezone: 'Pacific/Majuro', flag: '🇲🇭' },
	{ name: 'Martinique', timezone: 'America/Martinique', flag: '🇲🇶' },
	{ name: 'Mauritania', timezone: 'Africa/Nouakchott', flag: '🇲🇷' },
	{ name: 'Mauritius', timezone: 'Indian/Mauritius', flag: '🇲🇺' },
	{ name: 'Mayotte', timezone: 'Indian/Mayotte', flag: '🇾🇹' },
	{ name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
	{ name: 'Micronesia', timezone: 'Pacific/Chuuk', flag: '🇫🇲' },
	{ name: 'Moldova', timezone: 'Europe/Chisinau', flag: '🇲🇩' },
	{ name: 'Monaco', timezone: 'Europe/Monaco', flag: '🇲🇨' },
	{ name: 'Mongolia', timezone: 'Asia/Ulaanbaatar', flag: '🇲🇳' },
	{ name: 'Montenegro', timezone: 'Europe/Podgorica', flag: '🇲🇪' },
	{ name: 'Montserrat', timezone: 'America/Montserrat', flag: '🇲🇸' },
	{ name: 'Morocco', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
	{ name: 'Mozambique', timezone: 'Africa/Maputo', flag: '🇲🇿' },
	{ name: 'Myanmar', timezone: 'Asia/Yangon', flag: '🇲🇲' },
	{ name: 'Namibia', timezone: 'Africa/Windhoek', flag: '🇳🇦' },
	{ name: 'Nauru', timezone: 'Pacific/Nauru', flag: '🇳🇷' },
	{ name: 'Nepal', timezone: 'Asia/Kathmandu', flag: '🇳🇵' },
	{ name: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
	{ name: 'New Caledonia', timezone: 'Pacific/Noumea', flag: '🇳🇨' },
	{ name: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
	{ name: 'Nicaragua', timezone: 'America/Managua', flag: '🇳🇮' },
	{ name: 'Niger', timezone: 'Africa/Niamey', flag: '🇳🇪' },
	{ name: 'Nigeria', timezone: 'Africa/Lagos', flag: '🇳🇬' },
	{ name: 'Niue', timezone: 'Pacific/Niue', flag: '🇳🇺' },
	{ name: 'Norfolk Island', timezone: 'Pacific/Norfolk', flag: '🇳🇫' },
	{ name: 'North Korea', timezone: 'Asia/Pyongyang', flag: '🇰🇵' },
	{ name: 'Northern ', timezone: 'Pacific/Saipan', flag: '🇲🇵' },
	{ name: 'Norway', timezone: 'Europe/Oslo', flag: '🇳🇴' },
	{ name: 'Oman', timezone: 'Asia/Muscat', flag: '🇴🇲' },
	{ name: 'Pakistan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
	{ name: 'Palau', timezone: 'Pacific/Palau', flag: '🇵🇼' },

	{ name: 'Panama', timezone: 'America/Panama', flag: '🇵🇦' },
	{ name: 'Papua Guinea', timezone: 'Pacific/Port_Moresby', flag: '🇵🇬' },
	{ name: 'Paraguay', timezone: 'America/Asuncion', flag: '🇵🇾' },
	{ name: 'Peru', timezone: 'America/Lima', flag: '🇵🇪' },
	{ name: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭' },
	{ name: 'Pitcairn', timezone: 'Pacific/Pitcairn', flag: '🇵🇳' },
	{ name: 'Poland', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
	{ name: 'Portugal', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
	{ name: 'Puerto Rico', timezone: 'America/Puerto_Rico', flag: '🇵🇷' },
	{ name: 'Qatar', timezone: 'Asia/Qatar', flag: '🇶🇦' },
	{ name: 'Romania', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
	{ name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
	{ name: 'Rwanda', timezone: 'Africa/Kigali', flag: '🇷🇼' },
	{ name: 'Réunion', timezone: 'Indian/Reunion', flag: '🇷🇪' },
	{ name: 'Saint Barthélemy', timezone: 'America/St_Barthelemy', flag: '🇧🇱' },
	{ name: 'Saint Helena', timezone: 'Atlantic/St_Helena', flag: '🇸🇭' },
	{ name: 'Saint Kitts', timezone: 'America/St_Kitts', flag: '🇰🇳' },
	{ name: 'Saint Lucia', timezone: 'America/St_Lucia', flag: '🇱🇨' },
	{ name: 'Saint Martin', timezone: 'America/Marigot', flag: '🇲🇫' },
	{ name: 'Saint Pierre ', timezone: 'America/Miquelon', flag: '🇵🇲' },
	{ name: 'Saint Vincent', timezone: 'America/St_Vincent', flag: '🇻🇨' },
	{ name: 'Samoa', timezone: 'Pacific/Apia', flag: '🇼🇸' },
	{ name: 'San Marino', timezone: 'Europe/San_Marino', flag: '🇸🇲' },
	{ name: 'Sao Tome and Principe', timezone: 'Africa/Sao_Tome', flag: '🇸🇹' },
	{ name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
	{ name: 'Senegal', timezone: 'Africa/Dakar', flag: '🇸🇳' },
	{ name: 'Serbia', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
	{ name: 'Seychelles', timezone: 'Indian/Mahe', flag: '🇸🇨' },
	{ name: 'Sierra Leone', timezone: 'Africa/Freetown', flag: '🇸🇱' },
	{ name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
	{ name: 'Sint Maarten', timezone: 'America/Lower_Princes', flag: '🇸🇽' },
	{ name: 'Slovakia', timezone: 'Europe/Bratislava', flag: '🇸🇰' },
	{ name: 'Slovenia', timezone: 'Europe/Ljubljana', flag: '🇸🇮' },
	{ name: 'Solomon Islands', timezone: 'Pacific/Guadalcanal', flag: '🇸🇧' },
	{ name: 'Somalia', timezone: 'Africa/Mogadishu', flag: '🇸🇴' },
	{ name: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
	{ name: 'South Georgia', timezone: 'Atlantic/South_Georgia', flag: '🇬🇸' },
	{ name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
	{ name: 'South Sudan', timezone: 'Africa/Juba', flag: '🇸🇸' },
	{ name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
	{ name: 'Sri Lanka', timezone: 'Asia/Colombo', flag: '🇱🇰' },
	{ name: 'Sudan', timezone: 'Africa/Khartoum', flag: '🇸🇩' },
	{ name: 'Suriname', timezone: 'America/Paramaribo', flag: '🇸🇷' },
	{ name: 'Svalbard', timezone: 'Arctic/Longyearbyen', flag: '🇸🇯' },
	{ name: 'Swaziland', timezone: 'Africa/Mbabane', flag: '🇸🇿' },
	{ name: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
	{ name: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭' },

	{ name: 'Syrian ', timezone: 'Asia/Damascus', flag: '🇸🇾' },
	{ name: 'Taiwan', timezone: 'Asia/Taipei', flag: '🇹🇼' },
	{ name: 'Tajikistan', timezone: 'Asia/Dushanbe', flag: '🇹🇯' },
	{ name: 'Tanzania', timezone: 'Africa/Dar_es_Salaam', flag: '🇹🇿' },
	{ name: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
	{ name: 'Timor-Leste', timezone: 'Asia/Dili', flag: '🇹🇱' },
	{ name: 'Togo', timezone: 'Africa/Lome', flag: '🇹🇬' },
	{ name: 'Tokelau', timezone: 'Pacific/Fakaofo', flag: '🇹🇰' },
	{ name: 'Tonga', timezone: 'Pacific/Tongatapu', flag: '🇹🇴' },
	{ name: 'Trinidad ', timezone: 'America/Port_of_Spain', flag: '🇹🇹' },
	{ name: 'Tunisia', timezone: 'Africa/Tunis', flag: '🇹🇳' },
	{ name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
	{ name: 'Turkmenistan', timezone: 'Asia/Ashgabat', flag: '🇹🇲' },
	{ name: 'Turks ', timezone: 'America/Grand_Turk', flag: '🇹🇨' },
	{ name: 'Tuvalu', timezone: 'Pacific/Funafuti', flag: '🇹🇻' },
	{ name: 'Uganda', timezone: 'Africa/Kampala', flag: '🇺🇬' },
	{ name: 'Ukraine', timezone: 'Europe/Kiev', flag: '🇺🇦' },
	{ name: 'United Arab Emirates', timezone: 'Asia/Dubai', flag: '🇦🇪' },
	{ name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
	{ name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
	{ name: 'United  Minor', timezone: 'Pacific/Wake', flag: '🇺🇲' },
	{ name: 'Uruguay', timezone: 'America/Montevideo', flag: '🇺🇾' },
	{ name: 'Uzbekistan', timezone: 'Asia/Samarkand', flag: '🇺🇿' },
	{ name: 'Vanuatu', timezone: 'Pacific/Efate', flag: '🇻🇺' },
	{ name: 'Venezuela', timezone: 'America/Caracas', flag: '🇻🇪' },
	{ name: 'Viet Nam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
	{ name: 'Virgin', timezone: 'America/Tortola', flag: '🇻🇬' },
	{ name: 'Virgin', timezone: 'America/St_Thomas', flag: '🇻🇮' },
	{ name: 'Wallis ', timezone: 'Pacific/Wallis', flag: '🇼🇫' },
	{ name: 'Western Sahara', timezone: 'Africa/El_Aaiun', flag: '🇪🇭' },
	{ name: 'Yemen', timezone: 'Asia/Aden', flag: '🇾🇪' },
	{ name: 'Zambia', timezone: 'Africa/Lusaka', flag: '🇿🇲' },
	{ name: 'Zimbabwe', timezone: 'Africa/Harare', flag: '🇿🇼' },
];

interface Country {
	name: string;
	flag: string;
	timezone: string;
}

interface StartTime {
	hour: number;
	time: string;
}

const TradeTime = () => {
	const [selectedCountry, setSelectedCountry] =
		useState<string>('United Kingdom');
	const [currentTime, setCurrentTime] = useState<string>('');
	const [selectedCountryFlag, setSelectedCountryFlag] = useState<string>('');
	const [gameStartTimes, setGameStartTimes] = useState<StartTime[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const gameHours = [14, 19, 22];

	useEffect(() => {
		updateGameStartTimes(selectedCountry);
		fetchCurrentTime(selectedCountry);
	}, [selectedCountry]);

	useEffect(() => {
		// Assuming `countries` is of type `Country[]`
		const filteredCountries = countries.filter((country) =>
			country.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		if (filteredCountries.length === 1) {
			setSelectedCountry(filteredCountries[0].name);
			setSelectedCountryFlag(filteredCountries[0].flag);
		}
	}, [searchTerm]);

	const updateGameStartTimes = (countryName: string) => {
		const countryData = countries.find(
			(country) => country.name === countryName
		);
		if (!countryData) return; // handle missing country data
		const startTimes: StartTime[] = gameHours.map((hour) => {
			const startTime = new Date();
			startTime.setHours(hour, 0, 0, 0);
			return {
				hour,
				time: startTime.toLocaleTimeString('en-US', {
					timeZone: countryData.timezone,
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
				}),
			};
		});
		setGameStartTimes(startTimes);
	};

	const fetchCurrentTime = async (countryName: string) => {
		const countryData = countries.find(
			(country) => country.name === countryName
		);
		if (!countryData) return; // handle missing country data
		try {
			const response = await axios.get(
				`https://world-time2.p.rapidapi.com/timezone/${countryData.timezone}`,
				{
					headers: {
						'X-RapidAPI-Host': 'world-time2.p.rapidapi.com',
						'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
					},
				}
			);
			const currentTime = new Date(
				response.data.utc_datetime
			).toLocaleTimeString('en-US', {
				timeZone: countryData.timezone,
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
			});
			setCurrentTime(currentTime);
		} catch (error) {
			console.error('Error fetching current time:', error);
		}
	};

	const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCountryName = event.target.value;
		setSelectedCountry(selectedCountryName);
		const selectedCountryData = countries.find(
			(country) => country.name === selectedCountryName
		);
		if (selectedCountryData) {
			setSelectedCountryFlag(selectedCountryData.flag);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div className='bg-transparent '>
					<div className='flex flex-col gap-2 '>
						<label className='font-semibold text-blue-gray-200'>
							Select Your Country
						</label>
						<select
							style={{
								padding: '5px',
								border: '1px solid ',
								borderRadius: '5px',
								backgroundColor: 'green',
								color: 'white',
							}}
							onChange={handleCountryChange}
							value={selectedCountry}
						>
							{countries.map((country) => (
								<option key={country.name} value={country.name}>
									{country.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<ul>
							{gameStartTimes.map((startTime, index) => (
								<li
									key={startTime.hour}
									style={{
										border: '',
										borderRadius: '5px',
										padding: '5px',
										margin: '5px',
										color: '#0ea5e9',
									}}
								>
									<span style={{ fontSize: '18px', color: 'red' }}></span>{' '}
									{`${index + 1}${
										index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'
									} Trade Time:`}{' '}
									{startTime.time}
									{currentTime > startTime.time && <span> (Started)</span>}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default TradeTime;
