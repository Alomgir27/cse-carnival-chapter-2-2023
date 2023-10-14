import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import data from "../constants/data";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";

const findDoctor = () => {
  return (
    <div>
      <Navbar active={2} />
      <Sidebar services={data.services} selected={1} />

      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-[80%]'>
          <h1 className='text-4xl text-center mt-10 mb-6 font-bold'>
            Find a Doctor
          </h1>

          <div className='flex items-center justify-center mt-4'>
            <div className='flex border border-gray-300 rounded-md w-[70%]'>
              <input
                type='text'
                placeholder='Search by Disease, Name, Hospital, Degree, etc.s'
                className='w-full px-4 py-2 rounded-l-md focus:outline-none '
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8'>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default findDoctor;
