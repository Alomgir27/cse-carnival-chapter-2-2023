import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import data from "../../constants/data";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../../components/DoctorCard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const findDoctor = () => {
  const [search, setSearch] = useState("");
  const { users } = useSelector((state) => state.data);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (users.length === 0) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        console.log(data);
        dispatch({ type: "SET_USERS", payload: data.data });
      }
    }
    )();
  }
    , []);
  return (
    <div>
      <Navbar active={2} />
      <Sidebar services={data.services} selected={1} />

      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-[80%]'>
          <h1 className='text-4xl text-center mt-10 mb-6 font-semibold text-gray-700'>
            Find a Doctor
          </h1>

          <div className='flex items-center justify-center mt-4'>
            <div className='flex border border-gray-300 rounded-md w-[70%]'>
              <input
                type='text'
                placeholder='Search by Disease, Name, Hospital, Degree, etc.s'
                className='w-full px-4 py-2 rounded-l-md focus:outline-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8'>
            {users && users?.length > 0 && users.filter((user) => user.role === "doctor").length === 0 && (
              <div className='flex items-center justify-center'>
                <h1 className='text-2xl font-semibold text-gray-700'>
                  No Doctors Found
                </h1>
              </div>
            )
            }

            {users && users?.length > 0 && search == "" && users.filter((user) => user.role === "doctor").map((user) => (
              <DoctorCard
                item={user}
                key={user._id}
              />
            ))}

            {users && users?.length > 0 && search != "" && users.filter((user) => user.role === "doctor" && user.username.toLowerCase().includes(search.toLowerCase()) || user.profile?.doctor?.specializations?.some((specialization) => specialization.toLowerCase().includes(search.toLowerCase()))).map((user) => (
              <DoctorCard
                item={user}
                key={user._id}
              />
            ))}

            {/* <DoctorCard
              doctorInfo={{
                name: "Dr. John Doe",
                specializations: "Cardiologist",
                rating: "4.5",
                newPatientFee: "₹500",
              }}
            />
            <DoctorCard
              doctorInfo={{
                name: "Dr. John Doe",
                specializations: "Cardiologist",
                rating: "4.5",
                newPatientFee: "₹500",
              }}
            />
            <DoctorCard
              doctorInfo={{
                name: "Dr. John Doe",
                specializations: "Cardiologist",
                rating: "4.5",
                newPatientFee: "₹500",
              }}
            />
            <DoctorCard
              doctorInfo={{
                name: "Ikhtiyar Uddin Mohammad Bokhtiar Khilji",
                specializations: "Cardiologist",
                rating: "4.5",
                newPatientFee: "₹500",
              }}
            />
            <DoctorCard
              doctorInfo={{
                name: "Dr. John Doe",
                specializations: "Cardiologist",
                rating: "4.5",
                newPatientFee: "₹500",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default findDoctor;
