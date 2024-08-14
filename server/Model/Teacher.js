import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures each classroom name is unique
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 

  assignedClass :{
    type:String
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
