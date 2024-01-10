const express = require('express');
const router = express.Router();
const { Student, validate} = require('../Models/studentsModel');




router.get('/',async(req,res)=>{
    let students = await Student.find();
    res.send(students);

});
router.post('/', async (req, res,next) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }

        const student = new Student({
            name : req.body.name,
            isenrolled : req.body.isenrolled,
            Phone : req.body.Phone
        });

        await student.save();

        res.status(201).json({
            status: 'success',
            data: student
        });
    } catch (error) {
        console.error('Error saving category:', error);
        next(error);
    }
});
router.put('/:id' , async (req,res) => {

    const {error} = validate(req.body)
    if(error) res.status(404).send(error.details[0].message)

    const student = await  Student.findByIdAndUpdate(req.params.id , {name : req.body.name , isenrolled : req.body.isenrolled  , Phone : req.body.Phone} , {new : true})
    
    if(!student) return res.status(404).send('the category with the given Id was not found')

    res.send(student);
})

router.delete('/:id',async (req,res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    if(!student) return res.status(404).send('the category with the given Id was not found')

    res.send(student);
})

router.get('/:id', async(req,res) => {
    const student = await Student.findById(req.params.id)
    if(!student) return res.status(404).send('the category with the given Id was not found')

    res.send(student);
})


module.exports = router;
