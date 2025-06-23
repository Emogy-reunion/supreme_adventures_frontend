import React from 'react';
import NavBar from '../components/membernavbar';
import MemberContactSection from '../components/membercontact.jsx';
import withAuth from '../hoc/withAuth';

const MemberContactPage = () => {
        return (
                <>
                        <MemberNavBar />
                        <MemberContactSection />
                </>
        );
};

export default withAuth(MemberContactPage);
