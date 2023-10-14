import React from "react";

const WriteBlog = () => {
  return (
    <div className='max-w-2xl mx-auto p-4'>
      <form action='/submit-post' method='POST'>
        <div className='mb-6'>
          <label
            for='title'
            className='block text-lg font-medium text-gray-800 mb-1'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
            required
          />
        </div>

        <div className='mb-6'>
          <label
            for='content'
            className='block text-lg font-medium text-gray-800 mb-1'
          >
            Content
          </label>
          <textarea
            id='content'
            name='content'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500'
            rows='6'
            required
          ></textarea>
        </div>

        <div className='mb-6'>
          <label
            for='image'
            className='block text-lg font-medium text-gray-800 mb-1'
          >
            Image
          </label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            className='w-full'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
