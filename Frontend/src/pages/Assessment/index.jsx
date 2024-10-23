import { useEffect } from "react";
import Faq from "../../components/FAQs";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Test from "../../components/Navbar";
import { faqData, images } from "../../utils/faqData";
import useAssessment from "../../hooks/useAssessment";

const Assessments = () => {
  const navigate = useNavigate();
  const { loading, fetchCategories, categories } = useAssessment();

  const SkeletonCard = () => (
    <div className="w-80 overflow-hidden rounded-2xl shadow-sm relative p-4 bg-gray-100">
      <div className="bg-gray-300 h-40 w-full mb-4 rounded animate-pulse"></div>
    </div>
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Test />
      <div className="p-4 flex flex-col items-center justify-center">
        <h1 className="text-6xl mt-10 text-center max-sm:text-3xl">
          Take a free mental health test
        </h1>
        <p className="text-center w-[42%] max-sm:w-full m-4">
          Our short online mental health screening tests will help you determine
          if you should seek help from a licensed mental health professional to
          address mental health issues.
        </p>
      </div>
      <div className="w-[90%] flex justify-between gap-5 m-auto my-4 max-lg:flex-col max-lg:items-center">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          categories.map((item, index) => (
            <div
              className="lg:max-w-xs max-lg:w-[90%] overflow-hidden rounded-2xl shadow-sm group relative cursor-pointer"
              key={index}
              onClick={() => navigate(`${item}`)}
            >
              <img
                className="transition-transform duration-500 transform group-hover:scale-110"
                src={images[index]}
                alt={item}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white group-hover:mb-4 transition-all duration-500 ease-linear">
                <p className="text-6xl max-sm:text-3xl">{item}</p>
                <button className="opacity-0 transition-opacity group-hover:opacity-100 font-bold">
                  Start Test {">"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Faq faqData={faqData} />
      <Footer />
    </div>
  );
};

export default Assessments;
