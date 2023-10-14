import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blog = () => {
  return (
    <div>
      <Navbar />
      <div className='h-[85vh] flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-[#FF4A4A]'>Blog</h1>
      </div>
      <Footer />
    </div>
  );
};

export default blog;
