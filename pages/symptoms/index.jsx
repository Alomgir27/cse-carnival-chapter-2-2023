import React, { useState, useEffect, use } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import data from "../../constants/data";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../../components/DoctorCard";

import axios from "axios";

const Symptoms = () => {
  const [moreData, setMoreData] = useState([]);
  const [search, setSearch] = useState("");
  const sampleData = [
    {
      name: "Flu",
      symptoms: ["Fever", "Cough", "Sore Throat"],
      precautions: ["Stay hydrated", "Rest", "Take over-the-counter medication"],
      treatment: ["Antiviral drugs", "Pain relievers"],
      medicines: ["Tamiflu", "Tylenol"],
      doctor: ["doctorId1", "doctorId2"],
    },
    {
      name: "Common Cold",
      symptoms: ["Runny nose", "Sneezing", "Headache"],
      precautions: ["Stay warm", "Rest", "Stay hydrated"],
      treatment: ["Antihistamines", "Decongestants"],
      medicines: ["Zyrtec", "Sudafed"],
      doctor: ["doctorId2"],
    },
    {
      name: "COVID-19",
      symptoms: ["Fever", "Shortness of breath", "Loss of taste or smell"],
      precautions: ["Isolate", "Wear a mask", "Get tested"],
      treatment: ["Supportive care", "Hospitalization if severe"],
      medicines: ["Remdesivir", "Dexamethasone"],
      doctor: ["doctorId1", "doctorId3"],
    },
  ];

  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/diseases`).then((res) => {
        setMoreData(res.data.data);
        console.log(res);
      });
    }
    )();
  }
    , []);


  return (
    <div>
      <Navbar active={4} />
      <Sidebar services={data.services} selected={5} />

      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-[80%]'>
          <h1 className='text-4xl text-center mt-10 mb-6 font-semibold text-gray-700'>
            Symptoms Inquery
          </h1>

          <div className='flex items-center justify-center mt-4'>
            <div className='flex border border-gray-300 rounded-md w-[70%]'>
              <input
                type='text'
                placeholder='Search Disease by Symptoms'
                className='w-full px-4 py-2 rounded-l-md focus:outline-none'
                // value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          {/* <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8'>
            <div className='flex items-center justify-center text-center'>
              <h1 className='text-2xl font-semibold text-gray-700'>
                No Disease Found
              </h1>
            </div>
          </div> */}

          {/* <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-8'>
            {sampleData.map((item) => (
              <div className='flex flex-col gap-3 p-3 px-5 bg-red-200 rounded-md' key={item.name}>
                <div className='text-2xl font-semibold text-gray-700'>
                  {item.name}
                </div> */}
          {/* <div className='flex gap-2'>
                  <div className='text-l font-semibold text-gray-700'>
                    Precautions:
                  </div>
                  <div className='text-l font-semibold text-gray-700'>
                    {item.precautions.map((precaution, index) => (
                      <div key={index}>{precaution}</div>
                    ))}
                  </div>
                </div> */}
          {/* <div className='flex gap-2'>
                  <div className='text-l font-semibold text-gray-700'>
                    Doctors:
                  </div>
                  <div className='text-l font-semibold text-gray-700'>
                    {item.doctor.map((doctor, index) => (
                      <div key={index}>{doctor}</div>
                    ))}
                  </div>
                </div> */}
          {/* </div>
            ))}
          </div> */}
          {search === "" && (
            <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-8'>
              {moreData.map((item) => (
                <div className='flex flex-col gap-3 p-3 px-5 bg-red-200 rounded-md' key={item._id}>
                  <div className='text-2xl font-semibold text-gray-700'>
                    {item.name}
                  </div>
                  <div className='text-l font-semibold text-gray-700'>
                    <p className='text-l font-semibold text-gray-700'>
                      Experts: {item.symptoms[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {search !== "" && (
            <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-5 mt-8'>
              {moreData.filter((item) => item.symptoms[0].toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())).map((item) => (
                <div className='flex flex-col gap-3 p-3 px-5 bg-red-200 rounded-md' key={item._id}>
                  <div className='text-2xl font-semibold text-gray-700'>
                    {item.name}
                  </div>
                  <div className='text-l font-semibold text-gray-700'>
                    <p className='text-l font-semibold text-gray-700'>
                      Experts: {item.symptoms[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}



        </div>

      </div>
    </div >
  );
};


export default Symptoms;
