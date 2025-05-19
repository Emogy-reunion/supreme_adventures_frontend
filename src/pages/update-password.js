'use client';
import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


const UpdatePassword = () => {
	const [token, setToken] = useState<string | null>(null);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
    		// Only run this client-side
    		setToken(searchParams.get('token'));
    		setHasMounted(true);
	}, [searchParams]);

        return (
                        <>
                                <UpdatePasswordForm token={token} />
                                <Footer />
                        </>
        );
};

export default UpdatePassword;
