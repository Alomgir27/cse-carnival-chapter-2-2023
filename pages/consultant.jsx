import React, { useState, useEffect, useRef, use } from "react";
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

//Message routes
// router.get('/messages', messageController.getAllMessages);
// router.get('/messages/:id', messageController.getMessage);
// router.post('/messages', messageController.createMessage);
// router.put('/messages/:id', messageController.updateMessage);
// router.delete('/messages/:id', messageController.deleteMessage);

// const messageSchema = new mongoose.Schema({
//   messages: [{
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       message: String,
//       createdAt: Date,
//   }],
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   status: {
//       type: String,
//       enum: ['resolved', 'unresolved'],
//       default: 'unresolved',
//   },
// }, { timestamps: true });

const consultant = () => {
  const [message, setMessage] = useState("")
  const scrollRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({});
  const [userId, setUserId] = useState(null);

  const [openConsultant, setOpenConsultant] = useState(false);
  const [unresolvedConsultant, setUnresolvedConsultant] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user._id);
    }
  }, []);

  const { users } = useSelector((state) => state.data);

  const handleSendMessage = async () => {
    const newMessages = [...messages.messages, { user: userId, message, createdAt: new Date().toISOString() }];
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/messages/${messages._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: {
        messages: newMessages,
        creator: userId,
        status: "unresolved"
      }
    })
    console.log(res);
    setMessages({ creator: userId, messages: newMessages, status: "unresolved", _id: messages._id });
    setMessage("");
  }

  useEffect(() => {
    (async () => {
      if (userId) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messages/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(res.data.data);
        setUnresolvedConsultant(res.data.data);
        setMessages(res.data.data);
        setOpenConsultant(res?.data?.data?.status === "unresolved");
      }
    })();
  }, [userId]);



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

  const handleClickOpenConsultant = async () => {
    if (!userId) router.push("/signIn");
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: {
        creator: userId,
        messages: []
      }
    })
      .then((res) => {
        console.log(res.data.data);
        setMessages(res.data.data);
        setOpenConsultant(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div>
      <Navbar active={1} />
      <div className='flex flex-col items-center justify-center overflow-hidden h-[90vh]'>
        <Sidebar services={data.services} selected={2} />

        <div className='flex flex-col items-center justify-center mt-10 mb-10 w-full h-full overflow-hidden'>
          <div className='w-[50%] overflow-scroll scrollbar-hide scrollbar-thin  border-2 border-gray-300 rounded-xl bg-gray-100 elevation-2 overflow-x-hidden'>
            <div className='p-4 my-3 flex flex-col justify-end py-4 rounded-xl border-2 border-gray-300 bg-gray-100'>
              {messages?.messages?.map((message, index) => {
                if (message.user === userId) {
                  return <MyMessage message={message.message}
                    createdAt={new Date(message.createdAt).toLocaleTimeString()}
                    key={index} />
                } else {
                  return <OtherMessage message={message.message} createdAt={new Date(message.createdAt).toLocaleTimeString()}
                    key={index} />
                }
              }
              )}
              {console.log(messages, "test")}
              {messages?.messages?.length === 0 && (
                <div className='flex items-center justify-center'>
                  <h1 className='text-2xl font-semibold text-gray-700'>
                    What's kind of help do you need? Ask us anything.
                  </h1>
                </div>
              )}
              {/* <MyMessage message={"hello"} createdAt={"11:00PM"} />

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
              <OtherMessage message={"hello"} createdAt={"11:00PM"} /> */}
              <div ref={scrollRef} className="h-1 w-1"></div>
            </div>

            {openConsultant ? (
              <div className='h-[10vh] w-[100vh] fixed bottom-2 flex items-center justify-center'>
                {/* input */}
                <div className='flex border border-gray-300 rounded-md w-[70%]'>
                  <input
                    type='text'
                    placeholder='Message'
                    className='w-full px-4 py-2 rounded-l-md focus:outline-none'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }
                    }
                  />
                  <IconButton type='submit' aria-label='search' onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div
                className='h-[10vh] w-[100vh] fixed bottom-2 flex items-center justify-center'
                onClick={handleClickOpenConsultant}
              >
                <button className='bg-red-500 py-2 px-5 mt-2 font-bold rounded-full text-white'>
                  Contact Consultant Now
                </button>
              </div>
            )}
            {!openConsultant && (
              <p className='text-center text-gray-500 mb-10'>
                Remember, you have to pay ₹500 for contacting the consultant.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default consultant;