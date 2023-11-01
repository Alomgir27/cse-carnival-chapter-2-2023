import Articles from "../components/Articles";
import Footer from "../components/Footer";
//@ts-ignore
//@ts-nocheck
import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import data from "../constants/data";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({ type: "SET_USERS", payload: data.data });
        }
        )();
    }, []);



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
