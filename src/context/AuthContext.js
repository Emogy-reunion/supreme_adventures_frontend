'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authStatus, setAuthStatus] = useState('loading');
	const [userRole, setUserRole] = useState(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();

	const publicPaths = [
		'/',
		'/about',
		'/contact',
		'/login',
		'/register',
		'/destinations',
		'/guest-tours',
		'/guest-products',
		'/_next',
		'/static',
	];

	const isPublicRoute = (path) => {
		return publicPaths.some(p => path === p || path.startsWith(p));
	};

	const redirectToLoginIfNeeded = (pathname) => {
		if (!isPublicRoute(pathname || router.pathname)) {
			router.push('/login');
		} else {
			setAuthStatus('logged_out');
			setUserRole(null);
		}
	};


	const checkLogin = async () => {
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
					const retryResponse = await fetch(`/api/is_logged_in`, {
						method: 'GET',
						credentials: 'include',
					});

					if (retryResponse.ok) {
						await handleAuthResponse(retryResponse);
					} else {
						redirectToLoginIfNeeded();
					}
				} else {
					redirectToLoginIfNeeded();
				}
			}
		} catch (error) {
			redirectToLoginIfNeeded();
		}
	};


	
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
		redirectToLoginIfNeeded();
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
	}, [router.pathname]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (authStatus === 'admin' || authStatus === 'member') {
				checkLogin();
			} else if (authStatus !== 'loading') {
				redirectToLoginIfNeeded(router.pathname);
			}
		}, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, [authStatus, router.pathname]);


	return (
		<AuthContext.Provider value={{ authStatus, userRole, logout, setAuthStatus, setUserRole}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
