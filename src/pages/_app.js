import Head from 'next/head';
import "@/styles/globals.css";
import { AuthProvider } from '../context/AuthContext';


function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      			</Head>

			<AuthProvider>
				<div className='wrapper'>
					<Component {...pageProps} />
				</div>
			</AuthProvider>
		</>
	);
}

export default App;
