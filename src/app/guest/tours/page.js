import { cookies } from 'next/headers';
import GuestToursComponent from '@/app/guest/tours/guestToursComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  GuestToursPage = async ({ searchParams }) => {
	
        try {

                const response = await fetch(`${BACKEND_URL}/api/tours`, {
                        method: 'GET',
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch tours. Refresh page and try again!');
                }

                const data = await response.json();

                return <GuestToursComponent data=data />;
        } catch(error) {
        }
};


export default GuestToursPage;
