// Data

const proffys = [
    {
        name:"Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "0123456789", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1200]
    },
    {
        name:"Julio Carlos", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "0123456789", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [3], 
        time_from: [620], 
        time_to: [1000]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Functionalities

function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty) {  
        data.subject = getSubject(data.subject)
        // Adding new proffy data
        proffys.push(data)
        return res.redirect("/study")
    }
    return res.render("give-classes.html", { subjects, weekdays })
}

const express = require('express')
const server = express()

// NunJucks configuration
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, 
})

server
// Configuration of static files (ex.: CSS, scripts, images)
.use(express.static("public"))
// Application routes
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)

.listen(5000)