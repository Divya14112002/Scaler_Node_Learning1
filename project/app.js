const express= require('express')
const categories = require('./Routes/categories')
const students = require ('./Routes/students')
const courses = require ('./Routes/courses')
const app=express()
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1/learningplatform')
.then(()=>console.log("connection successful"))
.catch(err=>console.log("connection unsuccessful",err))


app.use(express.json());
app.use('/api/categories' , categories)
app.use('/api/students', students)
app.use('/api/courses',courses)

app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}`));
