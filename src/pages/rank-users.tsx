import Layout from '@/Layout';
import ProtectedRoute from '@/global/ProtectedRoute';
import React from 'react';
import { useRouter } from 'next/router';
import { useGetRankMembersByRankQuery } from '@/features/auth/authApi';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { formDate } from '@/utils/functions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const RankUser = () => {
	const router = useRouter();
	const { rank } = router.query;
	const { data, isLoading } = useGetRankMembersByRankQuery({ rank });
	const { users } = data || {};
	console.log(users);

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const columns = [
		{
			field: 'date',
			headerName: 'Created At',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.date}</p>
				</div>
			),
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 150,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.name}</p>
				</div>
			),
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.email}</p>
				</div>
			),
		},

		{
			field: 'customer_id',
			headerName: 'Customer ID',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.customer_id}</p>
				</div>
			),
		},

		{
			field: 'rank',
			headerName: 'Rank',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.rank}</p>
				</div>
			),
		},

		{
			field: 'members',
			headerName: 'Members',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.members}</p>
				</div>
			),
		},

		{
			field: 'is_active',
			headerName: 'Status',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.is_active ? (
							<p className='text-success '>
								<span>Active</span>
							</p>
						) : (
							<p className='text-danger '>
								<span>Inactive</span>
							</p>
						)}
					</div>
				);
			},
		},
	];

	const rows: any = [];

	users &&
		users.map((user: any) => {
			return rows.unshift({
				id: user._id,
				name: user.name,
				email: user.email,
				customer_id: user.customer_id,
				date: formDate(user.createdAt),
				is_active: user.is_active,
				block: user.is_block,
				rank: user.rank,
				members:
					user.level_1_count +
					user.level_2_count +
					user.level_3_count +
					user.level_4_count +
					user.level_5_count,
			});
		});
	return (
		<Layout>
			<ProtectedRoute>
				<div className='px-4 pt-20 pb-24 '>
					<h1 className='my-2 font-bold text-center '>Rank Users</h1>

					<div className='h-80'>
						<ThemeProvider theme={theme}>
							<DataGrid rows={rows} columns={columns} loading={isLoading} />
						</ThemeProvider>
					</div>
				</div>
			</ProtectedRoute>
		</Layout>
	);
};

export default RankUser;
