const express    = require('express')
const exphbs     = require('express-handlebars')
const app        = express()
const path       = require('path')
const db         = require('./db/connection')
const bodyParser = require('body-parser')
const routes     = require('./routes/jobs')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

db.authenticate().then( () => console.log('Connected to database')).catch( (err) => console.log(err))

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/jobs', routes)

const port = 3000

app.listen(port, () => console.log(`Connected to port ${port}`))

