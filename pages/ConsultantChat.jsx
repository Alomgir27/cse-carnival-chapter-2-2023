import ChatCard from "../components/ChatCard";
import Navbar from "../components/Navbar";

import SendIcon from "@mui/icons-material/Send";

const sample = {
    imgUrl: "none",
    name: "Dr. John Doe",
    lastMessage: "Hello"
};


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

const ConsultantChat = () => {
    return (<div>
        <Navbar />
        <div className="grid grid-cols-5 h-[85vh]  border-2 border">
            <div className="col-span-1 py-4">
                {/* Chats */}
                <ChatCard charInfo={sample} />
                <ChatCard charInfo={sample} />
                <ChatCard charInfo={sample} />
                <ChatCard charInfo={sample} />
            </div>
            <div className="col-span-4 w-full p-4">
                <div className="flex flex-col w-full p-6 h-[72vh] overflow-y-scroll ">
                    <OtherMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <OtherMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <MyMessage message="Hello" createdAt="12:00" />
                    <OtherMessage message="Hello" createdAt="12:00" />
                </div>
                <div className="w-full  flex justify-between items-center px-4 py-1">
                    <input type="text" placeholder="Type a message" className="w-[95%] px-5 p-2 text-gray-800" />
                    <SendIcon />
                </div>
            </div>
        </div>
    </div>
    )
}

export default ConsultantChat;