const express = require('express')
const router  = express.Router()
const Job     = require('../models/Job')

router.get('/add', (req, res) => {
  res.render('add')
})

router.get('/view/:id', (req, res) => Job.findOne({
  where: {id: req.params.id}
}).then(job => {
  res.render('view',{
    job
  })
}))

router.post('/add', (req, res) => {
  const { title, description, company, salary, email, new_job } = req.body


  Job.create({
    title,
    description, 
    company,
    salary,
    email,
    new_job
  }).then( () => res.redirect('/'))

})

module.exports = router