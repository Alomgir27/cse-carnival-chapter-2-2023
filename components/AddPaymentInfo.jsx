import { useState } from "react";

const AddPaymentInfo = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentInfo = {
      cardNumber,
      expirationDate,
      cvv,
      cardHolder,
    };
    console.log(paymentInfo);
  };

  return (
    <div className='w-full max-w-lg mx-auto p-8'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-lg font-medium mb-6'>Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-2 sm:col-span-1'>
              <label
                for='card-number'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Card Number
              </label>
              <input
                type='number'
                name='card-number'
                id='card-number'
                placeholder='0000 0000 0000 0000'
                className='w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500'
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label
                for='expiration-date'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Expiration Date
              </label>
              <input
                type='date'
                name='expiration-date'
                id='expiration-date'
                placeholder='MM / YY'
                className='w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500'
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label
                for='cvv'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                CVV
              </label>
              <input
                type='number'
                name='cvv'
                id='cvv'
                placeholder='000'
                className='w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500'
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <label
                for='card-holder'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Card Holder
              </label>
              <input
                type='text'
                name='card-holder'
                id='card-holder'
                placeholder='Full Name'
                className='w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500'
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-8'>
            <button
              type='submit'
              className='w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg focus:outline-none'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentInfo;
