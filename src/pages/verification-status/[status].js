import React from 'react';
import VerificationStatus from '../../components/verificationstatus';
import Footer from '../../components/footer';
import { useRouter } from 'next/router';

const VerificationStatusPage = () => {
        const router = useRouter();
        const status = router.query.status;

        return (
                <>
                        <VerificationStatus status={status} />
                        <Footer />
                </>
        );
};

export default VerificationStatusPage;
