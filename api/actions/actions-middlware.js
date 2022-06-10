// add middlewares here related to actions
const {get} = require('./actions-model')


function validateID(req,res,next){
    const getID = req.params.id || req.body.project_id
    get(getID)
        .then(result=>{
            if(result){
                req.user = result
                next()
            }else{
                return res.status(404).json({message: "Project ID not found."})
            }
        })
        .catch(error=>next(error))
}


function validateAction(req,res,next){
    const{project_id, description, notes, completed} = req.body
    if(project_id == null || 
        description == null || description.trim() === '' ||
        notes == null || notes.trim() === '' ||
        completed == null){
            return res.status(400).json({message:"Project ID, description, notes and completed cannot be empty"})
        }else{
            next()
        }
}

module.exports = {
    validateAction,
    validateID
}