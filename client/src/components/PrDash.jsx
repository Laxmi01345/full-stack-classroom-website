import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import CreateClassroomForm from './CreateClassroomForm';
import CreateTeacherForm from './CreateTeacherForm';
import axios from 'axios';
import StudentForm from './StudentForm';



const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = ((hours + 11) % 12 + 1);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

const PrDash = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleTeacher, setIsFormVisibleTeacher] = useState(false);
  const [isFormVisibleStudent, setIsFormVisibleStudent] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
     fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getClassrooms');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Failed to fetch classrooms:', error);
      toast.error('Failed to fetch classrooms');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/print');
      setTeachers(res.data);

    } catch (error) {
      toast.error('Error fetching teachers');
    }
  };

  const handleRemoveTeacher = async (email) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      await axios.delete(`http://localhost:3000/remove`, { params: { email: encodedEmail } });
      toast.success('Teacher removed successfully');
      fetchTeachers(); 
    } catch (error) {
      console.error('Error removing teacher:', error);
      toast.error('Error removing teacher');
    }
  };

  const handleTeacherUpdate = () => {
    fetchTeachers();
    setEditingTeacher(null);
    setIsFormVisibleTeacher(false);
  };

  const handleClassroomUpdate = () => {
    fetchClassrooms();
   
  };

  

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleFormVisibilityTeacher = () => {
    setIsFormVisibleTeacher(!isFormVisibleTeacher);
  };

  const toggleFormVisibilityStudent = () => {
    setIsFormVisibleStudent(!isFormVisibleStudent);
  };

  const handleClassroomCreation = async (newClassroom) => {
    if (newClassroom) {
      try {
        const updatedClassrooms = [
          ...classrooms,
          { ...newClassroom, color:newClassroom.color }
        ];

        setClassrooms(updatedClassrooms);
        setIsFormVisible(false);
      } catch (error) {
        console.error("Failed to fetch classrooms", error);
        toast.error("Failed to fetch updated classrooms");
      }
    }
  };

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
          <button
            onClick={toggleFormVisibility}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isFormVisible ? 'Hide Form' : 'Create Classroom'}
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={toggleFormVisibilityTeacher}
          >
            Create Teacher Account
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={toggleFormVisibilityStudent}
          >
            Create Student Account
          </button>
        </header>
        <main className="p-4 mt-4">
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Classrooms</h2>
            {classrooms.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-4">
                  {classrooms.map((classroom, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg text-white flex-1 min-w-[250px] max-w-[30%]"
                      style={{ backgroundColor: classroom.color }}
                    >
                      <strong className="block text-lg">{classroom.name}</strong>
                      <p>
                        {formatTime(classroom.startTime)} - {formatTime(classroom.endTime)}
                      </p>
                      <p>{classroom.days.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className='text-white'>No classrooms created yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Teachers</h2>
            {teachers.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">Name</th>
                    <th className="border-b px-4 py-2">Email</th>
                    <th className="border-b px-4 py-2">Assigned Classroom</th>
                    <th className="border-b px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.email}>
                      <td className="border-b px-4 py-2">{teacher.name}</td>
                      <td className="border-b px-4 py-2">{teacher.email}</td>
                      <td className="border-b px-4 py-2">{teacher.assignedClass || 'N/A'}</td>
                      <td className="border-b px-4 py-2">
                        <button
                          onClick={() => {
                            setEditingTeacher(teacher);
                            setIsFormVisibleTeacher(true);
                          }}
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveTeacher(teacher.email)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='text-white'>No teachers registered yet.</p>
            )}
          </div>
        </main>

        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <CreateClassroomForm onCreate={handleClassroomCreation} onClose={() => setIsFormVisible(false)}
            onUpdate={handleClassroomUpdate} />
          </div>
        )}
        

        {isFormVisibleTeacher && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <CreateTeacherForm
              teacher={editingTeacher}
              onClose={() => {
                setEditingTeacher(null);
                setIsFormVisibleTeacher(false);
              }}
              onUpdate={handleTeacherUpdate}
            />
          </div>
        )}
      </div>
      <h1>Students</h1>
      {/* StudentForm component goes here */}
    </div>
  );
};

export default PrDash;
