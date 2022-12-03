const express = require('express')
const app = express()
const db = require('./db/connection')

db.authenticate().then( () => console.log('Connected to database')).catch( (err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Succeed')
})

const port = 3000

app.listen(port, () => console.log(`Connected to port ${port}`))