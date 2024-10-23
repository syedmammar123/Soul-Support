import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SoulfulSessions() {
  return (
    <>
      <div className="mt-72 mb-20 h-[550px] w-full">
        <div className="flex flex-col-reverse lg:flex-row-reverse lg:justify-evenly items-center lg:items-start lg:space-x-8">
          
          <div className="relative hidden lg:flex">
            <div className="w-[330px] h-[360px] bg-[#c5cae9] rounded-[20px] z-[1] mx-[3vw]" />
            <div className="w-[330px] h-[370px] bg-[#d9eff8] rounded-[20px] z-[2] absolute left-[50px] top-[50px] flex items-center">
              <video
                id="vid"
                src="images/Instructor video.mp4"
                muted
                loop
                autoPlay
                className="min-w-[90%] min-h-[100%] rounded-lg"
              />
            </div>
          </div>

        <div className="flex flex-col justify-between text-[#001147] font-sans px-[50px]  lg:px-0">
            <h1 className="text-[40px] font-inter leading-[53px] tracking-[0.8px] mb-4 text-left lg:text-left text-[#001147]">
              Soulful Sessions
            </h1>
            <p id="para" className="max-w-[550px] text-[26px] leading-[30px] mb-6 text-left lg:text-left  text-[#001147]">
              Meet Our Expert Instructors and Join Live Counseling for Mental Health
            </p>
            
            <ul className="grid grid-cols-2 gap-y-1 mb-0 lg:mb-8">
              {['Anxiety', 'Depression', 'Family Conflicts', 'OCD', 'Stress Management', 'Anger Management', 'Insomnia', 'Cognitive Distortions', 'Coping Skills', 'Grief and Loss', 'Self Care Strategies', 'Career and Life Transitions'].map(item => (
                <li key={item} className="text-[#914d8e] font-bold text-[16px] leading-[31px] flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  {item}
                </li>
              ))}
            </ul>

             <button id="ins_butn" className="absolute lg:relative border-[2px] border-[#001147] text-[#001147] bg-white py-3 rounded-3xl w-[200px] lg:w-[250px] left-[50%] lg:left-auto lg:ml-0 transform -translate-x-1/2 lg:transform-none mt-[92vh] lg:mt-0 shadow-xl font-semibold text-sm  transition-all hover:bg-[#001147] hover:text-white -10">
              <Link to="/sessions">View Sessions</Link>
            </button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default SoulfulSessions;
