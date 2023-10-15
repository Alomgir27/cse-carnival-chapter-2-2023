import images from "./images";
const data = {
  services: [
    {
      id: 1,
      picture: images.searchDoctor,
      title: "Search Doctor",
      description:
        "Choose your doctor from thousands of specialist, general, and trusted hospitals",
      url: "finddoctor",
    },
    {
      id: 2,
      picture: images.consultation,
      title: "Consultation",
      description:
        "Free consultation with our trusted doctors and get the best recomendations",
      url: "consultant",
    },
    {
      id: 3,
      picture: images.emergancyCare,
      title: "Emergancy Care",
      description:
        "You can get 24/7 urgent care for yourself or your children and your lovely family",
    },
    {
      id: 4,
      picture: images.detailsInfo,
      title: "Medical History",
      description: "Keep track of your complete medical history in one place.",
    },
    {
      id: 5,
      picture: images.query,
      title: "Syndrome Inquiry",
      description:
        "Have questions or concerns about a particular medical syndrome?",
      url: "symptoms",
    },
    {
      id: 6,
      picture: images.personalConsultant,
      title: "Hire Personal Consultant",
      description:
        "Access personalized support and guidance with our dedicated personal consultant service.",
    },
  ],
  articles: [
    {
      id: 1,
      picture: images.article1,
      title: "Disease detection, check  up in the laboratory",
      description:
        "In this case, the role of the health laboratory is very important to do a disease detection...",
    },
    {
      id: 2,
      picture: images.article2,
      title: "Herbal medicines that are safe for consumption",
      description:
        "Herbal medicine is very widely used at this time because of its very good for your health...",
    },
    {
      id: 3,
      picture: images.article3,
      title: "Natural care for healthy facial skin",
      description:
        "A healthy lifestyle should start from now and also for your skin health. There are some...",
    },
  ],
  testimonial: {
    id: 1,
    userImage: images.testinomialAvatar,
    userName: "Edward Newgate",
    userSubHeading: "Founder Circle",
    reviewText:
      "Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely",
  },
};
export default data;
