import express from 'express'
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },

    password:{
        type:String,
       

    },
    role:{
        type:String,
       
    },
    classroomAssignment :{
        type:String,
    }
});

const LoginSchema =mongoose.model('LoginSchema',postSchema);
export default LoginSchema