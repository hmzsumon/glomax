import React, { useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useLoadUserQuery } from '@/features/auth/authApi';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
	const router = useRouter();
	const { isAuthenticated, user } = useSelector((state: any) => state.auth);
	useLoadUserQuery(user?._id);
	useEffect(() => {
		const token = Cookies.get('token');
		if (!token) {
			router.push('/login');
		}
	}, [isAuthenticated]);

	return <div>{children}</div>;
};

export default ProtectedRoute;
