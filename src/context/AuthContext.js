'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authStatus, setAuthStatus] = useState('loading');
	const [userRole, setUserRole] = useState(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();

	const checkLogin = useCallback(async () => {
		try {
			const response = await fetch(`/api/is_logged_in`, {
				method: 'GET',
				credentials: 'include',
			});

			if (response.ok) {
				await handleAuthResponse(response);
			} else {
				const refreshed = await tryRefreshToken();
				if (refreshed) {

					const retryResponse = await fetch(`/api/is_logged_in`,{
						method: 'GET',
						credentials: 'include',
					});

					if (retryResponse.ok) {
						await handleAuthResponse(retryResponse);
					} else {
						logoutAndRedirect();
					}
				} else {
					logoutAndRedirect();
				}
			}
		} catch (error) {
			logoutAndRedirect();
		}
	}, []);

	
	const handleAuthResponse = async (response) => {
		const data = await response.json();

		setUserRole(data.role);
		setAuthStatus(data.role === 'admin' ? 'admin' : 'member');
	};


	const tryRefreshToken = async () => {
		try {
			const response = await fetch(`/api/refresh_token`, {
				method: 'POST',
				credentials: 'include',
			});

			if (response.ok) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	};


	const logoutAndRedirect = () => {
		setAuthStatus('logged_out');
		setUserRole(null);
		router.push('/login');
	};

	const logout = async () => {
		setIsLoggingOut(true);
		try {
			await fetch(`/api/logout`, {
				method: 'POST',
				credentials: 'include',
			});
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			logoutAndRedirect();
			setIsLoggingOut(false);
		}
	};


	useEffect(() => {
		checkLogin();
	}, [checkLogin]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (authStatus === 'admin' || authStatus === 'member') {
				checkLogin();
			} else if (authStatus !== 'loading') {
				logoutAndRedirect();
			}
		}, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, [authStatus, checkLogin]);


	return (
		<AuthContext.Provider value={{ authStatus, userRole, logout, setAuthStatus, setUserRole}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
