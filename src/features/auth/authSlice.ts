import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
	btnLogin: false,
	user: null,
	token: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setBtnLogin: (state) => {
			state.btnLogin = !state.btnLogin;
		},
		setUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			// Save token and user info to cookies
			// const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
			Cookies.set('token', action.payload.token, {
				expires: 1,
			});
			Cookies.set('user', JSON.stringify(action.payload.user), {
				expires: 1,
			});
		},
		logoutUser: (state) => {
			console.log('logoutUser');
			state.user = null;
			state.isAuthenticated = false;
			// Remove token and user info from cookies
			Cookies.remove('token');
			Cookies.remove('user');
		},
	},
});

export const { setBtnLogin, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
