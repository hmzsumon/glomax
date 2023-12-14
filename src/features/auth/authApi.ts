import { setCookie } from '@/utils/cookie';
import { apiSlice } from '../api/apiSlice';
import { setUser, logoutUser } from './authSlice';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
export interface IUser {
	user: any;
	token: string;
	success: boolean;
	data: {
		_id: string;
		name: string;
		email: string;
		role: string;
		createdAt: string;
		updatedAt: string;
	};
}
export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get users from api with typescript
		getUsers: builder.query<any, void>({
			query: () => '/users',
			providesTags: ['Users'],
		}),

		// register user
		registerUser: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/register',
				method: 'POST',
				body,
			}),
		}),

		// verify email
		verifyEmail: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/verify-email',
				method: 'POST',
				body,
				delay: 30000,
			}),
			invalidatesTags: ['User'],
		}),

		// create password
		createPassword: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/create-password',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// login user
		loginUser: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setUser(result.data));
				} catch (error) {
					// diclear error type
					error as any;
				}
			},
		}),

		// get user by token._id from cookie
		loadUser: builder.query<any, void>({
			query: () => '/load-user ', //`/user-by-token/${token}
			providesTags: ['User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setUser(result.data));
				} catch (error) {
					// diclear error type
					error as any;
				}
			},
		}),

		// logout user
		logoutUser: builder.mutation<IUser, any>({
			query: ({ email }) => ({
				url: `/logout/${email}`,
				method: 'POST',
				body: { email },
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(logoutUser());
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// get my team
		getMyTeam: builder.query<any, void>({
			query: (id) => `/my-team/${id}`,
			// providesTags: ['User'],
		}),

		// resend verification email
		resendVerificationEmail: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/resend-email-verification',
				method: 'POST',
				body,
			}),
		}),

		// registration done
		registrationDone: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/register-done',
				method: 'POST',
				body,
			}),
		}),

		// check if user is exist by email
		checkUserByEmail: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/check-user-by-email',
				method: 'POST',
				body,
			}),
		}),

		// get logged in user level_1 mambers
		getLoggedInUserLevel1Members: builder.query<any, void>({
			query: (id) => `/get-level-1-members/${id}`,
			providesTags: ['User'],
		}),

		// change email
		changeEmail: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/change-email',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(logoutUser());
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// verify code for change email
		verifyCodeForChangeEmail: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/verify-code-for-change-email',
				method: 'POST',
				body,
			}),
		}),

		// add phone number
		addPhoneNumber: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/add-phone-number',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// change phone number
		changePhoneNumber: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/change-phone-number',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// change password
		changePassword: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/change-password',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// security verify
		securityVerify: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/security-verify',
				method: 'POST',
				body,
			}),
		}),

		// update user profile picture
		updateUserProfilePicture: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/update-profile-picture',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// update full name
		updateFullName: builder.mutation<IUser, any>({
			query: (body) => ({
				url: '/update-full-name',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// get all transactions
		getAllTransactions: builder.query<any, void>({
			query: () => '/transactions',
		}),

		// claim rank bonus
		claimRankBonus: builder.mutation<any, any>({
			query: () => ({
				url: '/claim-rank-bonus',
				method: 'PUT',
			}),
			invalidatesTags: ['User'],
		}),

		// my rank record
		myRankRecord: builder.query<any, void>({
			query: () => '/my-rank-record',
			providesTags: ['User'],
		}),

		// get rank members
		getRankMembers: builder.query<any, void>({
			query: () => `/get-rank-members`,
			providesTags: ['Users'],
		}),

		// get rank members by rank
		getRankMembersByRank: builder.query<any, any>({
			query: ({ rank }) => `/get-rank-members-by-rank/${rank}`,
			providesTags: ['Users'],
		}),

		// kyc verification
		kycVerification: builder.mutation<any, any>({
			query: (body) => ({
				url: '/submit-kyc',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// add payment method
		addPaymentMethod: builder.mutation<any, any>({
			query: (body) => ({
				url: '/add-payment-method',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// find user by customer id
		findUserByCustomerId: builder.mutation<any, any>({
			query: (userId) => ({
				url: `/find-user-by-customer-id/${userId}`,
				method: 'PUT',
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useRegisterUserMutation,
	useVerifyEmailMutation,
	useCreatePasswordMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
	useGetMyTeamQuery,
	useResendVerificationEmailMutation,
	useRegistrationDoneMutation,
	useCheckUserByEmailMutation,
	useLoadUserQuery,
	useGetLoggedInUserLevel1MembersQuery,
	useChangeEmailMutation,
	useVerifyCodeForChangeEmailMutation,
	useAddPhoneNumberMutation,
	useSecurityVerifyMutation,
	useChangePhoneNumberMutation,
	useUpdateUserProfilePictureMutation,
	useUpdateFullNameMutation,
	useGetAllTransactionsQuery,
	useClaimRankBonusMutation,
	useMyRankRecordQuery,
	useGetRankMembersQuery,
	useGetRankMembersByRankQuery,
	useChangePasswordMutation,
	useKycVerificationMutation,
	useAddPaymentMethodMutation,
	useFindUserByCustomerIdMutation,
} = authApi;
