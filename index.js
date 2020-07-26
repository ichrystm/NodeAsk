
const express = require ('express')
const app = express()
const port = 8081
const bodyParser = require('body-parser')
const connection = require('./database/database')
const ask = require('./database/Ask')
const answer = require('./database/Answer')

connection.authenticate()
.then(() => {
    console.log("Conexão com o banco de dados bem sucedida.")
})
.catch((err) => {
    console.log("Ocorreu um erro: " + err)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    ask.findAll({ raw: true, order:[['id','DESC']]})
    .then(asks => {
        res.render('index', {
            asks: asks
        })
    })
})

app.get('/ask', (req, res) => {
    res.render('ask')
})

app.post('/saveask', (req, res) => {
    var title = req.body.title
    var description = req.body.description

    ask.create({
        title: title,
        description: description
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
        console.log("Ocorreu um erro: " + err)
    })
})

app.get('/asked/:id', (req, res) => {
    var id = req.params.id
    ask.findOne({
        where: {id: id}
    })
    .then(thisask => {
        if(thisask != undefined){

            answer.findAll({
                where: {askid: thisask.id},
                order: [['id', 'desc']]
            })
            .then(answers => {
                res.render('asks', {
                    thisask: thisask,
                    answers: answers
                })
            })

        }else{
            res.redirect('/')
        }
    })
})

app.post('/answer', (req, res) => {
    var body = req.body.body
    var askid = req.body.askid

    answer.create({
        body: body,
        askid: askid
    })
    .then(() => {
        res.redirect('/asked/' + askid)
    })
})

app.listen(port, () => {
    console.log("App online na porta " + port)
})