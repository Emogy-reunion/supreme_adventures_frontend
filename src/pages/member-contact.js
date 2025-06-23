import React from 'react';
import NavBar from '../components/adminNavbar';
import MemberContactSection from '../components/membercontact.jsx';
import withAuth from '../hoc/withAuth';

const MemberContactPage = () => {
        return (
                <>
                        <AdminNavBar />
                        <MemberContactSection />
                </>
        );
};

export default withAuth(MemberContactPage);
