import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import Test from '../../components/Test';
import { useNavigate, useParams } from 'react-router-dom';

const AssessmentCategory = () => {

  const navigate = useNavigate()
  const { AssessmentCategory } = useParams();
  const [questions,setQuestions] = useState([])
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState([]);
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [checked,setChecked] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [result, setResult] = useState([])
  const [score, setScore] = useState(0)

    const clickedNext = ()=>{
        if(!checked){
            alert("Please select any option")
            return;
        }
        setCurrentQuestion(currentQuestion+1)
    }

    const clickedBack = ()=>{
        setCurrentQuestion(currentQuestion-1)
    }

    const answerHandler = (_id, _answer) => {
        let _list = [...answer];
        
        const index = _list.findIndex(_obj => _obj.quizNo == _id);

        if (index !== -1) {
            _list[index].answer = _answer
        } else {
            _list.push({ quizNo: _id, answer: _answer});
        }
        setAnswer(_list);

        setSelectedOptions((previouslySelectedOptions)=>({
            ...previouslySelectedOptions,
            [currentQuestion]:_answer
        }))
    };

    const submit = async () => {

        if(!checked){
            alert("Please select an option")
            return;
        }

        if (answer?.length >= 1) {
            const total = answer.reduce((acc,curr) => acc + curr.answer-1,0)
            setScore(total)
            const res = await axios.get(`http://localhost:4000/api/v1/quiz/result/${AssessmentCategory}/${total}`)
            
            setResult(res.data.data.results)
           
        }else{
            alert("You cannot submit without selecting the answers");
        }
    }

    useEffect(()=>{
        if(selectedOptions[currentQuestion]!==undefined){
            setChecked(true)
        }else{
            setChecked(false)
        }
    },[currentQuestion,selectedOptions])


  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/quiz/ADHD`);
      // const response = await axios.get(`http://localhost:3000/api/v1/quiz/${AssessmentCategory}`);
      
      // console.log(response.data.data[0].questions)       
      setQuestions(response.data.data[0].questions)       
      // setQuestions(response.data.data)       
    } catch (error) {
      console.error(error);
      alert("Error !")
    }
  };

    useEffect(() => {
      const fetchQuestions = async () => {
      try {
        // const response = await axios.get(`http://localhost:3000/api/v1/quiz/ADHD`);
        const response = await axios.get(`http://localhost:4000/api/v1/quiz/${AssessmentCategory}`);
        
        console.log(response.data.data[0].questions)       
        setQuestions(response.data.data[0].questions)       
        // setQuestions(response.data.data)    
                  setLoading(false);
   
      } catch (error) {
        console.error(error);
        alert("Error !")
      }
      };

      fetchQuestions();

    }, [AssessmentCategory]);


  return (
    <>
    <Test/>
    <div className="w-[80%] m-auto h-[87vh] flex flex-col items-center justify-evenly">
        <div className={`${styles.MainHeading}`}>
            <h1> {AssessmentCategory} Assessment</h1>
            {/* <span></span> */}
        </div>
        {/* { result.length>0?
        <div className={`${styles.MainHeading}`}>
            <h1>{result[0].diagnosis}</h1>
            <span>{result[0].recommendation}</span>
        </div>:null
        } */}
        {currentQuestion<1?
        (
        <div className="w-[80%] m-auto">
            <h3 className="">Instructions</h3>
            <p>This assessment comprises {questions.length} questions. You will have answer them. It is designed to evaluate your condition. Each question may have points which will be assigned accordingly.</p>
        </div>
        )
        :(null)
        }
        {
        (questions?.length >= 1 && (result.length<1) && (currentQuestion<(questions?.length)))?
        (
        <div className={`sm:w-[70%] md:w-[60%] lg:w-[50%] ${styles.question}`}>
            <p>{`Q${currentQuestion+1}) `}{questions[currentQuestion].qtext}</p>
            
            <div className={styles.answer}>
                {questions[currentQuestion].options.map((quizOptions, index) => {
                    return (
                        <label key={index}>
                            <input
                              onChange={() => {
                                  answerHandler(questions[currentQuestion]?._id, index + 1);
                              }}
                               
                                type="radio"
                                name={questions[currentQuestion].quizNo}
                                checked={index + 1 === selectedOptions[currentQuestion]}
                            />
                            <span>{quizOptions.text}</span>
                        </label>
                    );
                })}
            </div>
            {(currentQuestion===((questions?.length)-1))?
            (
            <div className='flex justify-between items-center'>
                <button
                onClick={clickedBack}
                className={`${styles.button}`}
                >Back</button>
                <button
                    onClick={submit}
                    className={`${styles.button}`}
                    style={{
                    backgroundColor: "#66e362",
                    }}>
                    {loading && <span className="" style={{ marginRight: "10px" }} aria-hidden="true"></span>
                    }
            Submit</button>
            </div>
            )
            :
            (
            <div className='flex justify-between items-center'>
            {currentQuestion>0?
                <button
                onClick={clickedBack}
                className={`${styles.button}`}
                >Back</button>
            :
            <div></div>
            }                                      
            <button
                onClick={clickedNext}
                className={`${styles.button}`}
                >Next</button>
            </div>
            )
            }
        </div>
        ):
        ( result.length>0 ?
            <>
                <div className={`sm:w-[70%] md:w-[60%] lg:w-[50%] ${styles.question}`}>
                    <h1>Your score is {score}/{questions.length*3}</h1>
                    <h1>{result[0].diagnosis}</h1>
                    <span>{result[0].recommendation}</span>   

                    <button
                    className='bg-green-700 rounded-sm p-3 text-red-400'
                    onClick={()=>navigate("/SupportGpt")}
                    >Book Appointment</button>             
                </div>
            </>
        :
        <div className="flex justify-center items-center">
        {
        loading &&
        <span className="" style={{ marginRight: "10px" }} aria-hidden="true"></span>
        }
        Loading quiz questions
        </div>
        
        )
        }
    </div>
    </>
  )

}

export default AssessmentCategory