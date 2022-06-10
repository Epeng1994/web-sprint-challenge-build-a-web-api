// add middlewares here related to projects
const {get} = require('./projects-model')

//validate ID exists
function validateID(req,res,next){
    get(req.params.id)
        .then(result=>{
            if(result){
                req.user = result
                next()
            }else{
                return res.status(404).json({message:"ID could not be found"})
            }
        })
        .catch(error=>next(error))
}

//validate new project
function validateProject(req,res,next){
    const {name, description, completed} = req.body
     if(name == null || name.trim() === '' || description == null || description.trim() === '' || completed == null){
        return res.status(400).json({message: 'Project name, description and completed cannot be empty'})
    }else{
        next()
    }
}


module.exports={
    validateProject,
    validateID
}