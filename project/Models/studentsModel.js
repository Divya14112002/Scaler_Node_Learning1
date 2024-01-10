const mongoose = require('mongoose');
const Joi = require('joi')

const studentSchema=mongoose.Schema({
    name : {type : String , required : true} ,
    isenrolled : { type : Boolean , default : false},
    Phone : {type : String , required : 10 , minlength : 10 , maxlength : 12}
})

const Student =  mongoose.model('Student',studentSchema)


function validateData(student) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        Phone : Joi.string().min(10).max(12).required(),
        isenrolled : Joi.boolean()
    });

    return schema.validate(student);
}

exports.Student = Student
exports.validate = validateData

