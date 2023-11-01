import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Articles from "../components/Articles";
import data from "../constants/data";
import axios from "axios";
import { useEffect, useState } from "react";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/healthblogs`).then((res) => {
        setBlogs(res.data.data);
        console.log(res);
      });
    }
    )();
  }
    , []);

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-[#FF4A4A] my-4'>Blog</h1>
        <div>
          <Articles articles={data.articles} blogs={blogs} />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
