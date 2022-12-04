const express    = require('express')
const exphbs     = require('express-handlebars')
const app        = express()
const path       = require('path')
const db         = require('./db/connection')
const bodyParser = require('body-parser')
const routes     = require('./routes/jobs')
const Job        = require('./models/Job')
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

db.authenticate().then( () => console.log('Connected to database')).catch( (err) => console.log(err))

app.get('/', (req, res) => {

  let search = req.query.job

  // PH >> PHP ou Word >> WordPress
  let query = '%'+search+'%'

  if(!search){
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render('index',{
        jobs
      })
  
    })
  }
  else{
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [['createdAt', 'DESC']]
    })
    .then(jobs => {
      res.render('index',{
        jobs,
        search
      })
  
    })
  }
})

app.use('/jobs', routes)

const port = 3000

app.listen(port, () => console.log(`Connected to port ${port}`))

