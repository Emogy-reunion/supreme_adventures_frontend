import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '../components/loading';


export default function withAdmin(WrappedComponent) {
        return function AuthenticatedComponent(props) {
                const { authStatus } = useAuth();
                const router = useRouter();

                useEffect(() => {
                        if (authStatus !== 'loading') {
                                if (authStatus === 'member') {
                                        router.replace('/member_dashboard');
                                } else if (authStatus === 'logged_out') {
                                        router.replace('/login');
                                }
                        }
                }, [authStatus]);

                if (authStatus === 'loading') {
                        return (
                                <Loading />
                        );
                }

                if (authStatus === 'logged_out' || authStatus === 'member') {
                        return null;
                }

                return <WrappedComponent {...props} />;
        };
}
