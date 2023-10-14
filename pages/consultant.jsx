import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import data from "../constants/data";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorCard from "../components/DoctorCard";

const consultant = () => {
  return (
    <div>
      <Navbar active={1} />
      <Sidebar services={data.services} selected={1} />

      <div className='h-[85vh]'>
        <div>
          {/* message */}
          hello
        </div>

        <div>
          {/* input */}
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
      </div>
    </div>
  );
};

export default consultant;
