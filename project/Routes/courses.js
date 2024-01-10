const { Course,validate} = require ('../Models/coursesModel');
const {Category} = require ('../Models/categoriesModel')
const express = require('express');
const router = express.Router();

router.get('/' , async (req,res) => {
    const courses = await Course.find();
    res.send(courses);
})

router.post('/', async (req, res,next) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        const  category = await Category.findById(req.body.category._id);
        console.log(category)
        if(!category) return res.status(400).send('Invalid id')
        console.log(req.body)
        const course = new Course({
            title : req.body.title,
            category : {
                _id : category._id,
                name : category.name
            },
            creator : req.body.creator,
            rating : req.body.rating
        });

        await course.save();

        res.status(201).json({
            status: 'success',
            data: course
        });
    } catch (error) {
        console.error('Error saving category:', error);
        next(error);
    }

});
router.put('/:id' , async (req,res) => {

    const {error} = validate(req.body)
    if(error) res.status(404).send(error.details[0].message)

    const  category = await Category.findById(req.body.category_.id)
    if(!category) return res.status(400).send('Invalid categoryid')


    const course = await  Course.findByIdAndUpdate(req.params.id , 
        {title : req.body.title ,  
            category : {
                _id : category._id,
                name : category.name
             },
             creator : req.body.creator, 
             rating : req.body.rating} ,
              {new : true})
    
    if(!course) return res.status(404).send('the category with the given Id was not found')

    res.send(course);
})

router.delete('/:id',async (req,res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if(!course) return res.status(404).send('the category with the given Id was not found')

    res.send(course);
})

router.get('/:id', async(req,res) => {
    const course = await Course.findById(req.params.id)
    if(!course) return res.status(404).send('the category with the given Id was not found')

    res.send(course);
})


module.exports = router;