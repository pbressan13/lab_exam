const Exams = require('../models/exams')

module.exports = app => {
  app.get('/exam', (req, res) => {
    Exams.get(res)
  })

  app.get('/exam/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Exams.getId(id, res)
  })

  app.post('/exam', (req,res,next) => {
    const exam = req.body
    Exams.post(exam, res)
  })

  app.patch('/exam/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body
    Exams.patch(id, values, res)
  })

  app.delete('/exam/:id', (req,res) => {
    const id = parseInt(req.params.id)
    Exams.delete(id, res)
  })
}
