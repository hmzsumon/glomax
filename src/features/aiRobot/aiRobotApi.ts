import { apiSlice } from '../api/apiSlice';

export const aiRobotApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create a new aiRobot
		createAiRobot: builder.mutation({
			query: (data) => ({
				url: `/aiRobot/new`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User', 'AiRobot'],
		}),

		// my aiRobot
		myAiRobot: builder.query({
			query: () => `/aiRobot/me`,
			providesTags: ['AiRobot'],
		}),

		// cancel aiRobot
		cancelAiRobot: builder.mutation({
			query: () => ({
				url: `/aiRobot/cancel`,
				method: 'PUT',
			}),
			invalidatesTags: ['User', 'AiRobot'],
		}),

		// edit aiRobot
		editAiRobot: builder.mutation({
			query: (data) => ({
				url: `/aiRobot/edit`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['User', 'AiRobot'],
		}),

		// get all aiRobot
		getAllAiRobot: builder.query({
			query: () => `/aiRobot/all`,
			providesTags: ['AiRobot'],
		}),
	}),
});

export const {
	useCreateAiRobotMutation,
	useMyAiRobotQuery,
	useCancelAiRobotMutation,
	useEditAiRobotMutation,
	useGetAllAiRobotQuery,
} = aiRobotApi;
