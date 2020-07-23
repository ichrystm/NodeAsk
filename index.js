
const express = require ('express')
const app = express()
const port = 8081
const bodyParser = require('body-parser')
const connection = require('./database/database')
const ask = require('./database/Ask')

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
    ask.findAll({ raw: true})
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

app.listen(port, () => {
    console.log("App online na porta " + port)
})