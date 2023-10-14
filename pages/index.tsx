import Articles from "../components/Articles";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import data from "../constants/data";
import Head from "next/head";


export default function Home() {
	return (
		<div>
			<Head>
				<title>Trafalgar - You health Partner</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<link rel="shortcut icon" href="/public/favicon.ico" />
			</Head>
			<Navbar />
			<Hero />

            
			<Services services={data.services} />

            <Articles articles={data.articles} />
			
			<Footer />
		</div>
	);
}
export async function getStaticProps() {
	return {
		props: {}, // will be passed to the page component as props
	};
}