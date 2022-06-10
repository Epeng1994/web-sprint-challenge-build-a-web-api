// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const {get, insert, update, remove} = require('./actions-model')
const {validateAction, validateID} = require('./actions-middlware')

router.use(express.json())

//get
router.get('/', (req, res, next)=>{
    get()
        .then(result=>{
            res.json(result)
        })
        .catch(error=>next(error))
})
//get id
router.get('/:id', validateID, (req, res, next)=>{
    res.json(req.user) 
})
//post
router.post('/', validateID, validateAction, (req, res, next)=>{
    insert(req.body)
        .then(result=>{
            res.json(result)
        })
        .catch(error=>next(error))
})
//put
router.put('/:id', validateID, validateAction, (req,res,next)=>{
    update(req.user.id, req.body)
        .then(result=>res.json(result))
        .catch(error=>next(error))
})
//delete
router.delete('/:id', validateID, (req,res,next)=>{
    remove(req.user.id)
        .then(result=>res.json({message:`ID ${req.user.id} is deleted`}))
        .catch(error=>next(error))
})

module.exports = router