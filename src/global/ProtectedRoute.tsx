import React, { useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useLoadUserQuery } from '@/features/auth/authApi';
import Cookies from 'js-cookie';
import { logoutUser } from '@/features/auth/authSlice';

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isAuthenticated,  } = useSelector((state: any) => state.auth);
	// useLoadUserQuery(user?._id);
	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/login');
			dispatch(logoutUser());
		}
	}, [isAuthenticated]);

	return <div>{children}</div>;
};

export default ProtectedRoute;
