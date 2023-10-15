import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./../../../components/Navbar";
import Sidebar from "./../../../components/Sidebar";
import Footer from "./../../../components/Footer";
import Button from "./../../../components/Button";
import axios from "axios";
import moment from "moment";

import data from "../../../constants/data";
import Image from "next/image";
import ReviewCard from "../../../components/ReviewCard";

export default function DoctorDetails() {
    const router = useRouter();
    const { doctor_id } = router.query;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDoctor = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${doctor_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setDoctor(res.data.data);
                console.log(res.data.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (doctor_id) {
            getDoctor();
        }
    }, [doctor_id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }






    // const user = {
    //     name: "Nisha",
    //     username: "nisha",
    //     specializations: "Cardiologist",
    //     rating: "4.5",
    //     newPatientFee: "500",
    //     followUpFee: "300",
    //     availability: {
    //         day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    //         time: {
    //             start: "10:00 AM",
    //             end: "02:00 PM",
    //         },
    //     },
    // };

    return (
        <div>
            <Navbar />
            <Sidebar services={data.services} />
            <div className='w-full flex flex-col items-center justify-center mt-10 mb-10'>
                <h1 className='text-4xl text-center mb-6 font-bold'>
                    Doctor's Information
                </h1>
                <div className='w-[70%]  grid grid-cols-2 border-2 border-red-500 rounded-2xl overflow-hidden'>
                    <div className='  flex flex-col justify-center items-center border-r-red-500 border-r-2'>
                        <div className='flex justify-center items-center'>
                            <img
                                className='p-4 rounded-full h-[50vh]'
                                src='https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg'
                                alt='Profile Picture'
                            />
                        </div>
                        <div>
                            <div className='p-4 text-center'>
                                <h3 className='font-bold text-3xl'>{doctor?.username}</h3>
                                {doctor?.profile?.doctor?.specializations && (
                                    doctor?.profile?.doctor?.specializations.map((specialization, index) => (
                                        <p className='text-xl' key={index}>
                                            {specialization}
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>

                        <button className='bg-red-500 py-2 px-5 mt-2 font-bold rounded-full text-white'>
                            Request appointment
                        </button>
                    </div>

                    <div
                        className='  p-6 flex flex-col justify-start gap-3'
                        style={{ backgroundColor: " rgba(255, 74, 74, 0.5)" }}
                    >
                        <h2 className="text-xl">
                            <span className="min-w-[150px] inline-block">Verified</span>:{" "}
                            <span
                                style={{
                                    color: doctor?.isVarified ? "green" : "red",
                                    fontWeight: "bold",
                                }}
                            >
                                {doctor?.isVarified ? "Yes" : "No"}
                            </span>
                        </h2>
                        <h2 className='text-xl'>
                            <span className='min-w-[150px] inline-block'>Rating</span>:{" "}
                            {doctor?.profile?.doctor?.rating ? doctor?.profile?.doctor?.rating : "Not set"}
                        </h2>
                        <h2 className='text-xl'>
                            <span className='min-w-[150px] inline-block'> Fee </span>:{" "}
                            <strong>{doctor?.profile?.doctor?.newPatientFee ? "৳" + doctor?.profile?.doctor?.newPatientFee : "Not set"}</strong>
                        </h2>
                        <h2 className='text-xl'>
                            <span className='min-w-[150px] inline-block'>Follow up fee</span>:{" "}
                            <strong>{doctor?.profile?.doctor?.followUpFee ? "৳" + doctor?.profile?.doctor?.followUpFee : "Not set"}</strong>
                        </h2>
                        <h2 className='text-2xl text-center'>Availability </h2>

                        <ul
                            style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
                            className='rounded-xl p-2 text-center'
                        >
                            {doctor?.profile?.doctor?.availability?.day?.map((item) => (
                                <li key={item}>
                                    <span className='min-w-[150px] inline-block'>{item}</span>
                                    <span>
                                        {moment(doctor?.profile?.doctor?.availability?.time?.start).format("hh:mm A")} -{" "}
                                        {moment(doctor?.profile?.doctor?.availability?.time?.end).format("hh:mm A")}
                                    </span>

                                </li>
                            ))}

                        </ul>

                        <h1 className='text-2xl text-center'>Reviews</h1>
                        <div>
                            {doctor?.profile?.doctor?.reviews?.map((review) => (
                                <ReviewCard
                                    data={{
                                        username: review?.user?.username,
                                        review: review?.review,
                                        rating: review?.rating,
                                        createdAt: review?.createdAt,
                                    }}
                                />
                            ))}
                            <ReviewCard
                                data={{
                                    username: "Neel",
                                    review:
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
                                    rating: "4.5",
                                    createdAt: "12/12/2021",
                                }}
                            />
                            <ReviewCard
                                data={{
                                    username: "Neel",
                                    review:
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
                                    rating: "4.5",
                                    createdAt: "12/12/2021",
                                }}
                            />
                            <ReviewCard
                                data={{
                                    username: "Neel",
                                    review:
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
                                    rating: "4.5",
                                    createdAt: "12/12/2021",
                                }}
                            />
                            <div className='text-center'>
                                <button className='bg-red-500 py-2 px-5 mt-2 font-bold rounded-full text-white'>
                                    Show more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

