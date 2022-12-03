const express    = require('express')
const app        = express()
const db         = require('./db/connection')
const bodyParser = require('body-parser')
const routes     = require('./routes/jobs')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

db.authenticate().then( () => console.log('Connected to database')).catch( (err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Succeed')
})

app.use('/jobs', routes)

const port = 3000

app.listen(port, () => console.log(`Connected to port ${port}`))

