const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!



server.use(express.json())

//Global error middleware
function errorCheck(error, req, res, next){
    return error ?  res.status(500).json('Server Error') : next()
}

server.use('/api/projects',projectsRouter)

server.use('/api/actions', actionsRouter)

server.get('/',(req,res)=>{
    try{
        const welcomeMessage = process.env.welcomeMessage
        res.json({welcomeMessage: welcomeMessage})
    }catch(error){
        console.error('\nERROR', error)
        res.status(500).json({error:'Cannot retrieve data'})
    }
    
})

server.use(errorCheck)

module.exports = server;
