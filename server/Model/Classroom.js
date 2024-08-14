import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures each classroom name is unique
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  days: {
    type: [String], 
    
  },
  color:{
    type:String
  },

  assignedTeacher :{
    type:String
  }
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);
export default Classroom;
