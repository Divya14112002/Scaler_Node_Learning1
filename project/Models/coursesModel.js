const Joi=require('joi')
const mongoose = require('mongoose')
const {categorySchema} = require('../Models/categoriesModel')
const Course = mongoose.model('Course' , new mongoose.Schema({
    title : {
        type : String,
        required : true ,
        minlength : 5
    },
    category : {
        type : categorySchema,
        required : true
    },
    creator : {
        type : String,
        required : true
    },
    rating : {
        type: Number,
        required : true,
    }
}));

function validateCourse(course){
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        category: Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required()
        }).required(),
        creator: Joi.string().min(5).required(),
        rating: Joi.number().min(0).required()
    });
    return schema.validate(course);
}
exports.Course = Course;
exports.validate = validateCourse;