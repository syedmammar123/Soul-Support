import { useState } from "react";

const Faq = ({ faqData }) => {
  const [active, setActive] = useState(-1);
  const handleClick = (index) => {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <div className="flex justify-center m-4">FREQUENTLY ASKED QUESTIONS</div>

      <div className="m-4 p-4 bg-gray-100 rounded-lg">
        {faqData.map((item, index) => (
          <div className="py-2" key={index}>
            <button
              className="flex justify-between items-center max-sm:gap-5 w-full"
              onClick={() => handleClick(index)}
            >
              <span className="text-start max-sm:text-sm">{item.question}</span>
              {active !== index ? <span>+</span> : <span>-</span>}
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-400 text-sm ${
                active === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
