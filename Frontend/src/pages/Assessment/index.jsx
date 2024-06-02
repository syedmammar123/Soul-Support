import axios from 'axios'
import { useEffect, useState } from "react";
import Faq from '../../components/FAQs';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Test from '../../components/Test';

const Assessments = () => {
    const navigate = useNavigate();


  const faqData = [
    {
      question:"How do I know if I need a mental disorder test or mental health screening?",  
      answer:"Consider taking a test to assess your mental health if you’ve noticed changes in how you feel or in your ability to function for the last two weeks or more. If you’ve found yourself feeling extra tired, irritable, anxious, unfocused, or sad lately, and these symptoms are interfering with your ability to engage in your day-to-day life, these could be signs that you could benefit from mental health treatment."
    },
    {
      question:"How can I test my mental health condition?",
      answer:"Talkspace offers free mental health tests that only take a few minutes to complete. Talkspace's mental health tests will give you a better understanding of your symptoms, and cover a variety of different mental health conditions. Currently Talkspace provides mental health tests for depression and anxiety (generalized anxiety disorder) symptoms."
    
    },
    {
      question:"Can you get a mental health diagnosis and mental health treatment online?",
      answer:"Online mental health tests can give you a better understanding of your mental health symptoms, but these tests can’t provide you with a diagnosis. A licensed therapist can discuss your test results with you, gather additional information, and then formulate a mental health diagnosis to support your treatment goals."
    
    },
    {
      question:"How accurate is a psychological test online?",
      answer:"Online mental health tests, provide a snapshot of the severity of your symptoms at that particular point in time. For more information on the current state of your mental health, consider working with a licensed mental health professional. A therapist or psychologist can gather additional mental health assessment information and test your symptoms at regular intervals to determine a diagnosis and get a more accurate picture of your mental health."
    
    },
    {
      question:"Which mental health test should I take?",
      answer:"While mental health symptoms may look and feel different from person to person, consider the following information if you're unsure which online screening test to take.Our Anxiety test is for people feeling intense worry or apprehension about everyday life.Our Depression test is for people experiencing persistent and intense feelings of melancholy or hopelessness. Our PTSD test is for people that develop symptoms after experiencing a life-threatening event or prolonged exposure to a highly stressful situation."
    
    },
    {
      question:"What should I do if I'm struggling with mental health concerns?",
      answer:"If you or someone you know is struggling with mental health symptoms, taking our clinically-backed assessments acts as a great first step to gaining clarity and finding further mental health treatment options. If you're interested in online treatment, Talkspace therapists are here to listen and help you develop strategies for better mental health, while our psychiatric providers prescribe the right medication.  To get started with online therapy, chat with a consultation therapist and answer a few questions. We'll then match you with a provider to help you begin the journey towards a happier and healthier you. For online psychiatry and medication management, schedule a video appointment with a psychiatric mental health provider, receive a diagnosis and prescription (if appropriate), and begin your treatment plan. As you explore your options, know that Talkspace is committed to making mental health care more accessible than ever before. We work directly with insurance providers, employee assistance programs (EAP), and educational organizations to make mental health treatment affordable. Confirm your eligibility & get started today. Learn more about online therapy and psychiatry plans that take insurance."
    
    },
  ]

  const [categories,setCategories] = useState([])
  
  var images = [
    "https://assets-global.website-files.com/5deaa99ba6578d2abda03191/5fda7a54b3809c4a27da4df7_bipolar_thumb.png",
    "https://assets-global.website-files.com/5deaa99ba6578d2abda03191/5fe0e9fe66497708a0f0a154_social-anxiety.png",
    "https://assets-global.website-files.com/5deaa99ba6578d2abda03191/5fda7a7f416c6f77530c4bc0_ptsd_thumb.png"

  ]

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/quiz/');
      setCategories(response.data.data)       
    } catch (error) {
      console.error(error);
      alert("Error !")
    }
  };
  
  useEffect(()=>{
    fetchCategories()
  },[])

  return (
  <div>  
    <Test/>
    <div className="p-4 flex flex-col items-center justify-center ">
      <h1 className="text-6xl m-10">Take a free mental health test</h1>
     
        <p className="text-center w-[42%] m-4">Our short online mental health screening tests will help you determine if you should seek help from a licensed mental health professional to address mental health issues.
        </p>
    </div>
    
    
    <div className="w-[90%] flex justify-between m-auto my-4 px-4"
   
    >
      {categories.map((item,index)=>(
        <div className="max-w-xs overflow-hidden rounded-2xl shadow-sm group relative cursor-pointer" key={index}
        onClick={()=>navigate(`${item}`)}
        >
          <img 
            className="transition-transform duration-500 transform group-hover:scale-110"
            src={images[index]} 
            alt={item} 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white group-hover:mb-4 transition-all duration-500 ease-linear">
            <p className="text-6xl">{item}</p>
            <button className="opacity-0 transition-opacity group-hover:opacity-100 font-bold">Start Test {">"}</button>
          </div>
        </div>
      ))} 
    </div>

  





    <Faq  faqData={faqData}/>

    <Footer/>
  </div>
  )
}

export default Assessments