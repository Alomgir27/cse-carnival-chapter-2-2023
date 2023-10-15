import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Articles from "../components/Articles";
import data from "../constants/data";

const blogs = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-[#FF4A4A] my-4'>Blog</h1>
        <div>
          <Articles articles={data.articles} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default blogs;
