import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Button from "../components/Button";

import data from "../constants/data";
import Image from "next/image";
import ReviewCard from "../components/ReviewCard";

const profile = () => {
  const user = {
    name: "Nisha",
    username: "nisha",
    specializations: "Cardiologist",
    rating: "4.5",
    newPatientFee: "500",
    followUpFee: "300",
    availability: {
      day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      time: {
        start: "10:00 AM",
        end: "02:00 PM",
      },
    },
  };

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
                <h3 className='font-bold text-3xl'>{user.name}</h3>
                <p className='text-2xl'> {user.specializations}</p>
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
            <h2 className='text-xl'>
              <span className='min-w-[150px] inline-block'> Rating</span>:{" "}
              {user.rating}
            </h2>
            <h2 className='text-xl'>
              <span className='min-w-[150px] inline-block'> Fee </span>:{" "}
              <strong>৳{user.newPatientFee}</strong>
            </h2>
            <h2 className='text-xl'>
              <span className='min-w-[150px] inline-block'>Follow up fee</span>:{" "}
              <strong>৳{user.followUpFee}</strong>
            </h2>
            <h2 className='text-2xl text-center'>Availability </h2>

            <ul
              style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
              className='rounded-xl p-2 text-center'
            >
              {user.availability.day.map((item) => (
                <li key={item}>
                  <span className='min-w-[150px] inline-block'>{item}</span>
                  <span>
                    {user.availability.time.start} -{" "}
                    {user.availability.time.end}
                  </span>
                </li>
              ))}
            </ul>

            <h1 className='text-2xl text-center'>Reviews </h1>
            <div>
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
};

export default profile;
