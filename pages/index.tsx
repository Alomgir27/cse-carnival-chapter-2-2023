import Articles from "../components/Articles";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import data from "../constants/data";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>HealthCare - You health Partner</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/public/favicon.ico' />
      </Head>
      <Navbar active={0} />
      <div className='grid grid-cols-15 '>
        <div className='col-span-1'>
          <Sidebar services={data.services} />
        </div>
        <div className='col-span-14'>
          <Hero />

          <Services services={data.services} />

          <Articles articles={data.articles} />

          <Footer />
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
