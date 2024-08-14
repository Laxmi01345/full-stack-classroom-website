import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateTeacherForm = ({  onUpdate,onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (name && email && password) {
      try {
        const res = await axios.post('http://localhost:3000/createTeacher', { name, email, password });

        if (res.data.status === "ok") {
          toast.success('Teacher account created successfully');
          onUpdate();
          onClose(); // Close the form
        } else {
          toast.error(res.data.message || 'Error creating teacher account');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error creating teacher account');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-84 max-w-md transform transition-transform translate-x-0">
      <button
        onClick={() => onClose()}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4">Create Teacher Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Create Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacherForm;
