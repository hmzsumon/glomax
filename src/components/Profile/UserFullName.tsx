import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	DialogHeader,
	IconButton,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
	useLoadUserQuery,
	useUpdateFullNameMutation,
} from '@/features/auth/authApi';
import { PulseLoader } from 'react-spinners';

const UserFullName = () => {
	const { user } = useSelector((state: any) => state.auth);
	useLoadUserQuery(user?._id);
	const [updateFullName, { isSuccess, isLoading }] =
		useUpdateFullNameMutation();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(''); // Set 'pic' state to hold a string value (URL or base64)
	const handleOpen = () => {
		// setTextError('');
		setOpen(!open);
	};

	const handleUpdateFullName = () => {
		updateFullName({
			name: name,
			id: user?._id,
		});
	};

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Full name updated successfully');
			handleOpen();
		}
	}, [isSuccess]);

	return (
		<div className='flex gap-2 list-none '>
			<li>{user?.name}</li>
			<RiEdit2Fill
				onClick={handleOpen}
				className='p-1 text-xl text-gray-400 bg-gray-600 rounded cursor-pointer hover:text-red-500'
			/>
			<Dialog
				size='xs'
				open={open}
				handler={handleOpen}
				className='bg-transparent shadow-none '
			>
				<Card className='relative mx-auto w-full max-w-[24rem] bg-black_2'>
					{/* <div className='absolute right-0'>
						<IconButton variant='text' color='white' onClick={handleOpen}>
							<XMarkIcon strokeWidth={2} className='w-5 h-5' />
						</IconButton>
					</div> */}
					<div className='pt-4 '>
						<h2 className='text-xl font-medium text-center text-blue-gray-100'>
							Update Full Name
						</h2>
					</div>

					<CardBody className='flex flex-col gap-4'>
						<Input
							label='Enter Full Name'
							size='lg'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='text-white '
						/>
					</CardBody>
					<CardFooter className='pt-0'>
						<Button
							// variant='gradient'
							onClick={handleUpdateFullName}
							fullWidth
							className='text-gray-900 bg-yellow-700 disabled:bg-gray-700 disabled:text-gray-900'
							disabled={name === ''}
						>
							{isLoading ? (
								<PulseLoader color='white' size={10} />
							) : (
								<span>Save</span>
							)}
						</Button>
					</CardFooter>
				</Card>
			</Dialog>
		</div>
	);
};

export default UserFullName;
