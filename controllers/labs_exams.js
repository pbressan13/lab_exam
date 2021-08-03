const LabsExams = require('../models/labs_exams')

module.exports = app => {
  app.post('/labs_exam', (req, res) => {
    const exam_assoc = req.body
    LabsExams.assoc(exam_assoc, res)
  })

  app.delete('/labs_exam', (req, res) => {
    const exam_assoc = req.body
    LabsExams.delete(exam_assoc, res)
  })
}
