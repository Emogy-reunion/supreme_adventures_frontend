'use client';
import React from 'react'
import Footer from '../components/footer';
import UpdatePasswordForm from '../components/updatepasswordform';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


const UpdatePassword = () => {

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

        return (
                        <>
                                <UpdatePasswordForm token={token} />
                                <Footer />
                        </>
        );
};

export default UpdatePassword;
