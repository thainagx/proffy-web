const express = require('express')
const server = express()
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// NunJucks configuration
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, 
})

server
//Receive the data from req.body
.use(express.urlencoded({ extended: true }))
// Configuration of static files (ex.: CSS, scripts, images)
.use(express.static("public"))
// Application routes
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)

.listen(5000)