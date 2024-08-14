import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const getRandomColor = () => {
  const colors = ['#f28d35', '#35a6f2', '#f23576', '#35f27d', '#8e44ad', '#f39c12'];
  return colors[Math.floor(Math.random() * colors.length)];
};
const CreateClassroomForm = ({ onCreate ,onClose,onUpdate }) => {
  const [name, setName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  useEffect(() => {
    // Fetch the list of teachers
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/print');
        setTeachers(response.data);
      } catch (error) {
        toast.error('Failed to fetch teachers');
      }
    };

    fetchTeachers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDays = Object.keys(days).filter(day => days[day]);

    const classroomData = {
      name,
      startTime,
      endTime,
      days: selectedDays,
      color:getRandomColor(),
      assignedTeacher:selectedTeacher
    };

    try {
      // Simulate an API call
      console.log(classroomData);
      await axios.post('http://localhost:3000/createClassroom', classroomData);
      

      // Show success toast
      toast.success("Classroom created successfully");


      // Notify parent component
      if (onCreate) onCreate(classroomData);

      // Reset form fields
      setName('');
      setStartTime('');
      setEndTime('');
      setDays({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,

        
      });
      setassignedTeacher('')
      
      onUpdate();
      onClose();
    } catch (error) {
      // Handle error
      toast.error("Failed to create classroom");
    }
  };

  const handleDayChange = (day) => {
    setDays(prevDays => ({ ...prevDays, [day]: !prevDays[day] }));
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md transform transition-transform translate-x-0">
      <button
        onClick={() => onClose(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Classroom Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Days of the Week</label>
          {Object.keys(days).map(day => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={days[day]}
                onChange={() => handleDayChange(day)}
                className="mr-2"
              />
              <label htmlFor={day} className="text-gray-700">{day}</label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Assign Teacher</label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.email} value={teacher.email}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Classroom
        </button>
      </form>
    </div>
  );
};

export default CreateClassroomForm;
