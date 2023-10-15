import Image from "next/image";

const ChatCard = ({ charInfo }) => {
    return (
        <div className="grid grid-cols-5 bg-gray-300 m-2 mt-0 rounded-xl overflow-hidden">
            <div className="col-span-1 h-[30px] w-[30px] rounded-full mx-3 my-2">
                <Image src={charInfo?.imgUrl && ""} alt="Health is Wealth" />
            </div>
            <div className="col-span-4">
                <h2 className="font-bold text-lg">{charInfo?.name}</h2>
                <p className="text-sm">{charInfo?.lastMessage}</p>
            </div>
        </div>
    )
}

export default ChatCard;