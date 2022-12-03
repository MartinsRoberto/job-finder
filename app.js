const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Succeed')
})

const port = 3000

app.listen(3000, () => console.log(`Connected to port ${port}`))