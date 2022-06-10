const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

//Global error middleware
function errorCheck(error, req, res, next){
    return error ?  res.status(500).json('Server Error') : next()
}

server.use('/api/projects',projectsRouter)

server.use('/api/actions', actionsRouter)

server.get('/',(req,res)=>{
    res.send(`<h1>Welcome</h1>`)
})

server.use(errorCheck)

module.exports = server;
