// components/CopyToClipboard.tsx

import { useEffect, useState } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

type CopyToClipboardProps = {
	text: string;
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
		} catch (error) {
			console.error('Failed to copy text: ', error);
		}
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isCopied) {
			timeout = setTimeout(() => setIsCopied(false), 3000);
		}

		return () => clearTimeout(timeout);
	}, [isCopied]);

	return (
		<div>
			<button onClick={copyToClipboard}>
				{isCopied ? (
					<span className='ml-2 text-xs text-green-500'>Copied</span>
				) : (
					<RiFileCopyFill className='inline-block ml-2 text-sm cursor-pointer text-blue-gray-400' />
				)}
			</button>
		</div>
	);
};

export default CopyToClipboard;
