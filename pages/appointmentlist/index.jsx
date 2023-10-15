import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import data from "../../constants/data";

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import moment from "moment";

import axios from "axios";

// const appointments = [
//   {
//     appointmentId: 1, // Unique identifier
//     user: 'userId1', // Replace with actual user ID
//     doctor: 'doctorId1', // Replace with actual doctor ID
//     appointmentDate: new Date('2023-10-25 14:30:00'),
//     serialNumber: 12345,
//     appointmentType: 'newPatient',
//     status: 'confirmed',
//     payment: {
//       amount: 50,
//       paymentMethod: 'creditCard',
//       paymentDate: new Date('2023-10-25 14:30:00'),
//     },
//     emergency: false,
//     reasonOfEmergency: 'others',
//     feeForEmergency: 0,
//   },
//   {
//     appointmentId: 2, // Unique identifier
//     user: 'userId2', // Replace with actual user ID
//     doctor: 'doctorId2', // Replace with actual doctor ID
//     appointmentDate: new Date('2023-10-26 10:00:00'),
//     serialNumber: 67890,
//     appointmentType: 'followUp',
//     status: 'completed',
//     payment: {
//       amount: 70,
//       paymentMethod: 'paypal',
//       paymentDate: new Date('2023-10-26 10:00:00'),
//     },
//     emergency: false,
//     reasonOfEmergency: 'others',
//     feeForEmergency: 0,
//   },
//   {
//     appointmentId: 3, // Unique identifier
//     user: 'userId3', // Replace with actual user ID
//     doctor: 'doctorId3', // Replace with actual doctor ID
//     appointmentDate: new Date('2023-10-27 15:45:00'),
//     serialNumber: 24680,
//     appointmentType: 'newPatient',
//     status: 'cancelled',
//     payment: {
//       amount: 60,
//       paymentMethod: 'cash',
//       paymentDate: new Date('2023-10-27 15:45:00'),
//     },
//     emergency: false,
//     reasonOfEmergency: 'others',
//     feeForEmergency: 0,
//   },
//   {
//     appointmentId: 4, // Unique identifier
//     user: 'userId4', // Replace with actual user ID
//     doctor: 'doctorId4', // Replace with actual doctor ID
//     appointmentDate: new Date('2023-10-28 11:15:00'),
//     serialNumber: 13579,
//     appointmentType: 'followUp',
//     status: 'pending',
//     payment: {
//       amount: 55,
//       paymentMethod: 'creditCard',
//       paymentDate: new Date('2023-10-28 11:15:00'),
//     },
//     emergency: false,
//     reasonOfEmergency: 'others',
//     feeForEmergency: 0,
//   },
// ];

import { useRouter } from "next/router";

const AppointmentList = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState('');
  const [triggerFunction, setTriggerFunction] = useState(null);
  const [ignores, setIgnores] = useState([]);
  const [confirms, setConfirms] = useState([]);
  const [selectId, setSelectId] = useState(null);

  useEffect(() => {
    const ignores = JSON.parse(localStorage.getItem("ignores"));
    if (ignores) {
      setIgnores(ignores);
    }
  }, []);

  useEffect(() => {
    const confirms = JSON.parse(localStorage.getItem("confirms"));
    if (confirms) {
      setConfirms(confirms);
    }
  }, []);

  const confirnToDb = () => {
    console.log("confirm in db");
  }

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res.data.data);
      setAppointments(res.data.data);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("ignores", JSON.stringify(ignores));
  }, [ignores]);

  useEffect(() => {
    localStorage.setItem("confirms", JSON.stringify(confirms));
  }, [confirms]);


  const confirmAppointment = (appointment) => {
    setTriggerFunction(confirnToDb);
    handleClickOpen();
  };

  const cancelAppointment = (appointment) => {
    handleClickOpen1("cancel");
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (command) => {
    setOpen(true);
  };

  const handleClose = (response) => {
    setOpen(false);

    if (response === "Yes") {
      confirnToDb();
      console.log("confirm in db", response, selectId);
      setConfirms([...confirms, selectId]);
    }
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = (command) => {
    setOpen1(true);
  }

  const handleClose1 = (response) => {
    setOpen1(false);

    if (response === "Yes") {
      console.log("cancel in db", response);
      console.log("cancel in db", selectId);
      setIgnores([...ignores, selectId]);

    }
  }








  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure? Do you want to confirm this appointment?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleClose("Yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title1"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title1">
          {"Do you want to cancel this appointment?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose1}>No</Button>
          <Button onClick={() => handleClose1("Yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Navbar active={4} />
      <Sidebar selected={5} services={data.services} />

      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-[80%]'>
          <h1 className='text-4xl text-center mt-10 mb-6 font-semibold text-gray-700'>
            Appointment List
          </h1>

          {/* <div className='flex items-center justify-center mt-4'>
            <div className='flex border border-gray-300 rounded-md w-[70%]'>
              <input
                type='text'
                placeholder='Search Disease by Symptoms'
                className='w-full px-4 py-2 rounded-l-md focus:outline-none'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </div>
          </div> */}
        </div>
      </div>

      <table className="border-collapse w-[80%] mx-auto text-center">
        <thead>
          <tr>
            <th className="border border-gray-700 py-2">Appointment Date</th>
            <th className="border border-gray-700 py-2">Serial Number</th>
            <th className="border border-gray-700 py-2">Payment</th>
            <th className="border border-gray-700 py-2">Status</th>
            <th className="border border-gray-700 py-2">Action</th>
            <th className="border border-gray-700 py-2">Meeting Link</th>

          </tr>
        </thead>
        <tbody>
          {appointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)).filter((appointment) => !ignores.includes(appointment._id)).map((appointment) => (
            <tr key={appointment.appointmentId}>
              {/* <td className="border border-gray-700 py-1">{appointment.user}</td> */}

              <td className="border border-gray-700 py-1">
                {moment(appointment.appointmentDate).format("DD/MM/YYYY")}
              </td>
              <td className="border border-gray-700 py-1">{appointment.serialNumber}</td>
              <td className="border border-gray-700 py-1">${appointment.payment.amount}</td>
              <td className="border border-gray-700 py-1">{confirms.includes(appointment._id) ? "confirmed" : appointment.status}</td>
              <td className="border border-gray-700 py-1">
                {appointment.status === 'pending' && !confirms.includes(appointment._id) && (
                  (<div className="flex justify-evenly">
                    <button
                      onClick={() => {
                        setSelectId(appointment._id);
                        confirmAppointment(appointment);
                      }
                      }
                      className="bg-green-500 hover:text-black text-white px-3 py-1 rounded-full"
                    >
                      <CheckIcon />
                    </button>
                    {/* <div className="divide-y divide-gray-700"></div> */}
                    <button
                      onClick={() => {
                        setSelectId(appointment._id);
                        cancelAppointment(appointment);
                      }}
                      className="bg-red-500 hover:text-black text-white px-3 py-1 rounded-full"
                    >

                      <ClearIcon />
                    </button>
                  </div>
                  )
                )}
              </td>

              <td className="border border-gray-700 py-1">
                {confirms.includes(appointment._id) && (
                  <a href={appointment.meetingLink} target="_blank" className="bg-blue-500 hover:text-black text-white px-3 py-1 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => router.push(`meeting/${appointment._id}`)}>
                    Join
                  </a>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
