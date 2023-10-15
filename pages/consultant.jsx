import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import data from "../constants/data";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

const MyMessage = ({ message, createdAt }) => {
  return (
    <div className='flex justify-end'>
      <div
        className='bg-red-500 my-2 px-4 py-1 rounded-tl-2xl rounded-b-2xl'
        style={{ maxWidth: "40vh" }}
      >
        <p className='text-white text-lg'>{message}</p>
        <p className='text-gray-200 text-xs text-right px-2'>{createdAt}</p>
      </div>
    </div>
  );
};

const OtherMessage = ({ message, createdAt }) => {
  return (
    <div className='flex justify-start'>
      <div
        className='bg-gray-200 my-2 px-4 py-1 rounded-tr-2xl rounded-b-2xl'
        style={{ maxWidth: "40vh" }}
      >
        <p className='text-black text-lg'>{message}</p>
        <p className='text-gray-600 text-xs text-right px-2'>{createdAt}</p>
      </div>
    </div>
  );
};

const consultant = () => {
  const [message, setMessage] = useState("")
  return (
    <div>
      <Navbar active={1} />
      <Sidebar services={data.services} selected={2} />

      <div className='h-[85vh] flex flex-col items-center justify-center mt-10 mb-10 overflow-scroll scrollbar-hide'>
        <div className='w-[50%]'>
          <div className='h-[72vh] p-4 my-3 flex flex-col justify-end py-4 overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-100'>
            <MyMessage message={"hello"} createdAt={"11:00PM"} />

            <MyMessage
              message={
                "asdasdasdasdsa dsa das dsa sa sa sa dsakjd ask sak sakj ask sakj ask askd s dad dad sa sa asd sad"
              }
              createdAt={"11:00PM"}
            />
            <OtherMessage
              message={
                "asdasdasdasdsa dsa das dsa sa sa sa dsakjd ask sak sakj ask sakj ask askd s dad dad sa sa asd sad"
              }
              createdAt={"11:00PM"}
            />
            <OtherMessage message={"hello"} createdAt={"11:00PM"} />
            <MyMessage message={"hello"} createdAt={"11:00PM"} />
            <MyMessage message={"hello"} createdAt={"11:00PM"} />
            <OtherMessage message={"hello"} createdAt={"11:00PM"} />
          </div>

          <div className='h-[10vh] w-full'>
            {/* input */}
            <div className='flex border border-gray-300 rounded-md '>
              <input
                type='text'
                placeholder='Message'
                className='w-full px-4 py-2 rounded-l-md focus:outline-none '
              />
              <IconButton type='submit' aria-label='search'>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default consultant;