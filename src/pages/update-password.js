'use client';
import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


const UpdatePassword = () => {
	const [token, setToken] = useState(null);
	const [hasMounted, setHasMounted] = useState(false);
	const searchParams = useSearchParams();

	useEffect(() => {
    		// Only run this client-side
    		setToken(searchParams.get('token'));
    		setHasMounted(true);
	}, [searchParams]);
	if (!hasMounted) return null; // Prevent render until client-side mount

        return (
                        <>
                                <UpdatePasswordForm token={token} />
                                <Footer />
                        </>
        );
};

export default UpdatePassword;
