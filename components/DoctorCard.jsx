import Link from "next/link";

const DoctorCard = ({ doctorInfo }) => {
  return (
    <Link href='#'>
      <div
        className='grid grid-cols-5 rounded-2xl min-h-[25vh] overflow-hidden'
        style={{ backgroundColor: " rgba(255, 74, 74,0.2)" }}
      >
        <div className='col-span-2 flex flex-col justify-center'>
          <img
            className='p-4 rounded-full'
            src='https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg'
            alt=''
          />
        </div>
        <div className='p-2 col-span-3 flex flex-col gap-1 justify-center'>
          <div>
            <h3 className='font-bold text-xl'>{doctorInfo.name}</h3>
            <p>{doctorInfo.specializations}</p>
            <p>Rating : {doctorInfo.rating}</p>
            <p>Fee: {doctorInfo.newPatientFee}BDT</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
