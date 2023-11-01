import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { ThumbDown } from "@mui/icons-material";

const dummyBlogData = {
  user: "John Doe",
  title: "The Importance of Regular Exercise",
  content: `In today's fast-paced world, where demands often leave little room for self-care, the significance of regular exercise cannot be overstated. Physical activity is not merely a means to sculpt a desirable physique but a fundamental pillar of overall well-being and health maintenance.

    Regular exercise plays a pivotal role in enhancing cardiovascular health, bolstering the immune system, and improving overall mental well-being. By engaging in activities that elevate the heart rate and stimulate the muscles, individuals can effectively mitigate the risk of chronic illnesses such as cardiovascular disease, diabetes, and obesity. Additionally, the endorphins released during exercise act as natural mood enhancers, fostering a sense of well-being and alleviating stress and anxiety.
    
    Moreover, the benefits of regular exercise extend beyond the physical realm. By establishing a consistent workout routine, individuals can cultivate discipline and resilience, fostering a sense of achievement and self-confidence. This, in turn, can positively influence other aspects of life, including professional endeavors and personal relationships.
    
    Furthermore, regular physical activity is instrumental in maintaining healthy body weight and preserving muscle mass, thereby promoting longevity and enhancing quality of life. Through the stimulation of various physiological processes, exercise aids in the regulation of metabolism and the efficient utilization of energy, contributing to a balanced and sustainable lifestyle.
    
    In the face of sedentary lifestyles perpetuated by modern conveniences and technological advancements, it is imperative to recognize the profound impact of incorporating regular exercise into daily routines. Whether through cardiovascular activities, strength training, or flexibility exercises, individuals can harness the transformative power of physical activity to fortify the body, invigorate the mind, and foster a holistic sense of well-being.
    
    By prioritizing regular exercise as an integral component of daily life, individuals can unlock a plethora of benefits that transcend the realms of physical health, nurturing a harmonious synergy between body, mind, and spirit. Embracing the importance of regular exercise is not merely an investment in physical fitness but a commitment to cultivating a vibrant and robust lifestyle that embodies vitality and longevity.`,
  tags: ["health", "exercise", "wellness"],
  likes: [1, 2, 3],
  dislikes: [4, 5],
  reviews: [1, 2, 3, 4, 5],
};

const Blog = () => {
  const { user, title, content, tags, likes, dislikes, reviews } =
    dummyBlogData;

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl font-bold mt-8 text-center'>{title}</h1>
          <p className='text-gray-600 my-2 text-center'>By {user}</p>
          {/* <div className='my-2 text-center'>
            <span>{likes.length}</span> <ThumbUpIcon />
            <span>{dislikes.length}</span> <ThumbDown />
          </div> */}

          <div className='my-2 w-[80%] mx-auto'>
            <p>{content}</p>
          </div>
          <div className='my-2'>
            Tags: {tags.map((tag, index) => (index ? ", " : "") + tag)}
          </div>

          <hr className='my-4' />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
