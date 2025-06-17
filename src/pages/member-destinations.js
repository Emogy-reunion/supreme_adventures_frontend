import React from 'react';
import NavBar from '../components/membernavbar';
import PackagesSwiper from '../components/localpackages';
import withAuth from '../hoc/withAuth';


const MemberDestinations = () => {
        return (
                <>
                        <MemberNavBar />
                        <PackagesSwiper />
                </>
        );
};


export default withAuth(MemberDestinations);
