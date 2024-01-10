const express = require('express');
const {Category , validate } = require('../Models/categoriesModel')
const router = express.Router();



router.get('/',async(req,res)=>{
    let categories = await Category.find();
    res.send(categories);

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

        const category = new Category({
            name: req.body.name
        });

        await category.save();

        res.status(201).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        console.error('Error saving category:', error);
        next(error);
    }
});
router.put('/:id' , async (req,res) => {

    const {error} = validate(req.body)
    if(error) res.status(404).send(error.details[0].message)

    const category = await  Category.findByIdAndUpdate(req.params.id , {name : req.body.name} , {new : true})
    
    if(!category) return res.status(404).send('the category with the given Id was not found')

    res.send(category);
})

router.delete('/:id',async (req,res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if(!category) return res.status(404).send('the category with the given Id was not found')

    res.send(category);
})

router.get('/:id', async(req,res) => {
    const category = await Category.findById(req.params.id)
    if(!category) return res.status(404).send('the category with the given Id was not found')

    res.send(category);
})


module.exports = router;
