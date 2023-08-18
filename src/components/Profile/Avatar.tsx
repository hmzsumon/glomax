import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ScaleLoader, PulseLoader } from 'react-spinners';
import { RiEdit2Fill } from 'react-icons/ri';
import { FcOldTimeCamera } from 'react-icons/fc';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { useUpdateUserProfilePictureMutation } from '@/features/auth/authApi';
import { fetchBaseQueryError } from '@/services/helpers';
import UserFullName from './UserFullName';

const Avatar = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [updateUserProfilePicture, { isLoading, isError, isSuccess, error }] =
		useUpdateUserProfilePictureMutation();
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setTextError('');
		setOpen(!open);
	};

	const [pic, setPic] = useState<string>(''); // Set 'pic' state to hold a string value (URL or base64)

	const [loading, setLoading] = useState(false); // State to track loading status
	const [textError, setTextError] = useState(''); // State to hold error message

	// Handle file upload
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target?.files?.[0];

		if (file) {
			// Validate file type
			if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
				console.log('Invalid file type. Only JPG and PNG files are allowed.');
				setTextError('Invalid file type. Only JPG and PNG files are allowed.');
				return;
			}

			// Show loading state during upload
			setLoading(true);

			// Resize and upload to Cloudinary
			Resizer.imageFileResizer(
				file,
				300, // Desired width
				300, // Desired height
				'JPEG', // Output format (JPEG, PNG, WEBP, etc.)
				100, // Quality (0-100)
				0, // Rotation
				(uri) => {
					uploadToCloudinary(uri as string);
				},
				'base64' // Output type (base64, blob, file)
			);
		}
	};

	const uploadToCloudinary = async (dataUrl: string) => {
		// Use your Cloudinary credentials here
		const cloudinaryUrl =
			'https://api.cloudinary.com/v1_1/duza4meju/image/upload';
		const formData = new FormData();
		formData.append('file', dataUrl);
		formData.append('upload_preset', 'rapid-win');

		try {
			const response = await fetch(cloudinaryUrl, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			setPic(data.secure_url);
			setLoading(false); // Turn off loading state after successful upload
			console.log(data);
		} catch (error) {
			console.error('Error uploading image to Cloudinary:', error);
			setLoading(false); // Turn off loading state on error as well
		}
	};

	// Handle form submission
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		updateUserProfilePicture({
			url: pic,
			id: user?._id,
		});
	};

	useEffect(() => {
		if (isError) {
			toast.error((error as fetchBaseQueryError).data.message);
		}
		if (isSuccess) {
			toast.success('Profile picture updated successfully');
			handleOpen();
		}
	}, [isSuccess, isError]);

	return (
		<div>
			<div className=' flex flex-col space-y-2 items-center  justify-center mt-3 '>
				<div className=' relative '>
					{pic ? (
						<img
							src={pic}
							alt='user avatar'
							className='rounded-full ring-2 w-24 h-24 ring-blue-500'
						/>
					) : (
						<img
							src={user?.avatar.url ? user?.avatar.url : '/profile.png'}
							alt='user avatar'
							className='rounded-full w-24 h-24 ring-2 ring-blue-500'
						/>
					)}
					<FcOldTimeCamera
						onClick={handleOpen}
						className='bottom-0 right-0  cursor-pointer hover:text-red-500 p-1 absolute text-2xl text-gray-400 bg-gray-600 rounded'
					/>
				</div>
				<UserFullName />
			</div>

			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>
					<div className='flex justify-between items-center'>
						<h2 className='text-xl font-medium'>Update Profile Picture</h2>
					</div>
				</DialogHeader>
				<DialogBody divider>
					<div>
						<div className='my-4'>
							{loading ? (
								// Display a loading indicator during image upload
								<div className='flex items-center justify-center h-20 w-20 rounded-full ring-2 ring-blue-500'>
									<ScaleLoader color='blue' />
								</div>
							) : (
								// Show the uploaded image or the default avatar
								<img
									src={pic || user?.avatar.url || '/profile.png'}
									alt='user avatar'
									className='rounded-full ring-2 w-24 h-24 ring-blue-500'
								/>
							)}
						</div>
						<div className=' flex flex-col'>
							<input
								type='file'
								accept='image/jpeg, image/png'
								onChange={handleFileUpload}
							/>
							{textError && <small className='text-red-500'>{textError}</small>}
						</div>
					</div>
				</DialogBody>
				<DialogFooter>
					<Button
						variant='text'
						color='red'
						onClick={handleOpen}
						className='mr-1 '
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant='gradient'
						color='green'
						onClick={handleSubmit}
						className='mr-1 disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={loading || !pic || isLoading}
					>
						{loading || isLoading ? (
							<PulseLoader color='white' size={10} />
						) : (
							<span>Save</span>
						)}
					</Button>
				</DialogFooter>
			</Dialog>
		</div>
	);
};

export default Avatar;
