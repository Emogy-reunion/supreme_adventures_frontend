import Head from 'next/head';
import "@/styles/globals.css";


function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      			</Head>

			<div className='wrapper'>
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default App;
