// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const {get,insert,update,remove,getProjectActions} = require('./projects-model')
const {validateProject, validateID} = require('./projects-middleware')

router.use(express.json())

//get
router.get('/', (req , res, next)=>{
    get()
        .then(result=>{result ? res.json(result) : res.status(404).json({message:"Could not be found"})})
        .catch(error=>next(error))
})
//get id
router.get('/:id', validateID, (req, res, next)=>{
    res.json(req.user) 
})
//post
router.post('/', validateProject, (req,res,next)=>{
    insert(req.body)
        .then(result=>{res.json(req.body)})
        .catch(error=>next(error))
})
//put
router.put('/:id', validateID, validateProject, (req,res,next)=>{
    update(req.user.id, req.body)
        .then(result=>{res.json(result)})
        .catch(error=>next(error))
})
//delete
router.delete('/:id', validateID, (req,res,next)=>{
    remove(req.user.id)
        .then(result=>res.json({message: `Project ID ${req.user.id} deleted`}))
        .catch(error=>next(error))
})
//get actions
router.get('/:id/actions', validateID, (req,res,next)=>{
    getProjectActions(req.user.id)
        .then(result=>{res.json(result)})
        .catch(error=>next(error))
})

module.exports = router