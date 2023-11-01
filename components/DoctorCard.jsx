import Link from "next/link";
import Image from "next/image";

const DoctorCard = ({ item }) => {
  console.log("../server/" + item.imageUri)
  return (
    <Link href={`/finddoctor/${item._id}`} key={item._id} className="cursor-pointer w-full h-full flex flex-col justify-center">
      <div
        className='grid grid-cols-5 rounded-2xl min-h-[25vh] overflow-hidden'
        style={{ backgroundColor: " rgba(255, 74, 74,0.2)" }}
      >
        <div className='col-span-2 flex flex-col justify-center'>
          <Image
            className='flex-shrink-0 rounded-full p-2'
            src={'https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg'}
            alt='nothing'
            width={200}
            height={200}
          />
        </div>
        <div className='p-2 col-span-3 flex flex-col gap-1 justify-center'>
          <div>
            <h3 className='font-bold text-xl'>{item?.username}</h3>
            {item.profile?.doctor?.specializations && (
              item.profile?.doctor?.specializations.map((specialization, index) => (
                <p className='text-sm text-gray-700 border-b-2 pb-1' key={index}>
                  {specialization}
                </p>
              ))
            )}
            <p>Rating : {Math.floor(Math.random() * 5) + 1}</p>
            <p className='text-sm'>Appointment Fee : ₹{item.profile?.doctor?.newPatientFee}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
