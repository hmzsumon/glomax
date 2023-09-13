import { apiSlice } from '../api/apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getNotifications: builder.query({
			query: () => '/user-notifications',
			providesTags: ['Notification'],
		}),

		// updateNotification
		updateNotification: builder.mutation({
			query: (id) => ({
				url: `/update/notifications/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Notification'],
		}),
	}),
});

export const { useGetNotificationsQuery, useUpdateNotificationMutation } =
	notificationApi;
