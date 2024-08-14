import principalImage from '../Images/principal.jpeg'
import teacherimg from '../Images/teacher.jpeg'
import studentimg from '../Images/students.jpg'
import { FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();

    const handleRoleSignup = (role) => {
        navigate('/signup', { state: { role } });
    };

    
    const myStyle = {
        backgroundImage: `url(${principalImage})`,
           backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
       
       
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
   
   };

   
   
   const Teacher = {
    backgroundImage: `url(${studentimg})`,
       backgroundSize: "cover",
   backgroundRepeat: "no-repeat",
   
   
   display: "flex",
   justifyContent: "center",
   alignItems: "center",

};

const student = {
    backgroundImage: `url(${teacherimg})`,
       backgroundSize: "cover",
   backgroundRepeat: "no-repeat",
   
   
   display: "flex",
   justifyContent: "center",
   alignItems: "center",

};

    
  return (
    <div className="md:grid md:grid-cols-3 gap-4 justify-center text-center items-center md:mt-60 mt-30" >
      <div style={myStyle} className='rounded-lg text-white  hover:border-white hover:border-4 hover:h-60' onClick={() => handleRoleSignup('Principal')}>
      <div className="  rounded-lg p-4 " >
        <h1 className='text-2xl font-bold'>Principal</h1>
        <p className='flex justify-center text-black'><FaUser size={60}/></p>
        <p>Login as Principal to manage classrooms, teachers, and students. Use your credentials to access administrative features.</p>
      </div>
      </div>
      <div style={Teacher} className='rounded-lg text-white hover:border-white hover:border-4 hover:h-60' onClick={() => handleRoleSignup('Teacher')}>
      <div className="rounded-lg p-4">
        <h1 className='text-2xl font-bold'>Teacher</h1>
        <p className='flex justify-center text-black' ><FaUsers size={60}/></p>
        <p>Login as Teacher to manage your classroom and create Time Tables. Access your teaching schedule and student information.</p>
      </div>
      </div>
      <div className='rounded-lg text-white' style={student} onClick={() => handleRoleSignup('Student')}>
      <div className=" rounded-lg p-4 hover:border-white hover:border-4 hover:h-60">
        <h1 className='text-2xl font-bold'>Student</h1>
        <p className='flex justify-center text-black' ><PiStudentFill size={60}/></p>
        <p>Login as Student to view your class schedule and connect with classmates. Check your timetable and classroom details.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
