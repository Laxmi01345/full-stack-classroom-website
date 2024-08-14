
import mongoose from 'mongoose'
import express from 'express'
import jwt from 'jsonwebtoken';
import cors from 'cors'
import LoginSchema from './Model/Schema.js'
import Teacher from './Model/Teacher.js'
import Classroom from './Model/Classroom.js'
const app = express();
const PORT=3000;
app.use(express.json());




app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// mongoose.connect('mongodb://localhost:27017/Classroom')
// .then(()=>{
//     console.log("Mongoose connected Successfully !!")
// }).catch(error => {
//     console.log("Mongoose connection error " , error)
// });

const connectDb = async()=>{
    await mongoose.connect(`mongodb+srv://laxmiray013:syvk1WHBseps3xFm@cluster0.f1hrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    // mongodb://laxmiray013:syvk1WHBseps3xFm@<hostname>/?ssl=true&replicaSet=atlas-tuudm9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
    console.log(`this db is connected with ${mongoose.connection.host}`)
  }
  
  connectDb();

app.post('/createClassroom', async (req, res) => {
    const { name, startTime, endTime, days, color,assignedTeacher  } = req.body;
    console.log(assignedTeacher)
    try {
      // Insert the classroom into the database with the color
      const result = new Classroom({
        name,
        startTime,
        endTime,
        days,
        color ,
        assignedTeacher 
      });
    await result.save();

    if (assignedTeacher) {
        // Update the teacher's assigned classroom field
        await Teacher.findOneAndUpdate(
            { email: assignedTeacher }, // Assuming `email` is used as identifier
            { $set: { assignedClass: name} } // Adjust field name accordingly
        );
    }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create classroom' });
    }
  });
  
  app.get('/getClassrooms', async (req, res) => {
    try {
      const classrooms = await Classroom.find();
      res.status(200).json(classrooms);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch classrooms' });
    }
  });
  

app.post("/Register",async(req,res)=>{
    try{
        const {name,email , password , role} = req.body;
      
        const existingUser = await LoginSchema.findOne({email})

        if (existingUser){
            return res.status(200).json({message: "Already Exists"})

        }
        const newUser= new LoginSchema({name,email,password,role})
        await newUser.save();

    
        const token = jwt.sign({email:newUser.email},"jwt-123-key",{expiresIn:'1d'});

        res.json({status: "ok" ,token});
        
    }
    catch(error){
        console.log(error)
        res.status(400).json({message : 'error occured'})
    }
})


app.post("/createTeacher",async(req,res)=>{
    try{
        const {name,email , password } = req.body;
      
        const existingUser = await Teacher.findOne({email})

        if (existingUser){
            return res.status(200).json({message: "Already Exists"})

        }
        const newUser= new Teacher({name,email,password})
        await newUser.save();

    
        const token = jwt.sign({email:newUser.email},"jwt-123-key",{expiresIn:'1d'});

        res.json({status: "ok" ,token});
        
    }
    catch(error){
        console.log(error)
        res.status(400).json({message : 'error occured'})
    }
})
app.get('/print', async (req, res) => {
    
        
      
    try {
        const teacher = await Teacher.find();

        res.status(200).json(teacher);
       
      
    } catch (error) {
      // Handle any errors that occur during data retrieval
      res.status(500).json({ message: 'Error fetching teachers', error: error.message });
    }
});


  

app.delete('/remove', async (req, res) => {
    const { email } = req.query;
   

    const decodedEmail = decodeURIComponent(email);
    console.log(decodedEmail)
    if (!email) {
        return res.status(200).json({ message: 'Email is required' });
    }

    try {
        const result = await LoginSchema.deleteOne({ email:decodedEmail });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing teacher' });
    }
});

app.put('/update', async (req, res) => {
    const { email, name, classroomAssignment } = req.body;
  
    res.status(200).json({email,classroomAssignment})
  });

app.post("/Login",async (req,res)=>{
    try{
        const {name,email , password , role} = req.body;
        const User = await LoginSchema.findOne({email});

        if (email ==="" || password===""){
            return res.status(200).json({ message: 'Please fill in all fields.' });
        }

        if (!User){
            return res.status(200).json({message : "Not Registered"});
        }

        
        if (User.password === password){

            const token = jwt.sign({email:User.email},"jwt-123-key",{expiresIn:'1d'});
            return res.json({status :"success" ,token});
        }
        else{
            return res.status(200).json({message: 'Password is incorrect'})

        }
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`)
})

