const database = require('./db')
const createProffy = require('./createProffy')

database.then( async (db) => {
    // Insert data
    proffyValue = {
        name: 'Thaina Gomes',
        avatar: 'https://avatars0.githubusercontent.com/u/54127814?s=460&u=270b0b8025a6efcc0a85cb02a5d0d18d4245c2e9&v=4',
        whatsapp: '27999367458',
        bio: 'Estudante de Engenharia de Computação, que se amarra em números. Ajudar pessoas é meu maior prazer.'
    }

    classValue = {
        subject: 7,
        cost: '40'
    }

    classScheduleValues = [
        {
            weekday: 3,
            time_from: 500,
            time_to: 700
        },
        {
            weekday: 5,
            time_from: 200,
            time_to: 600
        }
    ]

    // Creating Proffy in the database
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Query all proffys data
    const selectedProffys = await db.all("SELECT * FROM proffys")
    

    // Consult a proffy's classes and their data
    const selectClassesAndProffy = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    // To consult an available proffy, the requested time must be between the proffy's service hours.
    const selectClassesSchedules = await db.all (`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 5
        AND class_schedule.time_from <= 200
        AND class_schedule.time_to > 200
    `)
    console.log(selectClassesSchedules)
})